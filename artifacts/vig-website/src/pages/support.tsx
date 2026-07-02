import React, { useState } from 'react';
import { SupportHero } from '@/components/support/SupportHero';
import { CampaignCard, Campaign } from '@/components/support/CampaignCard';
import { CampaignModal } from '@/components/support/CampaignModal';
import { FanWall } from '@/components/support/FanWall';
import { SupportCta } from '@/components/support/SupportCta';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    caseNumber: '014',
    title: 'THE DOWNTOWN RESISTANCE',
    location: 'NEW YORK, NY',
    type: 'MEDICAL',
    status: 'URGENT',
    raised: 12500,
    goal: 15000,
    description: 'Field operatives in the downtown sector require immediate medical supplies after the recent crackdown. Several civilians have been injured during the forced relocation attempts by the central authorities.',
    isVerified: true
  },
  {
    id: '2',
    caseNumber: '015',
    title: 'SECTOR 7 DEFENSE FUND',
    location: 'CHICAGO, IL',
    type: 'LEGAL',
    status: 'ACTIVE',
    raised: 8400,
    goal: 25000,
    description: 'Providing legal representation for the "Chicago Three" who were detained for public broadcast of censored data. These individuals represent the voice of the movement in the Midwest.',
    isVerified: true
  },
  {
    id: '3',
    caseNumber: '016',
    title: 'PROJECT: UNDERGROUND COMMMS',
    location: 'AUSTIN, TX',
    type: 'EQUIPMENT',
    status: 'ACTIVE',
    raised: 4200,
    goal: 10000,
    description: 'Deployment of mesh network routers to ensure communication remains stable in the event of a local internet blackout. Austin has been designated as a high-risk zone for connectivity suppression.',
    isVerified: false
  },
  {
    id: '4',
    caseNumber: '017',
    title: 'THE REFUGEE SANCTUARY',
    location: 'SEATTLE, WA',
    type: 'HOUSING',
    status: 'CLOSED',
    raised: 50000,
    goal: 50000,
    description: 'Establishing a safe house for displaced families whose homes were seized by the corporation. This facility will provide shelter, food, and security for up to 20 families.',
    isVerified: true
  }
];

export function Support() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <SupportHero />
      
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-black tracking-tight">ACTIVE CASE FILES</h2>
              <p className="text-muted-foreground font-mono text-sm max-w-xl">
                INTEL REPORT: CURRENT OPERATIONS REQUIRING IMMEDIATE FINANCIAL REINFORCEMENTS.
              </p>
            </div>
            
            <div className="flex gap-2">
              {['ALL', 'URGENT', 'MEDICAL', 'HOUSING', 'LEGAL'].map((filter) => (
                <button 
                  key={filter}
                  className={`px-3 py-1 text-[10px] font-mono border ${filter === 'ALL' ? 'bg-primary text-black border-primary' : 'bg-transparent text-muted-foreground border-white/10'} hover:border-primary transition-colors uppercase`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_CAMPAIGNS.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onOpen={handleOpenCampaign} 
              />
            ))}
          </div>
        </div>
      </section>

      <FanWall />
      
      <SupportCta />

      <CampaignModal 
        campaign={selectedCampaign} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
