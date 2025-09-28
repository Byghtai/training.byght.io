import React, { useState, useEffect } from 'react';
import { Play, Loader } from 'lucide-react';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load video on component mount
  useEffect(() => {
    loadVideo();
    
    // Cleanup blob URL when component unmounts
    return () => {
      if (videoUrl && videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);
  
  // Cleanup old blob URL when new one is set
  useEffect(() => {
    return () => {
      if (videoUrl && videoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const loadVideo = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching video...');
      const response = await fetch('/api/get-video');
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Prüfe ob es ein JSON-Response ist (Fehlerfall) oder direktes Video
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // JSON Response - wahrscheinlich ein Fehler
        const data = await response.json();
        console.log('JSON response (error case):', data);
        
        if (data.success && data.videoUrl) {
          console.log('Using video URL from JSON:', data.videoUrl);
          setVideoUrl(data.videoUrl);
        } else {
          console.warn('Video loading failed:', data.message || 'Unknown error');
          setVideoUrl(null);
        }
      } else if (contentType && contentType.includes('video/mp4')) {
        // Direkter Video-Response
        console.log('Received direct video response');
        const blob = await response.blob();
        console.log('Blob created, size:', blob.size, 'type:', blob.type);
        
        // Debug: Prüfe die ersten Bytes des Blobs
        const arrayBuffer = await blob.arrayBuffer();
        const firstBytes = new Uint8Array(arrayBuffer.slice(0, 32));
        const headerHex = Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
        console.log('Blob first 32 bytes (hex):', headerHex);
        
        // Erstelle neuen Blob mit explizitem MIME-Type
        const videoBlob = new Blob([arrayBuffer], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(videoBlob);
        console.log('Created blob URL:', videoUrl);
        setVideoUrl(videoUrl);
      } else {
        console.error('Unexpected content type:', contentType);
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
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => {
              console.error('Video error:', e);
              console.error('Video URL that failed:', videoUrl);
              console.error('Video element error details:', e.target.error);
              if (e.target.error) {
                console.error('Error code:', e.target.error.code);
                console.error('Error message:', e.target.error.message);
              }
            }}
            onLoadedData={() => console.log('Video data loaded')}
            onLoadedMetadata={() => console.log('Video metadata loaded')}
            onProgress={() => console.log('Video loading progress')}
            onSuspend={() => console.log('Video loading suspended')}
            onStalled={() => console.log('Video loading stalled')}
            src={videoUrl}
            preload="metadata"
          >
            Your browser does not support the video element.
          </video>
          <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded max-w-xs truncate">
            {videoUrl && videoUrl.startsWith('blob:') ? 'Blob URL' : videoUrl}
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            <a 
              href="/api/get-video" 
              download="einfuehrung-test.mp4"
              className="text-blue-300 hover:text-blue-100"
            >
              Download Test
            </a>
          </div>
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
