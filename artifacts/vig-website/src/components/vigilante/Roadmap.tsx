import React from 'react';
import { TypewriterText } from '../effects/TypewriterText';

export function Roadmap() {
  return (
    <section className="py-20 border-b border-white/10 bg-[#070707]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest text-center">MISSION BRIEFING</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PhaseCard 
            phase="1" 
            title="LEAK BEGINS" 
            status="COMPLETED" 
            desc="Initial token deployment. Liquidity locked. Stealth launch initiated."
            done={true}
          />
          <PhaseCard 
            phase="2" 
            title="COMMUNITY MOBILIZES" 
            status="COMPLETED" 
            desc="Social channels established. Memetic warfare commences. First wave of agents onboarded."
            done={true}
          />
          <PhaseCard 
            phase="3" 
            title="GLOBAL LISTINGS" 
            status="IN PROGRESS" 
            desc="Infiltration of major exchanges. CoinMarketCap/CoinGecko domination."
            done={false}
            active={true}
          />
          <PhaseCard 
            phase="4" 
            title="INTERNET TAKEOVER" 
            status="LOCKED" 
            desc="Total narrative control. Institutional capitulation. Vigilante supremacy."
            done={false}
          />
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, title, status, desc, done, active = false }: any) {
  return (
    <div className={`border p-6 font-mono ${done ? 'border-primary bg-primary/5' : active ? 'border-yellow-500 bg-yellow-500/5' : 'border-white/10 bg-[#111]'}`}>
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
        <span className={`text-xl font-display font-bold ${done ? 'text-primary' : active ? 'text-yellow-500' : 'text-gray-500'}`}>
          PHASE {phase}
        </span>
        <span className={`text-xs px-2 py-1 font-bold ${done ? 'bg-primary text-black' : active ? 'bg-yellow-500 text-black animate-pulse' : 'bg-white/10 text-gray-500'}`}>
          {status} {active && '...'}
        </span>
      </div>
      <h3 className="text-white font-bold text-lg mb-2 uppercase">{title}</h3>
      <p className="text-gray-400 text-sm h-16">{desc}</p>
    </div>
  );
}
