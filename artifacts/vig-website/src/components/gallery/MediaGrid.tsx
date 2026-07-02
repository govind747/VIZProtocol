import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Play, FileText, Image as ImageIcon } from 'lucide-react';
import { MediaPreviewModal } from './MediaPreviewModal';

type MediaType = 'IMAGE' | 'BANNER' | 'CLIP';

interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  date: string;
}

const MEDIA_DATA: MediaItem[] = [
  {
    id: 'IMG-001',
    type: 'IMAGE',
    url: 'https://picsum.photos/id/10/1200/800',
    thumbnail: 'https://picsum.photos/id/10/400/300',
    title: 'OFFICE OF SURVEILLANCE',
    description: 'Intercepted photo of the main processing hub for citizen monitoring.',
    date: '2024-05-12',
  },
  {
    id: 'BNR-001',
    type: 'BANNER',
    url: 'https://picsum.photos/id/20/1200/400',
    thumbnail: 'https://picsum.photos/id/20/600/300',
    title: 'NEW WORLD ORDER CAMPAIGN',
    description: 'Propaganda banner recovered from the Department of Information.',
    date: '2024-05-15',
  },
  {
    id: 'VID-001',
    type: 'CLIP',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/id/30/400/300',
    title: 'THE RESISTANCE AWAKENS',
    description: 'Low-quality footage from the underground tunnels beneath the capital.',
    date: '2024-05-18',
  },
  {
    id: 'IMG-002',
    type: 'IMAGE',
    url: 'https://picsum.photos/id/40/1200/800',
    thumbnail: 'https://picsum.photos/id/40/400/300',
    title: 'PROTOTYPE ENFORCER',
    description: 'Leaked schematics and field test image of the new robotic enforcers.',
    date: '2024-05-20',
  },
  {
    id: 'BNR-002',
    type: 'BANNER',
    url: 'https://picsum.photos/id/50/1200/400',
    thumbnail: 'https://picsum.photos/id/50/600/300',
    title: 'VIGILANTE MANIFESTO',
    description: 'Recruitment banner used by the underground movement.',
    date: '2024-05-22',
  },
  {
    id: 'VID-002',
    type: 'CLIP',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/id/60/400/300',
    title: 'SYSTEM OVERRIDE',
    description: 'Visual evidence of the successful hack on the central power grid.',
    date: '2024-05-25',
  },
  {
    id: 'IMG-003',
    type: 'IMAGE',
    url: 'https://picsum.photos/id/70/1200/800',
    thumbnail: 'https://picsum.photos/id/70/400/300',
    title: 'THE REDACTED CITY',
    description: 'An aerial view of the forbidden zone, hidden from official maps.',
    date: '2024-05-28',
  },
  {
    id: 'BNR-003',
    type: 'BANNER',
    url: 'https://picsum.photos/id/80/1200/400',
    thumbnail: 'https://picsum.photos/id/80/600/300',
    title: 'TRUTH OVER COMPLIANCE',
    description: 'Street art captured before it was removed by sanitation droids.',
    date: '2024-06-01',
  },
];

export function MediaGrid() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const filteredData = filter === 'ALL' 
    ? MEDIA_DATA 
    : MEDIA_DATA.filter(item => item.type === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <Tabs defaultValue="ALL" onValueChange={setFilter} className="w-full mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
          <TabsList className="bg-zinc-900 border border-white/10 p-1 rounded-none h-auto">
            <TabsTrigger value="ALL" className="rounded-none font-mono text-xs uppercase tracking-tighter px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black">ALL FILES</TabsTrigger>
            <TabsTrigger value="IMAGE" className="rounded-none font-mono text-xs uppercase tracking-tighter px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black">IMAGES</TabsTrigger>
            <TabsTrigger value="BANNER" className="rounded-none font-mono text-xs uppercase tracking-tighter px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black">BANNERS</TabsTrigger>
            <TabsTrigger value="CLIP" className="rounded-none font-mono text-xs uppercase tracking-tighter px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-black">CLIPS</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {MEDIA_DATA.length} RECORDS FOUND</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-primary/70 animate-pulse">ENCRYPTION ACTIVE</span>
          </div>
        </div>

        <TabsContent value={filter} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <MediaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <MediaPreviewModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        item={selectedItem ? {
          type: selectedItem.type,
          url: selectedItem.url,
          title: selectedItem.title,
          description: selectedItem.description,
          id: selectedItem.id
        } : null} 
      />
    </div>
  );
}

function MediaCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const isVideo = item.type === 'CLIP';
  
  return (
    <Card 
      className="group relative bg-zinc-900 border-white/10 rounded-none overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
      onClick={onClick}
    >
      {/* Classified Header */}
      <div className="p-2 border-b border-white/5 flex justify-between items-center bg-black/40">
        <span className="text-[10px] font-mono text-gray-500 uppercase">{item.id}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        </div>
      </div>

      {/* Media Content */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 opacity-20 pointer-events-none scanlines" />
        
        {/* Action Button/Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.5)]">
            {isVideo ? <Play className="w-6 h-6 fill-current" /> : <ImageIcon className="w-6 h-6" />}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[8px] font-mono text-primary uppercase">
            {item.type}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-black/60 relative">
        <h3 className="text-sm font-display text-white mb-1 group-hover:text-primary transition-colors uppercase truncate">
          {item.title}
        </h3>
        <p className="text-[10px] font-mono text-gray-500 uppercase">
          LOGGED: {item.date}
        </p>
        
        {/* VHS Cassette Detail for Videos */}
        {isVideo && (
          <div className="mt-3 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
            <div className="h-full w-1/3 bg-primary/40" />
            <div className="h-full w-1/6 bg-primary/60" />
            <div className="h-full w-1/4 bg-primary/20" />
          </div>
        )}
      </div>

      {/* Polaroid/File Style Border Effect */}
      <div className="absolute inset-0 border-8 border-transparent pointer-events-none group-hover:border-white/5 transition-all duration-300" />
    </Card>
  );
}
