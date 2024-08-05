import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setup-test.ts'],
        env:  process.env
    },
})