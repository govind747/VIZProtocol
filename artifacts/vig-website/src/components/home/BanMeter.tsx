import React from 'react';
import { motion } from 'framer-motion';

export function BanMeter() {
  return (
    <section className="py-20 border-b border-white/10 relative overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold text-white mb-2 uppercase">Censorship Index</h2>
          <p className="text-gray-400 font-mono">Real-time tracking of institutional resistance.</p>
        </div>
        
        <div className="space-y-8 p-8 border border-white/10 bg-[#0a0a0a] relative">
          <div className="absolute top-0 right-0 p-2 bg-destructive text-white text-xs font-bold font-mono">LIVE</div>
          
          <Meter label="Germany" percentage={96} color="bg-yellow-500" />
          <Meter label="Twitter" percentage={67} color="bg-orange-500" />
          <Meter label="Mainstream Media" percentage={100} color="bg-destructive" />
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="flex justify-between items-end mb-2 font-mono uppercase">
              <span className="text-primary font-bold text-lg">People Buying Anyway</span>
              <span className="text-primary animate-pulse text-2xl">∞</span>
            </div>
            <div className="h-4 bg-white/5 border border-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                animate={{ width: ['98%', '100%', '97%', '100%'] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
              ></motion.div>
              <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meter({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2 font-mono uppercase text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-bold">{percentage}%</span>
      </div>
      <div className="h-4 bg-white/5 border border-white/20 relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`absolute top-0 left-0 h-full ${color}`}
        ></motion.div>
        {/* Hash marks */}
        <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,rgba(255,255,255,0.2)_49px,rgba(255,255,255,0.2)_50px)]"></div>
      </div>
    </div>
  );
}
