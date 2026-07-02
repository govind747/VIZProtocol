import React from 'react';
import { GlitchText } from '../effects/GlitchText';

export function AboutHero() {
  return (
    <section className="relative py-24 border-b border-white/10 bg-[#070707] overflow-hidden">
      {/* Film reel background effect */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <div className="w-full flex justify-between space-x-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-96 w-32 border-x-4 border-dashed border-white/40 flex flex-col justify-between">
              {[...Array(6)].map((_, j) => (
                <div key={j} className="w-full h-12 bg-white/20"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-block border border-destructive text-destructive px-4 py-1 font-mono text-sm mb-6 animate-pulse bg-destructive/10 uppercase tracking-widest">
          DOCUMENT REF: VIG-ABOUT-001
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black font-display tracking-tighter text-white mb-6 uppercase">
          <GlitchText text="TOO SPICY FOR APPROVAL" />
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 font-mono leading-relaxed border-l-2 border-primary pl-4 text-left">
          The establishment tried to bury the narrative. They claimed the content was unauthorized. 
          They said the community was too extreme. They thought censorship would stop the signal. 
          They were wrong. This is the origin of Citizen Vigilante.
        </p>
      </div>
    </section>
  );
}
