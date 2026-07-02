import React from 'react';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { MediaGrid } from '@/components/gallery/MediaGrid';

export function Gallery() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GalleryHero />
      <MediaGrid />
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
    </div>
  );
}

export default Gallery;
