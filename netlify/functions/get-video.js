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
    const store = getStore('training-videos');
    
    // Liste alle Videos im Store auf
    const { blobs } = await store.list();
    
    // Finde das neueste Einführung-Video
    const einfuhrungVideos = blobs.filter(blob => 
      blob.key.includes('einfuehrung-test') && blob.key.endsWith('.mp4')
    );
    
    if (einfuehrungVideos.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Kein Einführungsvideo gefunden' 
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
    const videoUrl = `https://api.netlify.com/v1/sites/${context.site.id}/blobs/${latestVideo.key}`;

    return new Response(JSON.stringify({ 
      success: true, 
      videoUrl,
      fileName: latestVideo.key,
      metadata: latestVideo.metadata
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get video error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get video', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
