/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'images.unsplash.com',
      'platform-lookaside.fbsbx.com',
    ], // 需要設定允許的網域
  },
  experimental: {
    appDir: true,
  },
}
