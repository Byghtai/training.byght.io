import React from 'react';
import { Play } from 'lucide-react';

const VideoSection = ({ videoId = 'pLHLB3d1sm0', title = 'ISMS SmartKit Training Introduction' }) => {
  // YouTube Video ID aus der URL extrahieren
  const youtubeVideoId = videoId;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <div>
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={youtubeEmbedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
