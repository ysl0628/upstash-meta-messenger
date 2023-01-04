/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com'], // 需要設定允許的網域
  },
  experimental: {
    appDir: true,
  },
}
