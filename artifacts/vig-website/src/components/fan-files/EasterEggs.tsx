import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EasterEggs() {
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key];
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      setKeySequence(newSequence);

      if (JSON.stringify(newSequence.map(k => k.toLowerCase())) === JSON.stringify(konamiCode.map(k => k.toLowerCase()))) {
        setKonamiUnlocked(true);
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  return (
    <section className="py-20 border-b border-white/10 bg-black text-center">
      <div className="container mx-auto px-4">
        <Link href="/terminal" className="inline-block border border-primary text-primary font-mono text-sm px-8 py-4 uppercase tracking-widest hover:bg-primary hover:text-black transition-colors mb-8 shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)]">
          &gt;_ OPEN ROOT TERMINAL
        </Link>
        <p className="text-gray-600 font-mono text-xs uppercase max-w-md mx-auto">
          Authorized personnel only. All access attempts are logged.
        </p>

        <Dialog open={konamiUnlocked} onOpenChange={setKonamiUnlocked}>
          <DialogContent className="bg-black border-2 border-primary text-primary max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display uppercase tracking-widest text-center animate-pulse">CONFIDENTIAL MEME UNLOCKED</DialogTitle>
            </DialogHeader>
            <div className="font-mono whitespace-pre text-[10px] sm:text-xs leading-none text-center py-4">
{`
      ,____
      |---.\\
___   |___|\\
\\  \\  |   | \\
 \\  \\ |   |  \\
  \\__\\|___|___\\
    \\   \\ /   /
     \\___|___/
`}
            </div>
            <div className="text-center font-mono font-bold mt-4 uppercase">
              SUCH VIGILANTE. VERY DECENTRALIZED. WOW.
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
