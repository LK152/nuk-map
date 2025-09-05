import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  output: 'standalone',

  env: {
    NEXT_PUBLIC_SERVER_BASE: 'http://localhost:8888',
    NEXT_PUBLIC_MAPTILER_KEY: 'agFTmodzd3hE3L2oo0rn',
  },
};

export default nextConfig;