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

    // Lade das spezifische Video "einfuehrung-test.mp4"
    const videoData = await store.getWithMetadata('einfuehrung-test.mp4', { type: 'url' });
    
    if (!videoData) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Video not found in Blob Storage',
        message: 'Das Video "einfuehrung-test.mp4" wurde nicht im Blob Storage gefunden.'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      videoUrl: videoData.url,
      fileName: 'einfuehrung-test.mp4',
      metadata: videoData.metadata,
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
