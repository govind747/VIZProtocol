import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Campaign } from './CampaignCard';
import { toast } from '@/hooks/use-toast';

interface CampaignModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignModal({ campaign, isOpen, onClose }: CampaignModalProps) {
  const [activeTab, setActiveTab] = useState('report');
  
  if (!campaign) return null;

  const cryptoOptions = [
    { name: 'SOL', address: 'VIG...SolanaAddress' },
    { name: 'ETH', address: '0xVIG...EthereumAddress' },
    { name: 'BTC', address: '1VIG...BitcoinAddress' },
    { name: 'USDC', address: '0xVIG...USDCAddress' },
    { name: 'USDT', address: '0xVIG...USDTAddress' },
    { name: '$VIG', address: 'VIG...TokenAddress' },
  ];

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard for donation.",
    });
  };

  const redact = (text: string) => {
    return text.split(' ').map((word, i) => 
      i % 7 === 0 ? <span key={i} className="bg-foreground text-foreground px-1 mx-0.5 select-none">{word}</span> : word + ' '
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-white/20 rounded-none p-0 font-mono text-foreground">
        {/* Classified Header */}
        <div className="bg-destructive text-white p-4 sticky top-0 z-50 flex justify-between items-center border-b border-white/20">
          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tighter">CLASSIFIED REPORT</span>
            <span className="text-[10px] uppercase opacity-75">Intelligence Agency / Department of Vigilance</span>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="font-bold">CASE FILE: {campaign.caseNumber}</span>
            <span className="text-[10px] uppercase opacity-75">Strictly Confidential</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar / Metadata */}
            <div className="md:col-span-1 space-y-6">
              <div className="border border-white/10 p-4 bg-zinc-900/50">
                <h4 className="text-[10px] text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2">Subject Profile</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Subject Name</div>
                    <div className="text-sm font-bold uppercase">{campaign.title}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Location</div>
                    <div className="text-sm font-bold uppercase">
                      <span className="bg-foreground text-foreground px-2 mr-1">REDACTED</span> 
                      {campaign.location.split(',')[1] || campaign.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Threat Level</div>
                    <div className={`text-sm font-bold uppercase ${campaign.status === 'URGENT' ? 'text-destructive' : 'text-primary'}`}>
                      {campaign.status === 'URGENT' ? 'CRITICAL' : 'ELEVATED'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 p-4 bg-zinc-900/50">
                <h4 className="text-[10px] text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2">Support Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  {cryptoOptions.map((opt) => (
                    <Button 
                      key={opt.name}
                      onClick={() => handleCopy(opt.address)}
                      variant="outline" 
                      className="rounded-none border-white/10 text-[10px] h-10 hover:bg-primary hover:text-black"
                    >
                      {opt.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-4 bg-zinc-900/50">
                <h4 className="text-[10px] text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2">Intelligence Sharing</h4>
                <div className="flex flex-wrap gap-2">
                  {['X', 'TG', 'RD', 'FB', 'IG'].map((site) => (
                    <button key={site} className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] hover:border-primary transition-colors">
                      {site}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <Tabs defaultValue="report" className="w-full">
                <TabsList className="w-full justify-start rounded-none bg-zinc-900 border-b border-white/10 p-0 h-10">
                  <TabsTrigger value="report" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-black text-[10px] h-full px-6">REPORT</TabsTrigger>
                  <TabsTrigger value="evidence" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-black text-[10px] h-full px-6">EVIDENCE</TabsTrigger>
                  <TabsTrigger value="community" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-black text-[10px] h-full px-6">COMMS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="report" className="pt-6 space-y-4">
                  <div className="bg-white/5 p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <div className="text-4xl font-display font-black -rotate-12 border-4 border-current px-2">INTERNAL</div>
                    </div>
                    <h3 className="text-lg font-display mb-4">INCIDENT SUMMARY</h3>
                    <div className="text-sm leading-relaxed text-gray-300 space-y-4">
                      <p>{campaign.description}</p>
                      <p>{redact("The individual was first identified during the surveillance of the central district. Authorities have attempted to suppress their activities, but community support remains high. Tactical analysis suggests that immediate intervention is required to maintain the stability of the local network.")}</p>
                      <p>{redact("Further investigation into the financial records shows a deficit that cannot be filled by conventional means. Operation Hope has authorized the release of this dossier to the public network for immediate crowdfunding.")}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="evidence" className="pt-6 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-zinc-900 border border-white/10 relative flex items-center justify-center overflow-hidden group">
                      <img 
                        src={`https://picsum.photos/seed/vig-${campaign.id}-${i}/400/225`} 
                        alt="Evidence" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-2 left-2 bg-black/80 px-1 text-[8px]">EVIDENCE_FILE_00{i}.JPG</div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="community" className="pt-6 space-y-4">
                  <div className="space-y-4">
                    {[
                      { user: "GhostProtocol", msg: "Transferred 500 $VIG. Stay safe out there.", badge: "Elite Vigilante" },
                      { user: "NullSector", msg: "The truth cannot be hidden. Support sent.", badge: "First Responder" },
                      { user: "CyberNomad", msg: "Sharing this to the darknet nodes now.", badge: "Guardian" }
                    ].map((comment, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-primary text-[10px] font-bold">{comment.user}</span>
                          <span className="text-muted-foreground text-[8px] border border-white/20 px-1">{comment.badge}</span>
                        </div>
                        <p className="text-xs text-gray-300 italic">"{comment.msg}"</p>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-white/10">
                      <Input placeholder="TRANSMIT MESSAGE..." className="rounded-none border-white/10 bg-transparent text-xs mb-2" />
                      <Button className="w-full rounded-none text-[10px] bg-primary text-black hover:bg-primary/80">TRANSMIT</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-zinc-900 border-t border-white/10 flex justify-between items-center text-[10px] text-muted-foreground uppercase">
          <span>End of Report</span>
          <Button onClick={onClose} variant="ghost" className="h-auto p-0 text-[10px] hover:text-white uppercase">Close Dossier</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
