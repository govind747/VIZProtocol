import React, { useState } from 'react';

export function Tokenomics() {
  return (
    <section className="py-20 border-b border-white/10 bg-[#111]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[#f3f3f3] text-black p-8 border-4 border-black relative transform rotate-1">
          <div className="absolute top-4 right-4 border-4 border-destructive text-destructive font-display font-bold text-3xl p-2 transform rotate-12 opacity-80 pointer-events-none">
            CLASSIFIED
          </div>
          
          <div className="border-b-4 border-black pb-4 mb-8 text-center">
            <h2 className="text-4xl font-display font-black uppercase tracking-widest">TOKENOMICS DOSSIER</h2>
            <div className="font-mono text-xs mt-2 uppercase">Subject: $VIG Distribution Metrics</div>
          </div>
          
          <div className="space-y-6 font-mono text-lg">
            <RedactedRow label="SUPPLY" redacted="██████████" reveal="1,000,000,000" />
            <RedactedRow label="LIQUIDITY" redacted="███████" reveal="100% BURNT" />
            <RedactedRow label="TAXES" redacted="███" reveal="0% BUY/SELL" />
            <RedactedRow label="COMMUNITY" redacted="████████████" reveal="OWNED & RUTHLESS" />
            <RedactedRow label="MARKETING" redacted="██████" reveal="VIRAL MEMETICS" />
          </div>
          
          <div className="mt-12 pt-4 border-t-2 border-dashed border-black font-mono text-xs uppercase text-gray-600">
            WARNING: Disclosing accurate metrics may result in severe FOMO.
          </div>
        </div>
      </div>
    </section>
  );
}

function RedactedRow({ label, redacted, reveal }: { label: string, redacted: string, reveal: string }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/20 pb-2 cursor-crosshair group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-bold w-32">{label}:</span>
      <span className={`transition-all ${hovered ? 'bg-transparent text-destructive font-bold' : 'bg-black text-black'}`}>
        {hovered ? reveal : redacted}
      </span>
    </div>
  );
}
