import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: process.env.CODESANDBOX_SSE || process.env.GITPOD_WORKSPACE_ID || process.env.PORT || 443
  },
});