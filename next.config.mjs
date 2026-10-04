/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: false },
      { source: '/curriculum.html', destination: '/core/', permanent: false },
      { source: '/tracks.html', destination: '/tracks/', permanent: false },
      { source: '/method.html', destination: '/method/', permanent: false },
      { source: '/mentors.html', destination: '/mentors/', permanent: false },
      { source: '/progress.html', destination: '/progress/', permanent: false },
    ];
  },
};

export default nextConfig;
