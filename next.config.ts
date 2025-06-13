import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    // disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: "/app",
    // sw: "service-worker.js",
    //...
});

// Your Next config is automatically typed!
export default withPWA({
    // Your Next.js config
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
            },
        ];
    },
});

// // next.config.ts
// import withPWA from 'next-pwa';
// import type { NextConfig } from 'next';

// const isDev = process.env.NODE_ENV === 'development';

// const baseConfig: NextConfig = {
//     reactStrictMode: true,
//     experimental: {
//         serverActions: {},
//     },
//     async rewrites() {
//         return [
//             {
//                 source: '/api/:path*',
//                 destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
//             },
//         ];
//     },
// };

// // ❗ Important: ensure this returns a plain object, not an array
// const nextConfig = withPWA({
//     ...baseConfig,
//     pwa: {
//         dest: 'public',
//         disable: isDev,
//         register: true,
//         skipWaiting: true,
//     },
// });

// export default nextConfig;
