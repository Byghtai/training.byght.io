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

    // Direkter Ansatz: ArrayBuffer mit korrekten Headers
    try {
      console.log('Loading video as arrayBuffer...');
      const videoData = await store.get('einfuehrung-test.mp4', { type: 'arrayBuffer' });
      console.log('Successfully loaded video, size:', videoData.byteLength, 'bytes');
      
      // Erstelle Response mit korrekten Headers
      const response = new Response(videoData, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'video/mp4',
          'Content-Length': videoData.byteLength.toString(),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Expose-Headers': 'Content-Length, Accept-Ranges'
        }
      });
      
      console.log('Returning video response with headers:', Object.fromEntries(response.headers.entries()));
      return response;
      
    } catch (arrayBufferError) {
      console.error('ArrayBuffer approach failed:', arrayBufferError);
      
      // Fallback: Versuche Text um zu sehen was passiert
      try {
        console.log('Trying text type as debug...');
        const debugData = await store.get('einfuehrung-test.mp4', { type: 'text' });
        console.log('Text response (first 100 chars):', debugData.substring(0, 100));
        
        return new Response('Video loading failed - check logs for details', {
          status: 500,
          headers: corsHeaders
        });
      } catch (textError) {
        console.error('Even text approach failed:', textError);
        throw arrayBufferError;
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
