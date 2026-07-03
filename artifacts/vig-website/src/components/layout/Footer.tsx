import React, { useState, useEffect } from 'react';

export function Footer() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* FIXED: Removed mt-20 to eliminate the invisible top margin gap */
    <footer className={`border-t-4 border-double border-white/20 bg-[#0a0a0a] relative overflow-hidden ${isGlitching ? 'opacity-80' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-destructive text-white text-xs font-bold px-2 py-1 font-mono uppercase tracking-widest border border-primary/80">
                CLASSIFIED DOCUMENT
              </span>
              <span className="text-gray-500 font-mono text-xs">FILE REF: VIG-2026-X99</span>
            </div>
            <p className="text-gray-400 font-mono text-xs leading-relaxed uppercase">
              This website is satire. Citizen Vigilante is a community meme project. 
              Nothing on this website is financial advice. All leaked files are fictional.
              Any resemblance to actual government operations is highly concerning but coincidental.
            </p>
          </div>

          <div className="border-2 border-primary/20 p-4 bg-zinc-950 shadow-[0_0_15px_rgba(var(--primary-rgb),0.05)]">
            <h4 className="text-[10px] text-primary font-bold tracking-widest uppercase mb-4 border-b border-primary/20 pb-2">
              Intelligence Sharing
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'X', url: 'https://x.com/yourhandle' },
                { label: 'TG', url: 'https://t.me/yourchannel' },
                { label: 'RD', url: 'https://reddit.com/r/yourcommunity' },
                { label: 'FB', url: 'https://facebook.com/yourpage' },
                { label: 'IG', url: 'https://instagram.com/yourprofile' }
              ].map((site) => (
                <a 
                  key={site.label} 
                  href={site.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/30 text-white font-mono font-bold flex items-center justify-center text-[10px] bg-white/5 hover:border-primary hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] transition-all duration-200"
                >
                  {site.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-right font-mono text-xs text-gray-500 flex flex-col items-end gap-2 uppercase">
            <div className="border border-white/10 p-2 inline-block">
              <span className="text-gray-400 mr-2">Access Level:</span>
              <span className="bg-white/10 text-white/90 select-none">██████████ 98%</span>
            </div>
            <div className="text-gray-400">STATUS: UNREDACTED</div>
            <div className="mt-4 text-primary/80">© 2026 VIG</div>
          </div>
        </div>
      </div>
    </footer>
  );
}