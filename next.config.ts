import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
    [
      {
        hostname: 'pzachcomfn.azurewebsites.net'
      },
      {
        hostname: 'pzach.blob.core.windows.net'
      }
    ]
  },
};

export default nextConfig;
