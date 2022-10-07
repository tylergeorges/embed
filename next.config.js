const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  sentry: {
    hideSourceMaps: false
  }
};

module.exports = withSentryConfig(nextConfig, { silent: true });
