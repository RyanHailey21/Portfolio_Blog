import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote'],
  reactCompiler: true,
  pageExtensions: ['ts','tsx']
};
export default nextConfig;
