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
    <footer className={`border-t-4 border-double border-white/20 mt-20 bg-[#0a0a0a] relative overflow-hidden ${isGlitching ? 'opacity-80' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-destructive text-white text-xs font-bold px-2 py-1 font-mono uppercase tracking-widest border border-red-500/50">
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
          
          <div className="text-right font-mono text-xs text-gray-500 flex flex-col items-end gap-2 uppercase">
            <div className="border border-white/10 p-2 inline-block">
              <span className="text-gray-400 mr-2">Access Level:</span>
              <span className="bg-white/10 text-white/10 select-none">██████████</span>
            </div>
            <div>STATUS: UNREDACTED</div>
            <div className="mt-4 text-primary/50">© 2026 VIG</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
