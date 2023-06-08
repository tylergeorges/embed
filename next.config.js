const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true
  }
  // sentry: {
  //   hideSourceMaps: false
  // }
  // compiler: {
  //   emotion: {
  //     sourceMap: true,
  //     autoLabel: 'always',
  //     labelFormat: '[local]'
  //   }
  // }
};
module.exports = nextConfig;
// module.exports = withSentryConfig(nextConfig, {
//   silent: true,
//   dryRun: process.env.NODE_ENV !== 'production'
// });
