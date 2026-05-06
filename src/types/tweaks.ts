export interface TweakValues {
  accentHue: number;
  accentChroma: number;
  altSurfaceTone: 'neutral' | 'warm' | 'cool' | 'mint';
  heroEyebrow: string;
  heroHeadline: string;
}

export type SetTweak = <K extends keyof TweakValues>(key: K, value: TweakValues[K]) => void;
