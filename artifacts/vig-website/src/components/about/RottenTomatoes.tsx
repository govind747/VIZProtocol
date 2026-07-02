import React, { useState } from 'react';

export function RottenTomatoes() {
  const [splat, setSplat] = useState(false);

  return (
    <section className="py-20 border-b border-white/10 bg-[#070707]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 border border-black shadow-[8px_8px_0px_rgba(0,255,102,1)] text-black">
          <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter">PUBLIC RECEPTION</h2>
            <div className="font-mono text-xs uppercase bg-black text-white px-2 py-1">VIG-METRICS</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center cursor-pointer group"
              onMouseEnter={() => setSplat(true)}
              onMouseLeave={() => setSplat(false)}
            >
              <div className="text-sm font-mono font-bold mb-2 uppercase text-gray-500">CRITICS</div>
              <div className="relative inline-block">
                <div className="text-6xl font-black font-display text-destructive">2%</div>
                {splat && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-destructive rounded-full opacity-80 blur-sm scale-150 animate-ping"></div>
                  </div>
                )}
              </div>
              <div className="text-xs font-mono uppercase mt-2 font-bold text-destructive">"Too Dangerous"</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-mono font-bold mb-2 uppercase text-gray-500">COMMUNITY</div>
              <div className="text-6xl font-black font-display text-primary">999%</div>
              <div className="text-xs font-mono uppercase mt-2 font-bold text-primary">"Based"</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-mono font-bold mb-2 uppercase text-gray-500">MEMES</div>
              <div className="text-6xl font-black font-display text-black">∞%</div>
              <div className="text-xs font-mono uppercase mt-2 font-bold text-black">"Unstoppable"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
