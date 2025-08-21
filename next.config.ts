import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */

	publicRuntimeConfig: {
		DATABASE_URL: process.env.DATABASE_URL,
		DIRECT_URL: process.env.DIRECT_URL,
	},
}

export default nextConfig
