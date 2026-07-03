import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '../effects/GlitchText';
import { TypewriterText } from '../effects/TypewriterText';
import { Link } from 'wouter';

export function HeroSection() {
  const [showWarning, setShowWarning] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/10 p-4">
      {/* Background folders */}
      <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute border border-white p-4 font-mono text-xs"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
            }}
          >
            TOP_SECRET_VIG_{i}.pdf
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-red-600/20 backdrop-blur-sm"
          >
            <div className="bg-destructive text-white p-8 border-4 border-white font-display text-4xl font-bold uppercase tracking-widest text-center animate-pulse">
              ! UNAUTHORIZED ACCESS DETECTED !
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block border border-primary/50 text-primary px-4 py-1 font-mono text-sm mb-4 animate-pulse bg-primary/10">
          ACCESS LEVEL: TOP SECRET // DOSSIER 404
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-white mb-2 leading-none">
          <GlitchText text="PROJECT VIG" />
        </h1>
        
        <div className="bg-destructive text-white text-xl md:text-3xl font-bold font-mono py-2 px-6 inline-block uppercase tracking-widest border-2 border-red-500 shadow-[0_0_20px_rgba(255,49,49,0.5)] transform -rotate-2">
          REJECTED BY EVERYONE.<br/>LISTED EVERYWHERE.
        </div>
        
        <div className="max-w-2xl mx-auto text-gray-400 font-mono mt-8 border-l-4 border-primary pl-4 text-left">
          <TypewriterText 
            text="> Status: Active. Target: Mainstream Media. Objective: Complete narrative takeover. The people are buying anyway." 
            delay={1000} 
            speed={30}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <button className="group relative px-8 py-4 bg-destructive text-white font-display font-bold uppercase tracking-widest text-xl overflow-hidden border border-red-400">
            <span className="relative z-10">BUY VIG</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <Link href="/vigilante" className="group relative px-8 py-4 bg-transparent text-white font-display font-bold uppercase tracking-widest text-xl overflow-hidden border border-white/30 hover:border-white transition-colors">
            <span className="relative z-10">READ DOSSIER</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
