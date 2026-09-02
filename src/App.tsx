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
import Ihg from '@/components/Ihg';
import Promo from '@/components/Promo';
import Products from '@/components/Products';
import Money from '@/components/Money';
import Explore from '@/components/Explore';
import ClosingCTA from '@/components/ClosingCTA';
import Contact from '@/components/Contact';
import { NO_BACKEND } from '@/lib/runtime';
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
  //
  // Only '#/'-prefixed hashes are routes. In-page anchors (#contact, #chairman
  // …) must not register here at all: they used to set route state and run the
  // scroll-to-top below, so every one of them threw the reader back to the top
  // of the page instead of moving to the section they asked for.
  const readRoute = () => {
    if (typeof window === 'undefined') return '';
    const h = window.location.hash;
    return h.startsWith('#/') ? h : '';
  };
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const onHash = () => {
      const next = readRoute();
      setRoute((prev) => {
        // Top-of-page only when the page itself changed.
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
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
          <Ihg />
          <Promo />
          <Products />
          <Money />
          <Explore />
          <ClosingCTA />
          <Contact />
        </>
      )}
      <Footer />
      <AnimationsInit key={`anim-${route}`} />
      <Interactions key={`int-${route}`} />
      {/* Needs a server to hold the API key; a chat that cannot answer
          is worse than none, so static builds omit it. */}
      {!NO_BACKEND && <Advisor />}
      {!BARE && <TweaksPanel tweaks={tweaks} setTweak={setTweak} />}
    </div>
  );
}
