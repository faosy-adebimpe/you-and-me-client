import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // experimental: { optimizeCss: false },

    async rewrites() {
        return [
            {
                source: '/api/:path*', // A more general rule for other API calls
                destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
