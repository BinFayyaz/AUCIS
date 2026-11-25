import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The preview proxy serves this dev server over https, so HMR and host checks
// only need adjusting when Base44 explicitly runs it in preview mode.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const publicHostSuffix = process.env.BASE44_PUBLIC_HOST_SUFFIX
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

const allowedHosts = []
if (previewMode) {
  if (sandboxHostDomain) allowedHosts.push(`.${sandboxHostDomain}`)
  if (publicHostSuffix) allowedHosts.push(`3000-${publicHostSuffix}`)
}
allowedHosts.push('localhost', '127.0.0.1')

export default defineConfig({
  // Expose VITE_* and IDLE_* env vars to client code, so Vercel's IDLE_TIMEOUT
  // (in seconds) is available as import.meta.env.IDLE_TIMEOUT.
  envPrefix: ['VITE_', 'IDLE_'],
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts,
    hmr: previewMode ? { protocol: 'wss', clientPort: 443 } : undefined,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
      },
    },
  },
})
