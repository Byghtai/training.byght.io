import { getStore } from '@netlify/blobs';

export default async (request, context) => {
  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Range',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    // Erstelle Netlify Blob Store für Videos
    const store = getStore({
      name: 'videos',
      consistency: 'strong'
    });

    // Lade das Video als ArrayBuffer
    const videoData = await store.get('einfuehrung-test.mp4', { type: 'arrayBuffer' });
    
    if (!videoData) {
      return new Response('Video not found', {
        status: 404,
        headers: corsHeaders
      });
    }

    // Konvertiere ArrayBuffer zu Uint8Array für Response
    const videoBytes = new Uint8Array(videoData);
    
    // Video-Response Headers
    const videoHeaders = {
      ...corsHeaders,
      'Content-Type': 'video/mp4',
      'Content-Length': videoBytes.length.toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600'
    };

    // Handle Range requests für Video-Streaming
    const range = request.headers.get('range');
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : videoBytes.length - 1;
      const chunksize = (end - start) + 1;
      
      const chunk = videoBytes.slice(start, end + 1);
      
      return new Response(chunk, {
        status: 206,
        headers: {
          ...videoHeaders,
          'Content-Range': `bytes ${start}-${end}/${videoBytes.length}`,
          'Content-Length': chunksize.toString()
        }
      });
    }

    // Vollständige Video-Response
    return new Response(videoBytes, {
      status: 200,
      headers: videoHeaders
    });

  } catch (error) {
    console.error('Stream video error:', error);
    
    return new Response('Internal server error', {
      status: 500,
      headers: corsHeaders
    });
  }
};
