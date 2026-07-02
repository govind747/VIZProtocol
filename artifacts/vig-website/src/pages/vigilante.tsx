import React from 'react';
import { VigilanteHero } from '@/components/vigilante/VigilanteHero';
import { Tokenomics } from '@/components/vigilante/Tokenomics';
import { Roadmap } from '@/components/vigilante/Roadmap';
import { MemesGallery } from '@/components/vigilante/MemesGallery';
import { HolderCounter } from '@/components/vigilante/HolderCounter';
import { FaqAccordion } from '@/components/vigilante/FaqAccordion';
import { CommunityLinks } from '@/components/vigilante/CommunityLinks';

export function Vigilante() {
  return (
    <div className="flex flex-col">
      <VigilanteHero />
      <HolderCounter />
      <Tokenomics />
      <Roadmap />
      <MemesGallery />
      <FaqAccordion />
      <CommunityLinks />
    </div>
  );
}
