import React from 'react';
import { Play } from 'lucide-react';

const VideoSection = () => {
  // YouTube Video ID aus der URL extrahieren
  const youtubeVideoId = 'pLHLB3d1sm0';
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <div>
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={youtubeEmbedUrl}
            title="ISMS SmartKit Training Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          YouTube Video
        </div>
        <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
          <a 
            href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100"
          >
            Auf YouTube ansehen
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
