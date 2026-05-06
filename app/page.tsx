'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Promo from '@/components/Promo';
import Products from '@/components/Products';
import Money from '@/components/Money';
import Explore from '@/components/Explore';
import ClosingCTA from '@/components/ClosingCTA';
import Footer from '@/components/Footer';
import AnimationsInit from '@/components/AnimationsInit';
import TweaksPanel from '@/components/TweaksPanel';
import type { TweakValues, SetTweak } from '@/types/tweaks';

const DEFAULTS: TweakValues = {
  accentHue: 180,
  accentChroma: 0.13,
  altSurfaceTone: 'neutral',
  heroEyebrow: 'AWARD-WINNING BROKER · EST. 2014',
  heroHeadline: 'Start trading online with leverage up to 1:2000',
};

export default function Home() {
  const [tweaks, setTweaks] = useState<TweakValues>(DEFAULTS);

  const setTweak: SetTweak = (key, value) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const root = document.documentElement;
    const { accentHue: h, accentChroma: c } = tweaks;
    root.style.setProperty('--accent', `oklch(0.78 ${c} ${h})`);
    root.style.setProperty('--accent-deep', `oklch(0.55 ${c} ${h})`);
    const altMap: Record<string, string> = {
      neutral: '#F8F9FA',
      warm: '#FAF8F5',
      cool: '#F5F8FA',
      mint: `oklch(0.97 0.02 ${h})`,
    };
    root.style.setProperty('--surface-alt', altMap[tweaks.altSurfaceTone] ?? '#F8F9FA');
  }, [tweaks.accentHue, tweaks.accentChroma, tweaks.altSurfaceTone]);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero eyebrow={tweaks.heroEyebrow} headline={tweaks.heroHeadline} />
      <Promo />
      <Products />
      <Money />
      <Explore />
      <ClosingCTA />
      <Footer />
      <AnimationsInit />
      <TweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}
