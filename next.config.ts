import type { NextConfig } from "next";

const repoPath = '/cangjie-practice';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  basePath: repoPath,
  assetPrefix: repoPath,
};

export default nextConfig;
