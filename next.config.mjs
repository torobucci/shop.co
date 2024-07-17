/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false, // Use true if you want a permanent redirect (301), false for a temporary redirect (302)
      },
      {
        source: '/home/categories',
        destination: '/home/categories/Men',
        permanent: false, // Use true if you want a permanent redirect (301), false for a temporary redirect (302)
      },
    ];
  },
};

export default nextConfig;
