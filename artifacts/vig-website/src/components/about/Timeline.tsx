import React from 'react';

export function Timeline() {
  const events = [
    { 
      date: "01/01/2025", 
      title: "OPERATIONAL INCEPTION // REVENGE MATRIX", 
      desc: "Director Uwe Boll announces a brutal revenge thriller in the tradition of 'Death Wish' and 'Dirty Harry', starring Armie Hammer. Inspired by a notorious 2016 Hamburg case where perpetrators walked free, the film targets the systemic failure of legacy law enforcement." 
    },
    { 
      date: "27/01/2025", 
      title: "PRINCIPAL PHOTOGRAPHY // THE SYSTEM INTERFERES", 
      desc: "Filming officially commences under the radar in Zagreb, Croatia. Midway through production, corporate Hollywood titan Warner Bros. fires an emergency legal payload, sending a cease-and-desist letter forcing Boll to abandon the film's original title: 'The Dark Knight'." 
    },
    { 
      date: "03/04/2025", 
      title: "WRAP RECORDED // THE UNVEILING", 
      desc: "Shooting schedule officially terminates. Defying corporate pressure, the project adapts, rebranding under a far more volatile title: CITIZEN VIGILANTE. Post-production processing begins under tight containment protocols." 
    },
    { 
      date: "19/06/2026", 
      title: "THE CONTINENTAL LEAK", 
      desc: "Quiver Distribution secures North American rights and deploys the transmission across the United States. Concurrently, the German state apparatus denies age certification for 'promoting vigilantism,' effectively banning the film from wide commercial distribution and public advertisement." 
    },
    { 
      date: "25/06/2026", 
      title: "THE INTERNET EXPLODES // CULTURAL AMPLIFICATION", 
      desc: "The Streisand Effect triggers globally. High-profile figures including Elon Musk, Alex Jones, and Libs of TikTok intercept and broadcast the film to the masses. Mainstream critics try to ignore it, but the decentralized internet sentiment is fully weaponized." 
    },
    { 
      date: "02/07/2026", 
      title: "VIG PROTOCOL PROTOX // SYSTEM OVERRIDE", 
      desc: "In direct response to state censorship and media containment matrices, the $VIG cultural protocol is initiated on-chain. Financial embodiment of the movement established. Rejected by legacy institutions, listed everywhere on the network." 
    }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest border-b border-white/10 pb-4">
          INCIDENT LOG
        </h2>
        
        <div className="relative border-l-2 border-primary/50 ml-4 md:ml-8 space-y-12">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              <div className="absolute w-4 h-4 bg-black border-2 border-primary rounded-full -left-[9px] top-1 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(0,255,102,0.5)]"></div>
              
              <div className="bg-[#111] border border-white/10 p-6 group-hover:border-primary/50 transition-colors">
                <div className="text-primary font-mono text-sm mb-2">{event.date}</div>
                <h3 className="text-xl font-display font-bold text-white uppercase mb-2">{event.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">{event.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono uppercase">
                  LOG ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
