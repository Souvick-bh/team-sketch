'use client';

import { GraphPaperBackground } from './_components/GraphPaperBackground';
import { Navbar } from './_components/NavBar';
import { Hero } from './_components/Hero';
import { Features } from './_components/Features';
import { Timeline } from './_components/Timeline';
import { Showcase } from './_components/Showcase';
import { CTA } from './_components/CTA';
import { Footer } from './_components/Footer';

import { TEXT,BG } from './_components/themes';


export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: BG, color: TEXT }}>
      <GraphPaperBackground opacity={0.35} />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Timeline />
        <Showcase />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
