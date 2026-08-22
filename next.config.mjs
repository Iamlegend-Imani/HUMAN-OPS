/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/HUMAN-OPS' : '',
  assetPrefix: isGitHubPages ? '/HUMAN-OPS/' : '',
};

export default nextConfig;
