import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

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
  // Tell GH pages where the assets are
  basePath: isProd ? '/pzachcom-frontend' : '',
  assetPrefix: isProd ? '/pzachcom-frontend/' : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/pzachcom-frontend' : '',
  },
}

export default nextConfig;
