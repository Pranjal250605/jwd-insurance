/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the serverless functions; empty when the app serves its own. */
  readonly VITE_API_BASE?: string;
  /** '1' on static builds that have no serverless functions behind them. */
  readonly VITE_NO_BACKEND?: string;
  /** Recipient for the consultation form when NO_BACKEND is set. */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
