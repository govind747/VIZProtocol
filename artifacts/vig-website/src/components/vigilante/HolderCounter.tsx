import React, { useEffect, useState } from 'react';

export function HolderCounter() {
  const [count, setCount] = useState(104238);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 border-b border-white/10 bg-[#070707] text-center">
      <div className="font-mono text-gray-500 uppercase text-sm mb-4">CONFIRMED OPERATIVES</div>
      <div className="text-6xl md:text-8xl font-display font-black text-primary tracking-tighter">
        {count.toLocaleString()}
      </div>
    </section>
  );
}
