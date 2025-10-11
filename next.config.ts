import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

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
  basePath: isProd ? '/pzachcom-frontend' : '',
  assetPrefix: isProd ? '/pzachcom-frontend/' : '',
  trailingSlash: true,
};

export default nextConfig;
