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
      }
    } catch (error) {
      console.error('Error loading video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-byght-turquoise" size={32} />
        <span className="ml-3 text-gray-600">Loading video...</span>
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
            Your browser does not support the video element.
          </video>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Play className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No video available
          </h3>
          <p className="text-gray-600">
            The introduction video is not currently available.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
