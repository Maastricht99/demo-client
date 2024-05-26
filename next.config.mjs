/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "fossil.scene7.com",
            "media.wired.com",
            "encrypted-tbn0.gstatic.com",
            "encrypted-tbn0.gstatic.com"
        ]
    },
    env: { 
        httpHost: process.env.HTTP_HOST,
        wsHost: process.env.WS_HOST
    }
};

export default nextConfig;
