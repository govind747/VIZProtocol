import React from 'react';
import { GlitchText } from '../effects/GlitchText';

export function VigilanteHero() {
  return (
    <section className="relative py-32 border-b border-white/10 bg-[#070707] overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat pointer-events-none mix-blend-luminosity"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter text-white mb-6 uppercase">
          <GlitchText text="WHY WERE WE BANNED?" />
        </h1>
        
        <p className="text-xl font-mono text-gray-400 mb-12 uppercase tracking-widest bg-black/50 p-4 border border-white/10 inline-block">
          BECAUSE THEY COULDN'T CONTROL THE NARRATIVE.
        </p>
        
        <div className="flex flex-col items-center">
          <button className="group relative px-12 py-6 bg-primary text-black font-display font-bold uppercase tracking-widest text-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:shadow-[0_0_50px_rgba(0,255,102,0.6)] transition-shadow">
            <span className="relative z-10">BUY VIG NOW</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <div className="text-primary font-mono text-sm mt-4 font-bold tracking-widest animate-pulse">
            [ ACCESS GRANTED ]
          </div>
        </div>
      </div>
    </section>
  );
}
