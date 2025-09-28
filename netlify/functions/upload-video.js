import { getStore } from '@netlify/blobs';

export default async (request, context) => {
  // CORS Headers für alle Requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('video');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No video file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Erstelle einen Blob Store für Videos
    const store = getStore({
      name: 'training-videos',
      consistency: 'strong'
    });

    // Generiere einen eindeutigen Dateinamen
    const timestamp = Date.now();
    const fileName = `einfuehrung-test-${timestamp}.mp4`;

    // Konvertiere File zu ArrayBuffer für Blob Storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Speichere das Video im Netlify Blob Store
    await store.set(fileName, buffer, {
      metadata: {
        originalName: file.name,
        contentType: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }
    });

    // Erstelle eine öffentliche URL für das Video
    const videoUrl = await store.getUrl(fileName);

    return new Response(JSON.stringify({ 
      success: true, 
      fileName,
      videoUrl,
      message: 'Video erfolgreich in Netlify Blob Storage hochgeladen'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: 'Upload failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
