// next.config.js
import withPWA from 'next-pwa';

const nextConfig = withPWA({
    dest: 'public',
    // other options
});

export default {
    ...nextConfig,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
            },
        ];
    },
};

// // next.config.ts
// import nextPWA from 'next-pwa';

// const withPWA = nextPWA({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//     // disable: process.env.NODE_ENV === 'development',
//     disable: false, // Enable PWA in development for testing
//     fallbacks: {
//         document: '/offline.html',
//         image: '',
//         audio: '',
//         video: '',
//         font: '',
//     },
// });

// const config = {
//     async rewrites() {
//         return [
//             {
//                 source: '/api/:path*',
//                 destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
//             },
//         ];
//     },
// };

// export default withPWA(config);
