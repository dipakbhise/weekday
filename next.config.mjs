/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: true, // if user click on particular job post and then come back it will go on that particular job post
      },
    
        reactStrictMode: false, // if 'true' it renders every component two times
};

export default nextConfig;
