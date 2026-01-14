import { useState } from 'react';

/**
 * TrailerModal Component
 * Modal to display YouTube trailer videos
 */
export default function TrailerModal({ trailerUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (error) {
      console.error('Invalid YouTube URL:', error);
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!embedUrl) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-primary text-2xl font-bold z-50"
          aria-label="Close trailer"
        >
          ✕
        </button>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          </div>
        )}

        {/* YouTube Embed */}
        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
