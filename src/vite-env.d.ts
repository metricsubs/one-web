/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ONE_LEANCLOUD_API_ENDPOINT: string;
  readonly ONE_LEANCLOUD_APP_ID: string;
  readonly ONE_LEANCLOUD_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
