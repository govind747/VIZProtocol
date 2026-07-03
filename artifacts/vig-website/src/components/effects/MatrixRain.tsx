import React, { useEffect, useRef, useState } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  
  const targetMessage = "Living in Croatia, a wealthy American businessman transforms into a feared vigilante who targets violent criminals, rapists and corrupt judges. As his brutal campaign gains traction online and across the media, he soon becomes a wanted criminal and an unlikely public hero - Citizen Vigilante.";

  // Continuous Matrix Rain Background (15% Length Increase)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      // 0.0435 alpha lengthens trails by 15%
      ctx.fillStyle = 'rgba(0, 0, 0, 0.0435)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Text Decoding, 1-Minute Hold, and Loop Logic
  useEffect(() => {
    let currentIdx = 0;
    const numericGlitch = "0123456789";
    let holdTimeout: NodeJS.Timeout;

    const textInterval = setInterval(() => {
      if (currentIdx <= targetMessage.length) {
        const lockedChunk = targetMessage.substring(0, currentIdx);
        
        let dynamicSuffix = '';
        // Create shifting numeric glitch strings for subsequent incomplete positions
        if (currentIdx < targetMessage.length) {
          dynamicSuffix = Array.from({ length: Math.min(5, targetMessage.length - currentIdx) })
            .map(() => numericGlitch[Math.floor(Math.random() * numericGlitch.length)])
            .join('');
        }

        setDisplayedText(lockedChunk + dynamicSuffix);
        currentIdx++;
      } else {
        clearInterval(textInterval);
        
        // Accurate 1-Minute pause loop sequence (60000ms)
        holdTimeout = setTimeout(() => {
          setDisplayedText('');
        }, 60000);
      }
    }, 45); // Smooth text flow speed

    return () => {
      clearInterval(textInterval);
      clearTimeout(holdTimeout);
    };
  }, [displayedText === '']);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono">
      {/* Background Matrix Effect */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 z-0" />

      {/* Raw Bottom-Anchored Two-Line Text Track */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 pointer-events-none flex justify-center">
        <p 
          className="w-full max-w-5xl text-[#00FF66] text-base md:text-lg font-bold tracking-wide uppercase text-left leading-relaxed select-none"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: '0 0 8px rgba(0,255,102,0.5)'
          }}
        >
          {displayedText}
          {displayedText && <span className="inline-block w-2 h-4 bg-[#00FF66] ml-1 animate-pulse" />}
        </p>
      </div>
    </div>
  );
}