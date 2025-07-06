import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
        {
          protocol: "https",
          hostname: "mock-cover-image-url.com",
          port: "",
      },
      {
        protocol: "https",
        hostname: "mock-icon-url.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mock-screenshot-url.com",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
