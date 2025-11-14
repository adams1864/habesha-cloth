import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

type ExtendedNextConfig = NextConfig & {
  turbopack?: {
    root?: string;
  };
};

const nextConfig: ExtendedNextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
      {
        // Allow Cloudinary-hosted images (used by client-side unsigned uploads)
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
