import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // static export
  images: {
    unoptimized: true, // GH pages doesn't support next/image optimization
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
}

export default nextConfig;
