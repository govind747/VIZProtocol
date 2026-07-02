import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  as?: any;
  cursor?: boolean;
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '',
  as: Component = 'span',
  cursor = true
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <Component className={className}>
      {displayedText}
      {cursor && (!finished || finished) && (
        <span className="animate-pulse border-r-2 border-primary ml-1 pr-1" style={{ animationDuration: '0.8s' }}></span>
      )}
    </Component>
  );
}
