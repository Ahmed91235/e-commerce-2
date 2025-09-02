'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, Expand } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Use placeholder if no images available
  const displayImages = images.length > 0 ? images : ['/placeholder-product.jpg'];
  const currentImage = displayImages[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square">
        <Image
          src={currentImage}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={currentImageIndex === 0}
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </>
        )}

        {/* Zoom/Expand Button */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            {isZoomed ? (
              <ZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Expand className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
            {currentImageIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`
                relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-200
                ${index === currentImageIndex 
                  ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' 
                  : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 dark:hover:ring-gray-600 dark:hover:ring-offset-gray-900'
                }
              `}
            >
              <Image
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}