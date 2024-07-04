/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/detective",
        destination: "/detective?page=1&per_page=5",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
