import React from 'react';

export function CommunityLinks() {
  const links = [
    { name: "TELEGRAM", id: "COM-01" },
    { name: "X (TWITTER)", id: "COM-02" },
    { name: "DEXSCREENER", id: "COM-03" },
    { name: "COINMARKETCAP", id: "COM-04" }
  ];

  return (
    <section className="py-20 bg-black border-b border-white/10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-widest">SECURE CHANNELS</h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <a 
              key={link.id} 
              href="#" 
              className="group relative border border-white/20 bg-[#111] px-6 py-4 hover:border-primary transition-colors min-w-[200px]"
            >
              <div className="absolute top-0 right-0 bg-white/10 text-gray-500 text-[10px] font-mono px-1">
                {link.id}
              </div>
              <div className="font-display font-bold text-white group-hover:text-primary uppercase tracking-wider mt-2">
                {link.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
