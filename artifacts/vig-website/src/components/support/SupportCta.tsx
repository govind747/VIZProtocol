import React from 'react';
import { Button } from '@/components/ui/button';
import { TypewriterText } from '../effects/TypewriterText';

export function SupportCta() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background static */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUoW9kfS/giphy.gif')]"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto border-2 border-primary/20 p-12 bg-zinc-900/50 backdrop-blur-sm relative">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
          
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 tracking-tighter italic">
            NEED REINFORCEMENTS?
          </h2>
          
          <div className="text-xl font-mono text-primary mb-10 h-16 md:h-8">
            <TypewriterText text="SUBMIT A CLASSIFIED CASE FILE FOR REVIEW." delay={50} />
          </div>
          
          <p className="text-muted-foreground mb-12 text-sm leading-relaxed max-w-xl mx-auto">
            If you or someone in your network has been targeted by the system, we are here to help. 
            All submissions are encrypted and reviewed by our field operatives within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-black font-display font-bold uppercase tracking-widest px-10 py-6 rounded-none hover:bg-white transition-colors text-lg">
              START CASE FILE
            </Button>
            <Button variant="outline" className="border-white/20 text-white font-display font-bold uppercase tracking-widest px-10 py-6 rounded-none hover:bg-white/10 transition-colors text-lg">
              VIEW GUIDELINES
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            Encrypted connection established: 256-bit AES
          </div>
        </div>
      </div>
    </section>
  );
}
