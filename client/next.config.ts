import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	productionBrowserSourceMaps: true,
	devIndicators: false,
	output: 'standalone',
};

export default nextConfig;
