import { getStore } from '@netlify/blobs';

export default async (request, context) => {
  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Erstelle Netlify Blob Store für Videos
    const store = getStore({
      name: 'videos',
      consistency: 'strong'
    });

    // Liste alle verfügbaren Blobs auf
    const { blobs } = await store.list();
    console.log('Available blobs in videos store:', blobs.map(blob => blob.key));
    
    // Suche nach dem spezifischen Video
    const targetVideo = blobs.find(blob => blob.key === 'einfuehrung-test.mp4');
    
    if (!targetVideo) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Video not found in Blob Storage',
        message: 'Das Video "einfuehrung-test.mp4" wurde nicht im Blob Storage gefunden.',
        availableBlobs: blobs.map(blob => blob.key)
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Neuer Ansatz: Lade das Video direkt und erstelle eine Data-URL
    let videoUrl;
    
    try {
      // Versuche erst den direkten URL-Ansatz (falls es doch funktioniert)
      videoUrl = await store.get('einfuehrung-test.mp4', { type: 'url' });
      console.log('Direct URL approach worked:', videoUrl);
    } catch (urlError) {
      console.log('Direct URL failed, trying data URL approach:', urlError.message);
      
      try {
        // Versuche verschiedene Datentypen um das korrekte Video zu bekommen
        console.log('Trying different data types to get valid video...');
        
        let videoData;
        let dataType;
        
        // Versuche zuerst 'blob' type
        try {
          console.log('Trying blob type...');
          videoData = await store.get('einfuehrung-test.mp4', { type: 'blob' });
          dataType = 'blob';
          console.log('Blob type successful, size:', videoData.size);
          
          // Konvertiere Blob zu ArrayBuffer für Response
          videoData = await videoData.arrayBuffer();
          console.log('Converted to ArrayBuffer, size:', videoData.byteLength);
          
        } catch (blobError) {
          console.log('Blob type failed:', blobError.message);
          
          try {
            console.log('Trying arrayBuffer type...');
            videoData = await store.get('einfuehrung-test.mp4', { type: 'arrayBuffer' });
            dataType = 'arrayBuffer';
            console.log('ArrayBuffer type successful, size:', videoData.byteLength);
            
          } catch (arrayBufferError) {
            console.log('ArrayBuffer type failed:', arrayBufferError.message);
            
            // Last resort: try stream and convert
            console.log('Trying stream type as last resort...');
            const stream = await store.get('einfuehrung-test.mp4', { type: 'stream' });
            const chunks = [];
            const reader = stream.getReader();
            
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
            }
            
            videoData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
            let offset = 0;
            for (const chunk of chunks) {
              videoData.set(chunk, offset);
              offset += chunk.length;
            }
            
            videoData = videoData.buffer;
            dataType = 'stream-converted';
            console.log('Stream conversion successful, size:', videoData.byteLength);
          }
        }
        
        // Inspiziere die ersten Bytes
        const firstBytes = new Uint8Array(videoData.slice(0, 32));
        const headerHex = Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
        console.log('First 32 bytes (hex):', headerHex);
        console.log('Data type used:', dataType);
        
        // Gib das Video direkt als Response zurück
        return new Response(videoData, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'video/mp4',
            'Content-Length': videoData.byteLength.toString(),
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=3600',
            'Content-Disposition': 'inline; filename="einfuehrung-test.mp4"'
          }
        });
        
      } catch (dataUrlError) {
        console.error('Data URL approach also failed:', dataUrlError);
        // Fallback zur Stream-Funktion
        videoUrl = '/.netlify/functions/stream-video';
        console.log('Using stream URL as last resort:', videoUrl);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      videoUrl: videoUrl,
      fileName: 'einfuehrung-test.mp4',
      message: 'Video aus Netlify Blob Storage geladen'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get video error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to retrieve video from Blob Storage',
      details: error.message,
      message: 'Fehler beim Laden des Videos aus dem Blob Storage'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
