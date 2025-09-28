import React, { useState, useEffect } from 'react';
import { Play, Upload, Loader, AlertCircle, CheckCircle } from 'lucide-react';

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lade das Video beim Komponenten-Mount
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
      console.error('Fehler beim Laden des Videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validiere Dateityp
    if (!file.type.startsWith('video/')) {
      setUploadStatus({ type: 'error', message: 'Bitte wählen Sie eine Video-Datei aus.' });
      return;
    }

    // Validiere Dateigröße (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setUploadStatus({ type: 'error', message: 'Die Datei ist zu groß. Maximum: 100MB' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setVideoUrl(data.videoUrl);
        setUploadStatus({ type: 'success', message: 'Video erfolgreich hochgeladen!' });
        // Status nach 3 Sekunden zurücksetzen
        setTimeout(() => setUploadStatus(null), 3000);
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Upload fehlgeschlagen' });
      }
    } catch (error) {
      console.error('Upload-Fehler:', error);
      setUploadStatus({ type: 'error', message: 'Upload fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-byght-turquoise" size={32} />
          <span className="ml-3 text-gray-600">Lade Video...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
          <Play className="text-byght-turquoise" size={28} />
          Einführungsvideo
        </h2>
        <p className="text-gray-600">
          Schauen Sie sich zuerst unser Einführungsvideo an, bevor Sie mit dem Import beginnen.
        </p>
      </div>

      {videoUrl ? (
        <div className="mb-6">
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
          <p className="text-sm text-gray-500 mt-2">
            💡 Tipp: Schauen Sie sich das Video vollständig an, um alle wichtigen Schritte zu verstehen.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Kein Einführungsvideo verfügbar
          </h3>
          <p className="text-gray-600 mb-4">
            Laden Sie das Einführungsvideo hoch, um es hier anzuzeigen.
          </p>
          <label className="inline-flex items-center px-4 py-2 bg-byght-turquoise text-white rounded-lg hover:bg-byght-turquoise/90 transition-colors cursor-pointer">
            <Upload size={20} className="mr-2" />
            Video hochladen
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      )}

      {/* Upload-Status */}
      {uploadStatus && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          uploadStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
          ) : (
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          )}
          <span className={`${
            uploadStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {uploadStatus.message}
          </span>
        </div>
      )}

      {/* Upload-Button (auch wenn Video vorhanden) */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Video aktualisieren
            </h4>
            <p className="text-sm text-gray-600">
              Laden Sie eine neue Version des Einführungsvideos hoch.
            </p>
          </div>
          <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            {isUploading ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              <Upload className="mr-2" size={16} />
            )}
            {isUploading ? 'Wird hochgeladen...' : 'Neues Video'}
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
