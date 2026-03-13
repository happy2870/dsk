import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'components/index': 'src/components/index.ts',
    'components/ui/index': 'src/components/ui/index.ts',
    'components/icons/index': 'src/components/icons/index.ts',
    'components/layout/index': 'src/components/layout/index.ts',
    'components/error/index': 'src/components/error/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'providers/index': 'src/providers/index.ts',
    'stores/index': 'src/stores/index.ts',
    'types/index': 'src/types/index.ts',
    'utils/index': 'src/utils/index.ts',
    'constants/index': 'src/constants/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    'clsx',
    'framer-motion',
    'react-countup',
    'react-tooltip',
    'recharts',
    'simplebar-react',
    'tailwind-merge',
    'zustand',
  ],
  banner: {
    js: "'use client';",
  },
});
