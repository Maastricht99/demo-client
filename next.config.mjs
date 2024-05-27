/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "fossil.scene7.com",
            "media.wired.com",
            "encrypted-tbn0.gstatic.com",
            "www.titan.co.in",
            "images.unsplash.com",
            "media.rolex.com",
            "www.audemarspiguet.com"
        ]
    },
    env: { 
        httpHost: process.env.HTTP_HOST,
        wsHost: process.env.WS_HOST
    }
};

export default nextConfig;
