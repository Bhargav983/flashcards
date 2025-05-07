import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // remotePatterns are no longer needed if all images are local
    // If you still need to load images from external domains, you can add patterns here.
  },
};

export default nextConfig;
