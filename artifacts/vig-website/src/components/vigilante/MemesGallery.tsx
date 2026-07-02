import React, { useState } from 'react';

export function MemesGallery() {
  const memes = [
    { id: 1, text: "WHEN THEY REJECT YOUR AD SO YOU BUY THE TOKEN INSTEAD", color: "bg-blue-900" },
    { id: 2, text: "GOVERNMENT TRYING TO STOP $VIG (IT'S NOT WORKING)", color: "bg-red-900" },
    { id: 3, text: "ME EXPLAINING $VIG TO MY THERAPIST", color: "bg-green-900" },
    { id: 4, text: "THE ALGORITHM CAN'T SAVE THEM NOW", color: "bg-purple-900" },
    { id: 5, text: "LOOK AT ME. I AM THE MEDIA NOW.", color: "bg-orange-900" },
    { id: 6, text: "CENSORED. REDACTED. PUMPING.", color: "bg-gray-800" }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest text-center">EVIDENCE LOCKER</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemeCard({ meme }: { meme: any }) {
  const [glitching, setGlitching] = useState(false);

  return (
    <div 
      className="bg-white p-4 pb-12 shadow-xl transform transition-transform duration-300 cursor-pointer"
      style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}
    >
      <div className={`aspect-square w-full flex items-center justify-center p-6 text-center ${meme.color} ${glitching ? 'glitch-effect' : ''}`} data-text={meme.text}>
        <span className="font-display font-bold text-white text-xl uppercase leading-tight shadow-black drop-shadow-md">
          {meme.text}
        </span>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center font-mono text-black font-bold text-sm">
        FILE_{meme.id}.JPG
      </div>
    </div>
  );
}
