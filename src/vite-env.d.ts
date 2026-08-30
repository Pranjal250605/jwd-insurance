/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the serverless functions; empty when the app serves its own. */
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
