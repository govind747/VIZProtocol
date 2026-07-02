import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';

export function Terminal() {
  const [history, setHistory] = useState<{ id: number; text: string | React.ReactNode; isCommand?: boolean }[]>([
    { id: 0, text: 'Citizen Vigilante (VIG) Terminal v1.0.0' },
    { id: 1, text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside history window when new commands execute
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep terminal focused on page mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { id: Date.now(), text: `root@VIG:~$ ${input}`, isCommand: true }];
    
    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <div className="mt-2 mb-4 space-y-1 text-gray-200">
            <div className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-4 mt-2 font-mono text-sm">
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">help</span> - list commands</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">buy</span> - acquire $VIG</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">holders</span> - agent count</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">tokenomics</span> - supply data</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">roadmap</span> - mission status</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">classified</span> - secret dossier</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">status</span> - system check</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">join</span> - comms links</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">clear</span> - clear terminal</div>
              <div><span className="text-primary font-black drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">exit</span> - return to UI</div>
            </div>
          </div>
        );
        break;
      case 'buy':
        response = (
          <div className="mt-2 text-primary font-bold animate-pulse drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]">
            ACCESS GRANTED: Redirecting to secure decentralized exchange...<br/>
            [Link established: DEXScreener / Uniswap]
          </div>
        );
        break;
      case 'holders':
        response = 'CURRENT AGENTS: 104,238 and growing... (Data from secure blockchain scan)';
        break;
      case 'tokenomics':
        response = (
          <div className="mt-2 mb-4 space-y-1">
            <div className="text-red-500 font-black drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">[REDACTED] TOKENOMICS DOSSIER</div>
            <div>SUPPLY    : ██████████ (1B)</div>
            <div>LIQUIDITY : BURNED</div>
            <div>TAXES     : 0%</div>
            <div>OWNERSHIP : RENOUNCED</div>
          </div>
        );
        break;
      case 'roadmap':
        response = 'PHASE 1: Leak [COMPLETE]\nPHASE 2: Mobilize [COMPLETE]\nPHASE 3: Infiltrate [IN PROGRESS]\nPHASE 4: Dominate [LOCKED]';
        break;
      case 'classified':
        response = <div className="text-red-500 font-black mt-2 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">ACCESS DENIED. CLEARANCE LEVEL INSUFFICIENT. YOUR IP HAS BEEN LOGGED.</div>;
        break;
      case 'status':
        response = 'All systems nominal. Mainstream media containment failing. Price impact: Immense.';
        break;
      case 'join':
        response = 'SECURE COMMS: TELEGRAM | X | DISCORD';
        break;
      case 'memes':
        response = 'Initiating meme payload download... ERROR: Too much alpha detected.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        window.location.href = '/';
        return;
      default:
        response = `bash: ${input}: command not found`;
    }

    setHistory([...newHistory, { id: Date.now() + 1, text: response }]);
    setInput('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex flex-col font-mono text-primary p-4 md:p-8 overflow-hidden crt-overlay cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Visual background atmospheric effects */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/10 crt-flicker pointer-events-none"></div>
      
      {/* Top Header Panel */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-primary/20 mb-4 relative z-10 shrink-0">
        <span className="text-xs tracking-widest font-black uppercase text-primary drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]">
          // SECURE MAINFRAME INTERFACE
        </span>
        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase border border-white/20 hover:border-white px-2 py-1 bg-white/5">
          [ EXIT TERMINAL ]
        </Link>
      </div>

      {/* History Window Layer + Scroll Side Slider */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-scroll pr-2 mb-4 relative z-10 custom-scrollbar scroll-smooth"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="whitespace-pre-wrap leading-relaxed font-bold text-sm md:text-base space-y-2">
          {history.map((item) => (
            <div key={item.id} className={`${item.isCommand ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]' : 'text-primary'}`}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      
      {/* Pinned Typing Message Box Footer */}
      <div className="relative z-10 shrink-0 mt-auto pt-4 border-t-2 border-primary/20 bg-black">
        <form 
          onSubmit={handleCommand} 
          className="flex items-center gap-3 bg-primary/5 border-2 border-primary/30 p-3 rounded shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(var(--primary-rgb),0.25)] transition-all duration-200"
        >
          <span className="text-white font-black tracking-wide shrink-0 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            root@VIG:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-primary font-black tracking-wide caret-primary text-sm md:text-base"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}