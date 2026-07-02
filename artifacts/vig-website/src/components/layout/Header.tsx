import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { GlitchText } from '../effects/GlitchText';

export function Header() {
  const [location] = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/vigilante', label: 'Vigilante' },
    { href: '/fan-files', label: 'Fan Files' },
    { href: '/terminal', label: 'Terminal' },
  ];

  return (
    <header className={`fixed top-0 w-full z-40 border-b border-white/10 bg-background/80 backdrop-blur-md transition-all duration-300 ${isGlitching ? 'translate-x-1 -translate-y-1' : ''}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center">
          <span className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
            <GlitchText text="[VIG]" />
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`font-mono text-sm uppercase tracking-wider hover:text-primary transition-colors ${
                location === link.href ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-4 font-mono text-xs">
            <span className="text-gray-500">LIVE HOLDERS</span>
            <span className="text-primary font-bold">104,238</span>
          </div>
          <button className="bg-destructive text-white px-4 py-2 font-display uppercase text-sm font-bold tracking-widest hover:bg-red-600 transition-colors border border-destructive/50 hover:border-red-500 shadow-[0_0_15px_rgba(255,49,49,0.3)] hover:shadow-[0_0_25px_rgba(255,49,49,0.5)] animate-pulse">
            BUY VIG
          </button>
        </div>
      </div>
    </header>
  );
}
