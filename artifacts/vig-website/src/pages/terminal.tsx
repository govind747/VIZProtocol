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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { id: Date.now(), text: `root@VIG:~$ ${input}`, isCommand: true }];
    
    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = (
          <div className="mt-2 mb-4 space-y-1 text-gray-300">
            <div>AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-2 gap-4 ml-4 mt-2">
              <div><span className="text-primary font-bold">help</span> - list commands</div>
              <div><span className="text-primary font-bold">buy</span> - acquire $VIG</div>
              <div><span className="text-primary font-bold">holders</span> - agent count</div>
              <div><span className="text-primary font-bold">tokenomics</span> - supply data</div>
              <div><span className="text-primary font-bold">roadmap</span> - mission status</div>
              <div><span className="text-primary font-bold">classified</span> - secret dossier</div>
              <div><span className="text-primary font-bold">status</span> - system check</div>
              <div><span className="text-primary font-bold">join</span> - comms links</div>
              <div><span className="text-primary font-bold">clear</span> - clear terminal</div>
              <div><span className="text-primary font-bold">exit</span> - return to UI</div>
            </div>
          </div>
        );
        break;
      case 'buy':
        response = (
          <div className="mt-2 text-primary animate-pulse">
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
            <div className="text-destructive font-bold">[REDACTED] TOKENOMICS DOSSIER</div>
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
        response = <div className="text-destructive font-bold mt-2">ACCESS DENIED. CLEARANCE LEVEL INSUFFICIENT. YOUR IP HAS BEEN LOGGED.</div>;
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
    <div className="fixed inset-0 z-50 bg-black flex flex-col font-mono text-primary p-4 md:p-8 overflow-hidden crt-overlay">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/10 crt-flicker pointer-events-none"></div>
      
      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar relative z-10">
        <div className="whitespace-pre-wrap leading-relaxed">
          {history.map((item) => (
            <div key={item.id} className={`${item.isCommand ? 'text-white' : 'text-primary'}`}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      
      <form onSubmit={handleCommand} className="flex items-center gap-2 relative z-10" onClick={() => inputRef.current?.focus()}>
        <span className="text-white shrink-0">root@VIG:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-primary caret-primary"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      {/* Top right escape button */}
      <Link href="/" className="absolute top-4 right-8 text-xs text-gray-500 hover:text-white uppercase z-20">
        [ EXIT TERMINAL ]
      </Link>
    </div>
  );
}
