import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
    [
      {
        hostname: 'pzachcomfn.azurewebsites.net'
      }
    ]
  },
};

export default nextConfig;
