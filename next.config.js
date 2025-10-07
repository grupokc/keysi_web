/** @type {import('next').NextConfig} */

const { SYSTEMS_CONFIG } = require('./app/config/systems.js');

const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pegasus.grupokc.com.mx',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.grupokc.com.mx',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'r2.kc-itservices.net',
        port: '',
      },
    ],
  },
  // Configuración de proxy para n8n (solo en desarrollo)
  async rewrites() {
    return [
      {
        source: '/api/n8n/:path*',
        destination: 'http://n8n.kcapis.net:5678/:path*',
      },
    ];
  },
  // Configuración de variables de entorno públicas
  env: {
    // Para desarrollo local, usar la variable de entorno si existe
    NEXT_PUBLIC_SYSTEM_TYPE: process.env.NEXT_PUBLIC_SYSTEM_TYPE || 'titan',
    // Configuración del sistema actual
    NEXT_PUBLIC_SYSTEM_NAME:
      process.env.NEXT_PUBLIC_SYSTEM_TYPE === 'ss'
        ? SYSTEMS_CONFIG.ss.name
        : SYSTEMS_CONFIG.titan.name,
    NEXT_PUBLIC_SYSTEM_LOGO:
      process.env.NEXT_PUBLIC_SYSTEM_TYPE === 'ss'
        ? SYSTEMS_CONFIG.ss.logo
        : SYSTEMS_CONFIG.titan.logo,
    NEXT_PUBLIC_SYSTEM_FAVICON:
      process.env.NEXT_PUBLIC_SYSTEM_TYPE === 'ss'
        ? SYSTEMS_CONFIG.ss.favicon
        : SYSTEMS_CONFIG.titan.favicon,
    NEXT_PUBLIC_SYSTEM_SIDEBAR_LOGO:
      process.env.NEXT_PUBLIC_SYSTEM_TYPE === 'ss'
        ? SYSTEMS_CONFIG.ss.sidebarLogo
        : SYSTEMS_CONFIG.titan.sidebarLogo,
  },
};

module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'ensamble',
  project: 'keysi-web',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
