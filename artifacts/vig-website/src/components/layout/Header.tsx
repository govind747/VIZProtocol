import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { GlitchText } from '../effects/GlitchText';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [location] = useLocation();
  const [isGlitching, setIsGlitching] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { href: '/gallery', label: 'Gallery' },
    { href: '/support', label: 'Support' },
    { href: '/terminal', label: 'Terminal' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 border-b-2 border-primary/40 bg-gradient-to-r from-primary/15 via-background/95 to-secondary/15 backdrop-blur-lg shadow-[0_4px_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 ${
        isGlitching ? 'translate-x-1 -translate-y-1 ring-2 ring-destructive' : ''
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center">
          <span className="text-2xl font-black font-display text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:text-primary transition-colors">
            <GlitchText text="[VIG]" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-widest font-bold hover:text-white transition-all duration-200 ${
                location === link.href 
                  ? 'text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] border-b-2 border-primary pb-1' 
                  : 'text-gray-100 hover:scale-105'
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-2 font-mono text-xs bg-black/40 px-3 py-1 rounded border border-white/20">
            <span className="text-white font-medium tracking-wider">LIVE HOLDERS</span>
            <span className="text-primary font-black drop-shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)]">104,238</span>
          </div>
          
          <a
            href="#"
            data-testid="button-buy-vig"
            className="bg-destructive text-white px-5 py-2.5 font-display uppercase text-xs font-black tracking-widest hover:bg-red-500 transition-all duration-200 border-2 border-red-400 shadow-[0_0_20px_rgba(255,49,49,0.6)] hover:shadow-[0_0_35px_rgba(255,49,49,0.9)] hover:scale-105 animate-pulse"
          >
            BUY VIG
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white hover:text-primary transition-colors ml-1 p-1 bg-white/5 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-primary/30 bg-background/98 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-sm uppercase tracking-widest font-bold hover:text-white transition-colors py-2 px-3 rounded ${
                  location === link.href 
                    ? 'text-primary bg-primary/10 border-l-4 border-primary' 
                    : 'text-gray-200 hover:bg-white/5'
                }`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="font-mono text-xs mt-2 pt-3 border-t border-white/10 flex justify-between items-center px-3">
              <span className="text-gray-300 font-bold">LIVE HOLDERS: </span>
              <span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">104,238</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}