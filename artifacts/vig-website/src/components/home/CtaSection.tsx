import React from 'react';
import { MatrixRain } from '../effects/MatrixRain';
import { GlitchText } from '../effects/GlitchText';

export function CtaSection() {
  return (
    <section className="relative py-32 border-b border-white/10 overflow-hidden bg-black flex flex-col items-center justify-center text-center">
      <MatrixRain />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="bg-black/50 p-8 md:p-16 border border-primary/30 backdrop-blur-sm">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-12 uppercase leading-tight">
            <GlitchText text="THE INTERNET'S FAVORITE INVESTMENT STRATEGY" />
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-destructive flex items-center justify-center text-destructive font-display text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(255,49,49,0.3)] bg-black">
                1
              </div>
              <div className="text-xl font-mono text-white font-bold uppercase tracking-widest">BAN IT</div>
            </div>
            
            <div className="hidden md:block w-16 h-1 bg-white/20 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-white/20 rotate-45"></div>
            </div>
            
            <div className="md:hidden h-16 w-1 bg-white/20 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 border-b-2 border-r-2 border-white/20 rotate-45"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(0,255,102,0.3)] bg-black">
                2
              </div>
              <div className="text-xl font-mono text-white font-bold uppercase tracking-widest">WATCH IT PUMP</div>
            </div>
          </div>
          
          <button className="bg-primary text-black font-display font-bold text-2xl px-12 py-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105 transform">
            SECURE YOUR BAG
          </button>
        </div>
      </div>
    </section>
  );
}
