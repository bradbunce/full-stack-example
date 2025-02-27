/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Make environment variables available to the browser
  env: {
    REACT_APP_LD_CLIENTSIDE_ID: process.env.REACT_APP_LD_CLIENTSIDE_ID,
  },
  // Configure image domains if needed
  images: {
    domains: [],
  },
}

module.exports = nextConfig
