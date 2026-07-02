import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ClassifiedFiles() {
  const files = [
    { id: "001", title: "THE INITIAL SPARK", date: "██/██/2026", content: "Early monitoring detected a highly viral anomalous asset spreading across decentralised networks. Attempts to suppress standard social channels resulted in a 400% amplification of spread." },
    { id: "002", title: "INSTITUTIONAL RESPONSE", date: "██/██/2026", content: "Directives were issued to all major tier-1 exchanges to block listing. The asset subsequently listed on 43 decentralized exchanges within 48 hours, rendering the embargo ineffective." },
    { id: "003", title: "MEMETIC CONTAGION", date: "██/██/2026", content: "The symbol '[VIG]' has been adopted by various disparate groups. It appears to function as a digital resistance marker. Containment probability: 0%." },
    { id: "004", title: "FINANCIAL IMPLICATIONS", date: "██/██/2026", content: "Retail capital flows have bypassed traditional gatekeepers. Total value locked exceeds projected risk models. Recommend immediate monitoring." }
  ];

  return (
    <section className="py-20 border-b border-white/10 bg-[#070707]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 uppercase tracking-widest">DECRYPTED LOGS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {files.map((file) => (
            <Dialog key={file.id}>
              <DialogTrigger asChild>
                <div className="bg-[#f3f3f3] border-2 border-black p-6 cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-black text-white font-mono text-[10px] px-2 py-1">
                    FILE {file.id}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center font-display font-bold text-black text-xl">
                      {file.id.charAt(2)}
                    </div>
                    <div>
                      <div className="text-black font-display font-bold text-lg uppercase tracking-wider">{file.title}</div>
                      <div className="text-gray-600 font-mono text-xs">{file.date}</div>
                    </div>
                  </div>
                  <div className="text-gray-500 font-mono text-sm uppercase">Click to decrypt payload...</div>
                  
                  <div className="absolute bottom-2 right-2 border-2 border-destructive text-destructive font-display font-bold text-sm p-1 transform -rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    CLASSIFIED
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#f3f3f3] border-4 border-black text-black p-0 rounded-none hide-close-button">
                <div className="p-8 relative">
                  {/* Document styling */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-black/20 pointer-events-none"></div>
                  
                  <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end relative z-10">
                    <div>
                      <div className="text-xs font-mono uppercase text-gray-500 mb-1">INTERNAL MEMO</div>
                      <DialogTitle className="text-2xl font-display font-black uppercase tracking-widest">{file.title}</DialogTitle>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div>DATE: {file.date}</div>
                      <div>REF: VIG-{file.id}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm leading-relaxed relative z-10">
                    <p>SUBJECT: Project VIG Monitoring Report</p>
                    <div className="bg-black/5 p-4 border-l-4 border-black mt-4">
                      {file.content}
                    </div>
                    
                    <p className="mt-6 text-xs text-gray-600 uppercase border-t border-black/20 pt-4">
                      END OF REPORT. THIS DOCUMENT MUST BE DESTROYED AFTER READING.
                    </p>
                  </div>
                  
                  {/* Giant stamp */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 border-4 border-destructive text-destructive font-display font-bold text-6xl p-4 opacity-30 pointer-events-none whitespace-nowrap">
                    TOP SECRET
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
