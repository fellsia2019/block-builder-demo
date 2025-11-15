/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLOCK_BUILDER_LICENSE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

