import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.slack-edge.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "alex.polan.sk",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ], 
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
