import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/#advisory",
        permanent: true,
      },
      {
        source: "/programs",
        destination: "/#advisory",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/#advisory",
        permanent: true,
      },
      {
        source: "/advisory",
        destination: "/#advisory",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/methodology",
        destination: "/#methodology",
        permanent: true,
      },
      {
        source: "/discovery",
        destination: "/#advisory",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
