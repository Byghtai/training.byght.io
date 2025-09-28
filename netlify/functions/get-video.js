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
      // Fallback auf lokales Video, falls keines im Blob Storage gefunden wird
      return new Response(JSON.stringify({ 
        success: true, 
        videoUrl: '/assets/Einfuehrung-test.mp4',
        fileName: 'Einfuehrung-test.mp4',
        metadata: {
          originalName: 'Einfuehrung-test.mp4',
          contentType: 'video/mp4',
          source: 'local-fallback'
        },
        message: 'Lokales Video verwendet (noch kein Upload in Blob Storage)'
      }), {
        status: 200,
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
    
    // Fallback auf lokales Video bei Fehlern
    return new Response(JSON.stringify({ 
      success: true, 
      videoUrl: '/assets/Einfuehrung-test.mp4',
      fileName: 'Einfuehrung-test.mp4',
      metadata: {
        originalName: 'Einfuehrung-test.mp4',
        contentType: 'video/mp4',
        source: 'local-fallback'
      },
      message: 'Lokales Video verwendet (Blob Storage-Fehler)'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
