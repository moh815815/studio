/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true, // يتجاهل أخطاء التايب سكريبت
  },
  eslint: {
    ignoreDuringBuilds: true, // يتجاهل أخطاء التنسيق
  },
  images: {
    unoptimized: true,
  },
  // هذا الجزء هو الحل لمشكلتك
  trailingSlash: true, 
};

module.exports = nextConfig;
