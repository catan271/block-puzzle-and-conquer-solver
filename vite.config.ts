import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const base = '/block-puzzle-and-conquer-solver';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                icons: [
                    { src: `${base}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
                    { src: `${base}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
                ],
            },
        }),
    ],
    base,
});
