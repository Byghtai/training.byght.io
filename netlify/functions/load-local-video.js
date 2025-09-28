import { getStore } from '@netlify/blobs';
import fs from 'fs';
import path from 'path';

export default async (request, context) => {
  // CORS Headers
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
    // Erstelle einen Blob Store für Videos
    const store = getStore({
      name: 'training-videos',
      consistency: 'strong'
    });

    // Lade das lokale Video
    const videoPath = path.join(process.cwd(), 'public', 'assets', 'Einfuehrung-test.mp4');
    
    if (!fs.existsSync(videoPath)) {
      return new Response(JSON.stringify({ 
        error: 'Lokales Video nicht gefunden',
        path: videoPath
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Lese das Video als Buffer
    const videoBuffer = fs.readFileSync(videoPath);
    const fileName = `einfuehrung-test-${Date.now()}.mp4`;

    // Speichere das Video im Netlify Blob Store
    await store.set(fileName, videoBuffer, {
      metadata: {
        originalName: 'Einfuehrung-test.mp4',
        contentType: 'video/mp4',
        size: videoBuffer.length,
        uploadedAt: new Date().toISOString(),
        source: 'local-file'
      }
    });

    // Erstelle eine öffentliche URL für das Video
    const videoUrl = await store.getUrl(fileName);

    return new Response(JSON.stringify({ 
      success: true, 
      fileName,
      videoUrl,
      message: 'Lokales Video erfolgreich in Netlify Blob Storage geladen',
      size: videoBuffer.length
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Load local video error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to load local video', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
