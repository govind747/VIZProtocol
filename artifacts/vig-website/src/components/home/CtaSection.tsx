import React, { useEffect, useRef, useState } from 'react';
import { GlitchText } from '../effects/GlitchText';

export function CtaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  
  const targetMessage = "Living in Croatia, a wealthy American businessman transforms into a feared vigilante who targets violent criminals, rapists and corrupt judges. As his brutal campaign gains traction online and across the media, he soon becomes a wanted criminal and an unlikely public hero - Citizen Vigilante.";

  // 1. Unified Background Matrix Rain Engine (15% Trail Boost)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Constrain context boundaries to the section container dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*'.split('');
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    let drops: number[] = Array(Math.ceil(columns)).fill(1);

    const draw = () => {
      // 0.0435 alpha opacity retains trail lines 15% longer on screen
      ctx.fillStyle = 'rgba(0, 0, 0, 0.0435)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66'; // Primary terminal green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // 2. Multi-Line Real-Time Decryption / 1-Minute Hold Loop
  useEffect(() => {
    let currentIdx = 0;
    const numericGlitch = "0123456789";
    let loopTimeout: NodeJS.Timeout;

    const textInterval = setInterval(() => {
      if (currentIdx <= targetMessage.length) {
        const lockedChunk = targetMessage.substring(0, currentIdx);
        
        let dynamicSuffix = '';
        if (currentIdx < targetMessage.length) {
          dynamicSuffix = Array.from({ length: Math.min(5, targetMessage.length - currentIdx) })
            .map(() => numericGlitch[Math.floor(Math.random() * numericGlitch.length)])
            .join('');
        }

        setDisplayedText(lockedChunk + dynamicSuffix);
        currentIdx++;
      } else {
        clearInterval(textInterval);
        
        // Exact 1-Minute display pause before wiping and looping
        loopTimeout = setTimeout(() => {
          setDisplayedText('');
        }, 60000);
      }
    }, 45);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loopTimeout);
    };
  }, [displayedText === '']);

  return (
    <section className="relative py-32 border-b border-white/10 overflow-hidden bg-black flex flex-col items-center justify-center text-center min-h-[90vh]">
      {/* Background Matrix Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-25 z-0" 
      />
      
      {/* Central CTA Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-black/50 p-8 md:p-16 border border-primary/30 backdrop-blur-sm">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-12 uppercase leading-tight">
            <GlitchText text="THE INTERNET'S FAVORITE INVESTMENT STRATEGY" />
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-destructive flex items-center justify-center text-destructive font-display text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(255,49,49,0.3)] bg-black">
                1
              </div>
              <div className="text-xl font-mono text-white font-bold uppercase tracking-widest">BAN IT</div>
            </div>
            
            <div className="hidden md:block w-16 h-1 bg-white/20 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-white/20 rotate-45"></div>
            </div>
            
            <div className="md:hidden h-16 w-1 bg-white/20 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 border-b-2 border-r-2 border-white/20 rotate-45"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display text-3xl font-bold mb-4 shadow-[0_0_20px_rgba(0,255,102,0.3)] bg-black">
                2
              </div>
              <div className="text-xl font-mono text-white font-bold uppercase tracking-widest">WATCH IT PUMP</div>
            </div>
          </div>
          
          <button className="bg-primary text-black font-display font-bold text-2xl px-12 py-6 uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105 transform">
            SECURE YOUR BAG
          </button>
        </div>
      </div>

      {/* Two-Line Decrypting Narrative Track at the Bottom Boundary */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-center">
        <p 
          className="w-full max-w-5xl text-primary text-xs md:text-sm font-mono font-bold tracking-wide uppercase text-center leading-relaxed select-none opacity-80"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: '0 0 6px rgba(0,255,102,0.4)'
          }}
        >
          {displayedText}
          {displayedText && <span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-pulse" />}
        </p>
      </div>
    </section>
  );
}