import React from 'react';
import { GlitchText } from '../effects/GlitchText';
import { TypewriterText } from '../effects/TypewriterText';

export function SupportHero() {
  return (
    <section className="relative py-20 overflow-hidden border-b border-white/10 bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      </div>
      
      {/* Static effect overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://media.giphy.com/media/oEI9uWUoW9kfS/giphy.gif')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-primary/10 border border-primary/30 px-3 py-1 mb-6">
            <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
              Security Level: Clearance Level 4 Required
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black mb-4 tracking-tighter">
            <GlitchText text="OPERATION HOPE" />
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="flex-1">
              <div className="text-xl md:text-2xl font-mono text-gray-400 mb-6 leading-relaxed">
                <TypewriterText text="PROJECT: MUTUAL AID FOR THE FRONT LINES. WE DON'T JUST REPORT THE SYSTEM'S FAILURES; WE FIX THEM TOGETHER." delay={30} />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-destructive text-white px-6 py-3 font-display text-sm font-bold border-2 border-white/20 rotate-[-2deg] shadow-lg">
                  URGENT PRIORITY
                </div>
                <div className="bg-black border border-white/20 px-6 py-3 font-mono text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary animate-pulse rounded-full"></span>
                  ACTIVE DOSSIERS: 147
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-64 aspect-[3/4] bg-zinc-900 border-2 border-white/10 p-4 relative rotate-[2deg] shadow-2xl hidden md:block">
              <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-[10px] font-bold z-20">
                TOP SECRET
              </div>
              <div className="w-full h-full border border-white/5 bg-zinc-800 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📁</span>
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">Case File Archive</div>
                <div className="text-xs font-bold mt-2 font-display">RESTRICTED ACCESS</div>
                <div className="mt-4 w-full h-1 bg-white/10">
                  <div className="w-2/3 h-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Stamp */}
      <div className="absolute bottom-10 right-[10%] opacity-20 pointer-events-none rotate-12 hidden lg:block">
        <div className="border-8 border-destructive px-8 py-4 rounded-xl text-destructive font-display text-6xl font-black opacity-50">
          CLASSIFIED
        </div>
      </div>
    </section>
  );
}
