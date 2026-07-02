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
      className={`fixed top-0 w-full z-40 border-b border-white/10 bg-background/85 backdrop-blur-md transition-all duration-300 ${
        isGlitching ? 'translate-x-1 -translate-y-1' : ''
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center">
          <span className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
            <GlitchText text="[VIG]" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-wider hover:text-primary transition-colors ${
                location === link.href ? 'text-primary' : 'text-gray-300'
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-2 font-mono text-xs">
            <span className="text-gray-400">LIVE HOLDERS</span>
            <span className="text-primary font-bold">104,238</span>
          </div>
          <a
            href="#"
            data-testid="button-buy-vig"
            className="bg-destructive text-white px-4 py-2 font-display uppercase text-xs font-bold tracking-widest hover:bg-red-500 transition-colors border border-destructive/50 hover:border-red-400 shadow-[0_0_15px_rgba(255,49,49,0.35)] hover:shadow-[0_0_25px_rgba(255,49,49,0.55)] animate-pulse"
          >
            BUY VIG
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-gray-300 hover:text-primary transition-colors ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-3 gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-sm uppercase tracking-wider hover:text-primary transition-colors py-1 ${
                  location === link.href ? 'text-primary' : 'text-gray-300'
                }`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="font-mono text-xs mt-2 pt-2 border-t border-white/10">
              <span className="text-gray-400">LIVE HOLDERS: </span>
              <span className="text-primary font-bold">104,238</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
