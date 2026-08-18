import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import PhotoStrip from '@/components/PhotoStrip';
import { VideoGallery } from '@/components/VideoTiles';
import Message from '@/components/Message';
import Markets from '@/components/Markets';
import RealEstate from '@/components/RealEstate';
import PropertiesPage from '@/components/PropertiesPage';
import ConsentGate from '@/components/ConsentGate';
import HowToInvest from '@/components/HowToInvest';
import Promo from '@/components/Promo';
import Products from '@/components/Products';
import Money from '@/components/Money';
import Explore from '@/components/Explore';
import ClosingCTA from '@/components/ClosingCTA';
import Footer from '@/components/Footer';
import AnimationsInit from '@/components/AnimationsInit';
import Interactions from '@/components/Interactions';
import Advisor from '@/components/Advisor';
import TweaksPanel from '@/components/TweaksPanel';
import type { TweakValues, SetTweak } from '@/types/tweaks';

const DEFAULTS: TweakValues = {
  variant: 'equiti',
  accentHue: 250,
  accentChroma: 0.08,
  altSurfaceTone: 'cool',
  heroEyebrow: 'FIRST CALL PARTNER · EST. 2020',
  heroHeadline: 'A golden bridge to greater prosperity',
};

// Allow tooling (puppeteer, deep links) to set the variant via ?theme=equiti
// and hide the floating tweaks cog via ?bare=1.
const URL_PARAMS = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const URL_THEME = URL_PARAMS?.get('theme');
const INITIAL: TweakValues = {
  ...DEFAULTS,
  variant: URL_THEME === 'equiti' || URL_THEME === 'heritage' ? URL_THEME : DEFAULTS.variant,
};
const BARE = URL_PARAMS?.get('bare') === '1';

export default function App() {
  const [tweaks, setTweaks] = useState<TweakValues>(INITIAL);

  const setTweak: SetTweak = (key, value) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  };

  // Apply the variant to <html> so the matching :root token set takes effect.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.variant);
  }, [tweaks.variant]);

  // Heritage variant lets the user fine-tune the accent via OKLCH sliders.
  // Equiti variant uses a hand-tuned, brand-correct palette — don't override it.
  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.variant !== 'heritage') {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-deep');
      root.style.removeProperty('--accent-soft');
      root.style.removeProperty('--surface-alt');
      return;
    }
    const { accentHue: h, accentChroma: c } = tweaks;
    root.style.setProperty('--accent', `oklch(0.32 ${c} ${h})`);
    root.style.setProperty('--accent-deep', `oklch(0.20 ${c} ${h})`);
    root.style.setProperty('--accent-soft', `oklch(0.94 ${Math.min(c, 0.04)} ${h})`);
    const altMap: Record<string, string> = {
      neutral: '#F5F5F4',
      warm: '#F8F6F1',
      cool: '#F4F6F9',
      mint: `oklch(0.96 0.015 ${h})`,
    };
    root.style.setProperty('--surface-alt', altMap[tweaks.altSurfaceTone] ?? '#F4F6F9');
  }, [tweaks.variant, tweaks.accentHue, tweaks.accentChroma, tweaks.altSurfaceTone]);

  // Lightweight hash routing: '#/properties' shows the client portfolio page,
  // '#/consent' the 08.18 information notice, '#/how-to-invest' what it gates.
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.hash : '');
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const isPortfolio = route.startsWith('#/properties');
  const isConsent = route.startsWith('#/consent');
  const isHowToInvest = route.startsWith('#/how-to-invest');

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      {isPortfolio ? (
        <PropertiesPage />
      ) : isConsent ? (
        <ConsentGate />
      ) : isHowToInvest ? (
        <HowToInvest />
      ) : (
        <>
          <Hero eyebrow={tweaks.heroEyebrow} headline={tweaks.heroHeadline} />
          <VideoGallery />
          <PhotoStrip />
          <Message />
          <Markets />
          <RealEstate />
          <Promo />
          <Products />
          <Money />
          <Explore />
          <ClosingCTA />
        </>
      )}
      <Footer />
      <AnimationsInit key={`anim-${route}`} />
      <Interactions key={`int-${route}`} />
      <Advisor />
      {!BARE && <TweaksPanel tweaks={tweaks} setTweak={setTweak} />}
    </div>
  );
}
