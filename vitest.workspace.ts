import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
        './ce-common-utils/vitest.config.ts',
        './ce-node-utils/vitest.config.ts',
        './examples/vitest.config.ts',
])
