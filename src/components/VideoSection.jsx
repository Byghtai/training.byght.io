import React, { useState, useEffect } from 'react';
import { Play, Loader } from 'lucide-react';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load video on component mount
  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-video');
      const data = await response.json();
      
      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        console.warn('Video loading failed:', data.message || 'Unknown error');
        setVideoUrl(null);
      }
    } catch (error) {
      console.error('Error loading video:', error);
      setVideoUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-byght-turquoise" size={32} />
        <span className="ml-3 text-gray-600">Video wird geladen...</span>
      </div>
    );
  }

  return (
    <div>
      {videoUrl ? (
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            controls
            className="w-full h-auto"
            poster="/api/placeholder/800/450"
          >
            <source src={videoUrl} type="video/mp4" />
            Ihr Browser unterstützt das Video-Element nicht.
          </video>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Play className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Kein Video verfügbar
          </h3>
          <p className="text-gray-600">
            Das Einführungsvideo ist derzeit nicht verfügbar.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
