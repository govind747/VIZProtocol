import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    type: 'IMAGE' | 'BANNER' | 'CLIP';
    url: string;
    title: string;
    description: string;
    id: string;
  } | null;
}

export function MediaPreviewModal({ isOpen, onClose, item }: MediaPreviewModalProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl bg-black border-primary/30 p-0 overflow-hidden rounded-none">
        <div className="relative">
          {/* Header with Classified Label */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start pointer-events-none">
            <div className="bg-destructive text-white px-3 py-1 font-display text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(255,49,49,0.5)]">
              CLASSIFIED - EYES ONLY
            </div>
            <button 
              onClick={onClose}
              className="bg-black/50 hover:bg-black p-2 pointer-events-auto transition-colors border border-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px] flex items-center justify-center bg-zinc-900/50">
            {item.type === 'CLIP' ? (
              <div className="w-full aspect-video relative">
                <iframe
                  src={item.url.replace('watch?v=', 'embed/')}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="max-w-full max-h-[80vh] mx-auto block object-contain"
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                  <span className="text-8xl font-display border-8 border-primary text-primary -rotate-45 px-8 py-4 select-none">
                    LEAKED
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer/Info Area */}
          <div className="p-6 border-t border-white/10 bg-zinc-950">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-display text-white mb-1 uppercase tracking-wider">{item.title}</h2>
                <div className="flex items-center gap-3 font-mono text-xs text-gray-500">
                  <span>FILE ID: {item.id}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span>TYPE: {item.type}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span>CLEARANCE: LEVEL 4</span>
                </div>
              </div>
              <Badge variant="outline" className="border-primary/50 text-primary rounded-none font-mono">
                SECURED DATA
              </Badge>
            </div>
            <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-primary/30 pl-4 py-2 italic">
              {item.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
