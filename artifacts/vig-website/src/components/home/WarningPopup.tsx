import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function WarningPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('vig_warning_seen');
    if (!hasSeenWarning) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('vig_warning_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0a0a0a] border border-destructive max-w-lg w-full p-1 relative overflow-hidden shadow-[0_0_50px_rgba(255,49,49,0.2)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive animate-pulse"></div>
            
            <div className="border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-destructive/20 border border-destructive flex items-center justify-center text-destructive font-bold text-2xl font-display">
                  !
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-white tracking-widest">WARNING</h2>
                  <p className="text-destructive font-mono text-xs uppercase">Classified Material Detected</p>
                </div>
              </div>
              
              <div className="space-y-4 font-mono text-gray-300 mb-8 border-l-2 border-white/20 pl-4">
                <p>This website contains:</p>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  <li>Unauthorized Memes</li>
                  <li>Financial Degeneracy</li>
                  <li>Extreme Community Participation</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">Proceeding indicates you accept all risks associated with high-level clearance data.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleClose}
                  className="flex-1 bg-white text-black font-display font-bold py-3 uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  YES
                </button>
                <button 
                  onClick={handleClose}
                  className="flex-1 bg-destructive text-white font-display font-bold py-3 uppercase tracking-widest hover:bg-red-600 transition-colors border border-red-500"
                >
                  ABSOLUTELY
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
