import React from 'react';

export function Timeline() {
  const events = [
    { date: "██/██/2025", title: "MOVIE RELEASED", desc: "Initial broadcast reaches the masses. Narrative seeds planted." },
    { date: "██/██/2025", title: "CONTROVERSY IGNITES", desc: "Mainstream media flags content as 'unauthorized'. Attempted suppression begins." },
    { date: "██/██/2025", title: "INTERNET EXPLODES", desc: "Streisand effect initiated. Discussion volume exceeds containment thresholds." },
    { date: "██/██/2025", title: "MEMES CREATED", desc: "Weaponized autism deploys. Thousands of decentralized assets generated daily." },
    { date: "██/██/2026", title: "VIG BORN", desc: "Financial embodiment of the movement established. Contract deployed." }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest border-b border-white/10 pb-4">
          INCIDENT LOG
        </h2>
        
        <div className="relative border-l-2 border-primary/50 ml-4 md:ml-8 space-y-12">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              <div className="absolute w-4 h-4 bg-black border-2 border-primary rounded-full -left-[9px] top-1 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,255,102,0.5)]"></div>
              
              <div className="bg-[#111] border border-white/10 p-6 group-hover:border-primary/50 transition-colors">
                <div className="text-primary font-mono text-sm mb-2">{event.date}</div>
                <h3 className="text-xl font-display font-bold text-white uppercase mb-2">{event.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">{event.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono uppercase">
                  LOG ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
