import React, { useState } from 'react';

export function LeakedDocuments() {
  return (
    <section className="py-20 border-b border-white/10 bg-[#070707] relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-1 flex-1 bg-white/10"></div>
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-widest">Classified Docs</h2>
          <div className="h-1 flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DocumentCard 
            title="TOKEN SUPPLY" 
            fileId="VIG-TS-01"
            redactedText="1,000,000,000"
            visibleText="TOTAL ISSUED:"
            stamp="CONFIDENTIAL"
          />
          <DocumentCard 
            title="LIQUIDITY" 
            fileId="VIG-LQ-02"
            redactedText="BURNED & LOCKED"
            visibleText="STATUS:"
            stamp="CLASSIFIED"
            delay={0.1}
          />
          <DocumentCard 
            title="COMMUNITY" 
            fileId="VIG-CM-03"
            redactedText="UNSTOPPABLE"
            visibleText="THREAT LEVEL:"
            stamp="TOP SECRET"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

function DocumentCard({ title, fileId, redactedText, visibleText, stamp, delay = 0 }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-[#F3F3F3] p-1 shadow-lg relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border border-black p-6 h-full relative overflow-hidden flex flex-col">
        {/* Folder tab look */}
        <div className="absolute top-0 right-0 border-l border-b border-black px-3 py-1 bg-black text-white text-[10px] font-mono">
          {fileId}
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6 mt-4">
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase">Department of</div>
            <div className="font-display font-bold text-black text-xl uppercase tracking-widest">PROJECT VIG</div>
          </div>
          <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center">
            <span className="font-display font-bold text-black">V</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 text-black font-mono text-sm leading-relaxed">
          <div>
            <span className="font-bold">{title} DETAILS:</span><br/>
            The following data pertains to the operational parameters of the subject asset.
          </div>
          
          <div className="bg-gray-100 p-4 border-l-4 border-black">
            <span className="font-bold">{visibleText}</span>{' '}
            <span className={`transition-all duration-300 ${isHovered ? 'bg-transparent text-destructive font-bold' : 'bg-black text-black'}`}>
              {isHovered ? redactedText : '████████████'}
            </span>
          </div>

          <div className="text-xs text-gray-600">
            WARNING: Unauthorized disclosure of this information may result in extreme market volatility.
          </div>
        </div>

        {/* Stamp */}
        <div className="absolute bottom-4 right-4 border-4 border-destructive text-destructive font-display font-bold text-2xl p-2 transform -rotate-12 opacity-80 pointer-events-none select-none">
          {stamp}
        </div>
        
        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
      </div>
    </div>
  );
}
