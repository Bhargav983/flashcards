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
    remotePatterns: [
      // picsum.photos is no longer needed as all images are local or will be replaced by local assets.
    ],
  },
};

export default nextConfig;
