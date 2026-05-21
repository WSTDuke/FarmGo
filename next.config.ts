import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Tránh Next chọn nhầm /home/duke làm root khi có package-lock.json ở thư mục cha
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
