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
    // Erstelle Netlify Blob Store für Training-Videos
    const store = getStore({
      name: 'training-videos',
      consistency: 'strong'
    });

    // Liste alle Videos im Store auf
    const { blobs } = await store.list();
    
    // Finde das neueste Einführung-Video
    const einfuhrungVideos = blobs.filter(blob => 
      blob.key && blob.key.includes('einfuehrung-test') && blob.key.endsWith('.mp4')
    );
    
    if (einfuhrungVideos.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'No videos found in Blob Storage',
        message: 'Keine Videos im Blob Storage gefunden. Bitte laden Sie zuerst ein Video hoch.'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Sortiere nach Upload-Datum (neuestes zuerst)
    einfuhrungVideos.sort((a, b) => 
      new Date(b.metadata?.uploadedAt || 0) - new Date(a.metadata?.uploadedAt || 0)
    );

    const latestVideo = einfuhrungVideos[0];
    
    // Hole das Video mit URL aus dem Blob Store
    const videoData = await store.getWithMetadata(latestVideo.key, { type: 'url' });

    return new Response(JSON.stringify({ 
      success: true, 
      videoUrl: videoData.url,
      fileName: latestVideo.key,
      metadata: latestVideo.metadata,
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
