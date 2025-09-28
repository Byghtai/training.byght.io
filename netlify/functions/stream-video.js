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

    console.log('Attempting to stream video: einfuehrung-test.mp4');

    // Versuche verschiedene Datentypen
    let videoData;
    try {
      // Versuche als Stream
      videoData = await store.get('einfuehrung-test.mp4', { type: 'stream' });
      console.log('Successfully got video as stream');
      
      return new Response(videoData, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'video/mp4',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    } catch (streamError) {
      console.log('Stream failed, trying blob:', streamError.message);
      
      try {
        // Fallback zu Blob
        videoData = await store.get('einfuehrung-test.mp4', { type: 'blob' });
        console.log('Successfully got video as blob');
        
        return new Response(videoData, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'video/mp4',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      } catch (blobError) {
        console.log('Blob failed, trying arrayBuffer:', blobError.message);
        
        // Fallback zu ArrayBuffer
        videoData = await store.get('einfuehrung-test.mp4', { type: 'arrayBuffer' });
        console.log('Successfully got video as arrayBuffer, size:', videoData.byteLength);
        
        return new Response(videoData, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'video/mp4',
            'Content-Length': videoData.byteLength.toString(),
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    }

  } catch (error) {
    console.error('Stream video error:', error);
    
    return new Response('Internal server error', {
      status: 500,
      headers: corsHeaders
    });
  }
};
