import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import path from 'path';

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            headers: {
                'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                'Cross-Origin-Embedder-Policy': 'require-corp',
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    });
