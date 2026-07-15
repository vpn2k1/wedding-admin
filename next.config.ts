import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const parentRoot = path.resolve(process.cwd(), '..');
const localNextPackage = path.join(process.cwd(), 'node_modules/next/package.json');
const parentNextPackage = path.join(parentRoot, 'node_modules/next/package.json');

const nextConfig: NextConfig = {
  turbopack: {
    root: fs.existsSync(localNextPackage) || !fs.existsSync(parentNextPackage) ? process.cwd() : parentRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
