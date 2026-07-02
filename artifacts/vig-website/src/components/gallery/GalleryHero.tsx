import React from 'react';
import { GlitchText } from '../effects/GlitchText';

export function GalleryHero() {
  return (
    <section className="relative py-20 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 bg-primary text-black font-mono text-xs font-bold mb-4 uppercase tracking-tighter">
            Security Clearance Level: 4 Required
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">
            <GlitchText text="CLASSIFIED MEDIA VAULT" />
          </h1>
          <p className="text-xl text-gray-400 font-mono max-w-2xl leading-relaxed">
            LEAKED INTELLIGENCE MEDIA. UNREDACTED EVIDENCE OF GOVERNMENT OVERSIGHT. 
            FOR EYES OF VIGILANTE HOLDERS ONLY. DO NOT DISTRIBUTE.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/5 pointer-events-none rotate-45" />
      <div className="absolute bottom-0 right-1/4 w-px h-20 bg-gradient-to-t from-primary/50 to-transparent" />
    </section>
  );
}
