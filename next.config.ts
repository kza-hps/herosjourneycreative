import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/your-heros-journey-creative-writing-sprints-group-workshop-booking",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/collections/:path*",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/checkout/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/account/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
      {
        source: "/policies/:path*",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
