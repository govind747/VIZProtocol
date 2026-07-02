import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
}

export function GlitchText({ text, as: Component = 'span', className = '', delay = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <Component 
      className={`${className} ${isGlitching ? 'glitch-effect' : ''}`} 
      data-text={text}
    >
      {text}
    </Component>
  );
}
