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

    // Da type: 'url' nicht funktioniert, erstellen wir eine alternative Lösung
    // Wir geben eine URL zurück, die direkt auf unsere Video-Stream-Funktion zeigt
    const videoUrl = `${process.env.URL || 'https://training.byght.io'}/.netlify/functions/stream-video`;

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
