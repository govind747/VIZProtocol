import React from 'react';
import { Badge } from '@/components/ui/badge';

export function FanWall() {
  const activities = [
    { type: 'DONATION', user: 'X_Vigilante_99', amount: '2.5 SOL', target: 'Case #014', time: '2m ago', badge: 'First Responder' },
    { type: 'SHARE', user: 'CryptoGhost', amount: null, target: 'Case #017', time: '15m ago', badge: 'Community Hero' },
    { type: 'DONATION', user: 'Null_Node', amount: '15,000 $VIG', target: 'Case #015', time: '42m ago', badge: 'Elite Vigilante' },
    { type: 'DONATION', user: 'Anon_77', amount: '0.1 ETH', target: 'Case #014', time: '1h ago', badge: 'Guardian' },
    { type: 'SHARE', user: 'VIG_Army_Major', amount: null, target: 'Case #016', time: '3h ago', badge: 'Community Hero' },
    { type: 'DONATION', user: 'Sector7', amount: '100 USDC', target: 'Case #015', time: '5h ago', badge: 'First Responder' },
  ];

  return (
    <section className="py-16 bg-zinc-950/50 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/10"></div>
          <h2 className="text-3xl font-display font-black tracking-tight shrink-0">RECENT HEROES</h2>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 flex gap-4 items-start relative group hover:border-primary/30 transition-colors">
              <div className={`w-10 h-10 shrink-0 border border-white/10 flex items-center justify-center font-bold text-xs ${activity.type === 'DONATION' ? 'text-primary' : 'text-blue-400'}`}>
                {activity.type === 'DONATION' ? '$' : 'S'}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold font-mono group-hover:text-primary transition-colors">{activity.user}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{activity.time}</span>
                </div>
                
                <p className="text-xs text-muted-foreground font-mono">
                  {activity.type === 'DONATION' ? (
                    <>CONTRIBUTED <span className="text-white font-bold">{activity.amount}</span> TO {activity.target}</>
                  ) : (
                    <>DECENTRALIZED CASE DATA FOR {activity.target}</>
                  )}
                </p>
                
                <div className="pt-2">
                  <Badge variant="outline" className="rounded-none border-white/10 text-[9px] px-1 h-5 text-muted-foreground uppercase tracking-tighter">
                    {activity.badge}
                  </Badge>
                </div>
              </div>

              {/* Decorative scanline effect on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-zinc-900 border border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              TOTAL HEROES: 12,482
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              LIFETIME AID: $2.4M
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
