import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { Timeline } from '@/components/about/Timeline';
import { RottenTomatoes } from '@/components/about/RottenTomatoes';
import { DeletedPosts } from '@/components/about/DeletedPosts';

export function About() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <Timeline />
      <RottenTomatoes />
      <DeletedPosts />
    </div>
  );
}
