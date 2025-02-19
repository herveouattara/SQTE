import React, { useState } from 'react';

interface GalleryProps {
  images: Array<{
    url: string;
    title: string;
  }>;
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className="cursor-pointer"
            onClick={() => setSelectedImage(image.url)}
          >
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Aperçu"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};