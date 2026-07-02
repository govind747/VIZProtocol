import React from 'react';
import { GlitchText } from '../effects/GlitchText';

export function FanFilesHero() {
  return (
    <section className="relative py-24 border-b border-white/10 bg-[#070707] overflow-hidden text-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBMMCA4TDggOEw4IDBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none opacity-50"></div>
      
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <div className="inline-block border-2 border-white/20 p-2 mb-8 bg-black/50 backdrop-blur">
          <div className="border border-white/20 p-6">
            <div className="text-primary font-mono text-sm mb-4 uppercase tracking-widest text-center border-b border-primary/20 pb-2">
              DEPARTMENT OF HOMELAND SECURITY / DECENTRALIZED ASSETS DIVISION
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tighter text-white mb-4 uppercase">
              <GlitchText text="COMMUNITY DOSSIERS" />
            </h1>
            
            <p className="text-destructive font-mono text-sm uppercase tracking-widest font-bold">
              WARNING: Publicly leaked evidence. Handle with caution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
