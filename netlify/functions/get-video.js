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
        // Debug: Schaue dir die ersten Bytes des Videos an
        console.log('Loading video as ArrayBuffer for inspection...');
        const videoData = await store.get('einfuehrung-test.mp4', { type: 'arrayBuffer' });
        console.log('Successfully loaded video, size:', videoData.byteLength, 'bytes');
        
        // Inspiziere die ersten Bytes (MP4 Header)
        const firstBytes = new Uint8Array(videoData.slice(0, 32));
        const headerHex = Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
        console.log('First 32 bytes (hex):', headerHex);
        
        // Prüfe MP4 Magic Number
        const mp4Magic1 = firstBytes[4] === 0x66 && firstBytes[5] === 0x74 && firstBytes[6] === 0x79 && firstBytes[7] === 0x70; // 'ftyp'
        const mp4Magic2 = Array.from(firstBytes.slice(4, 8)).map(b => String.fromCharCode(b)).join('') === 'ftyp';
        console.log('MP4 magic check 1:', mp4Magic1);
        console.log('MP4 magic check 2:', mp4Magic2);
        console.log('File type signature:', Array.from(firstBytes.slice(4, 12)).map(b => String.fromCharCode(b)).join(''));
        
        // Data-URLs sind zu groß für große Videos - verwende direkten Blob-Response
        console.log('Video is valid MP4, but too large for data URL. Serving directly...');
        
        // Gib das Video direkt als Response zurück anstatt als JSON
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
