import React from 'react';

export function CensorshipIndex() {
  // Simple CSS grid map representation
  const regions = [
    { name: "North America", level: "MEDIUM", color: "bg-yellow-500", shadow: "shadow-yellow-500/50" },
    { name: "Europe", level: "HIGH", color: "bg-orange-500", shadow: "shadow-orange-500/50" },
    { name: "Asia", level: "MEDIUM", color: "bg-yellow-500", shadow: "shadow-yellow-500/50" },
    { name: "South America", level: "LOW", color: "bg-primary", shadow: "shadow-green-500/50" },
    { name: "Africa", level: "LOW", color: "bg-primary", shadow: "shadow-green-500/50" },
    { name: "Oceania", level: "MEDIUM", color: "bg-yellow-500", shadow: "shadow-yellow-500/50" }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest text-center">GLOBAL CENSORSHIP HEATMAP</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {regions.map((region, i) => (
            <div key={i} className="border border-white/10 bg-[#111] p-6 text-center group hover:border-white/30 transition-colors">
              <div className="text-gray-400 font-mono text-sm uppercase mb-4">{region.name}</div>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full ${region.color} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:${region.shadow} transition-shadow animate-pulse`}>
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${region.color} opacity-50`}></div>
                  </div>
                </div>
              </div>
              <div className={`font-mono font-bold text-sm uppercase ${
                region.level === 'EXTREME' ? 'text-destructive' :
                region.level === 'HIGH' ? 'text-orange-500' :
                region.level === 'MEDIUM' ? 'text-yellow-500' : 'text-primary'
              }`}>
                THREAT: {region.level}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-white uppercase border border-white/10 p-4 bg-black">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary animate-pulse"></div> LOW</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 animate-pulse"></div> MEDIUM</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 animate-pulse"></div> HIGH</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-destructive animate-pulse"></div> EXTREME</div>
        </div>
      </div>
    </section>
  );
}
