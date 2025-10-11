import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // static export for GH pages
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
  // Tell GH pages where the image assets are
  basePath: '/pzachcom-frontend',
  assetPrefix: '/pzachcom-frontend/',
};

export default nextConfig;
