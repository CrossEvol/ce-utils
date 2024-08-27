import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
        build: {
                lib: {
                        entry: './lib/main.ts',
                        formats: ['es', 'cjs'],
                },
                rollupOptions: {
                        external: ['crypto', 'fs'], // 将Node.js内置模块标记为外部依赖
                },
                target: 'node20',
                sourcemap: true,
                minify: false,
        },
        resolve: {
                alias: {
                        '@': path.join(__dirname, 'src'),
                },
        },
        plugins: [
                dts({
                        include: ['lib/**/*.ts', 'src/**/*.ts'],
                        outDir: 'dist',
                        rollupTypes: true,
                }),
        ],
        esbuild: {
                platform: 'node',
                exclude: ['**/*.test.ts', '**/*.spec.ts'],
        },
})
