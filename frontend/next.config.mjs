/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, 
      },
    ];
  },
};

export default nextConfig;
