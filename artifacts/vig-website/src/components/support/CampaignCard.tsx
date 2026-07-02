import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface Campaign {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  type: 'MEDICAL' | 'HOUSING' | 'LEGAL' | 'EQUIPMENT';
  status: 'URGENT' | 'ACTIVE' | 'CLOSED';
  raised: number;
  goal: number;
  description: string;
  image?: string;
  isVerified?: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  onOpen: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onOpen }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;
  
  const statusColors = {
    URGENT: 'bg-destructive text-destructive-foreground',
    ACTIVE: 'bg-primary text-primary-foreground',
    CLOSED: 'bg-zinc-700 text-zinc-300'
  };

  return (
    <div className="bg-card border border-border group hover:border-primary/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      {/* Classified Header */}
      <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          Case File #{campaign.caseNumber}
        </span>
        <Badge className={`${statusColors[campaign.status]} border-none rounded-none font-bold text-[10px]`}>
          {campaign.status}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors leading-tight">
            {campaign.title}
          </h3>
          {campaign.isVerified && (
            <div className="text-primary text-xs flex items-center gap-1 shrink-0 ml-2" title="Verified Dossier">
              <span className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">✓</span>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="opacity-50">LOC:</span>
            <span className="text-foreground">{campaign.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="opacity-50">TYPE:</span>
            <span className="text-foreground">{campaign.type}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {campaign.description}
        </p>

        {/* Funding Stats */}
        <div className="space-y-2 mt-auto">
          <div className="flex justify-between font-mono text-xs">
            <span>RAISED: ${campaign.raised.toLocaleString()}</span>
            <span className="text-muted-foreground">GOAL: ${campaign.goal.toLocaleString()}</span>
          </div>
          <div className="relative h-2 w-full bg-zinc-900 border border-white/10 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-right text-primary">
            {progress.toFixed(1)}% RECOVERED
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0">
        <Button 
          onClick={() => onOpen(campaign)}
          className="w-full rounded-none font-display uppercase text-xs tracking-widest border-2 border-primary/20 hover:border-primary transition-all bg-transparent hover:bg-primary hover:text-black"
        >
          Read Story
        </Button>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300 w-full h-full"></div>
      </div>
    </div>
  );
}
