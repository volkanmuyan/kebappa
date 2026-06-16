import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Pin the workspace root to this project; a stray lockfile in $HOME otherwise
  // confuses Turbopack's automatic root detection.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'tb-static.uber.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
