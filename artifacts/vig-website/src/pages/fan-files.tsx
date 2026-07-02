import React from 'react';
import { FanFilesHero } from '@/components/fan-files/FanFilesHero';
import { CensorshipIndex } from '@/components/fan-files/CensorshipIndex';
import { ClassifiedFiles } from '@/components/fan-files/ClassifiedFiles';
import { EasterEggs } from '@/components/fan-files/EasterEggs';
import { HolderCounter } from '@/components/vigilante/HolderCounter';

export function FanFiles() {
  return (
    <div className="flex flex-col">
      <FanFilesHero />
      <HolderCounter />
      <CensorshipIndex />
      <ClassifiedFiles />
      <EasterEggs />
    </div>
  );
}
