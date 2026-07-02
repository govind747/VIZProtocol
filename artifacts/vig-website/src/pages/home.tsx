import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BanMeter } from '@/components/home/BanMeter';
import { LeakedDocuments } from '@/components/home/LeakedDocuments';
import { CtaSection } from '@/components/home/CtaSection';
import { WarningPopup } from '@/components/home/WarningPopup';

export function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BanMeter />
      <LeakedDocuments />
      <CtaSection />
      <WarningPopup />
    </div>
  );
}
