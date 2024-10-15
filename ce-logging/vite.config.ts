import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
        build: {
                lib: {
                        entry: resolve(__dirname, 'src/main.ts'),
                        formats: ['es', 'cjs'], // Output in both ES and CJS formats
                },
                rollupOptions: {
                        external: ['crypto', 'fs'], // Exclude Node.js built-in modules
                        output: [
                                {
                                        format: 'es',
                                        entryFileNames: 'ce-logging.mjs', // Filename for ES modules
                                        chunkFileNames: '[name].mjs',
                                        manualChunks(id) {
                                                if (
                                                        id.includes(
                                                                'node_modules'
                                                        )
                                                ) {
                                                        return 'vendor'
                                                }
                                                if (id.includes('src/utils')) {
                                                        return 'utils/utils'
                                                }
                                                if (id.includes('src/sample')) {
                                                        return 'sample/sample'
                                                }
                                                if (
                                                        id.includes(
                                                                'src/logging'
                                                        )
                                                ) {
                                                        return 'logging/logging'
                                                }
                                        },
                                },
                                {
                                        format: 'cjs',
                                        entryFileNames: 'ce-logging.cjs', // Filename for CommonJS modules
                                        chunkFileNames: '[name].cjs',
                                        manualChunks(id) {
                                                if (
                                                        id.includes(
                                                                'node_modules'
                                                        )
                                                ) {
                                                        return 'vendor'
                                                }
                                                if (id.includes('src/utils')) {
                                                        return 'utils/utils'
                                                }
                                                if (id.includes('src/sample')) {
                                                        return 'sample/sample'
                                                }
                                                if (
                                                        id.includes(
                                                                'src/logging'
                                                        )
                                                ) {
                                                        return 'logging/logging'
                                                }
                                        },
                                },
                        ],
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
                        exclude: ['**/*.test.ts', '**/*.spec.ts'],
                }),
        ],
        esbuild: {
                platform: 'node',
                exclude: ['**/*.test.ts', '**/*.spec.ts'],
        },
})
