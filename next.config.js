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
        destination: "/detective/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
