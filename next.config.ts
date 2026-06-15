import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.digisportcar.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
