/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  webpack: (config, { isServer, dev }) => {

    config.output.webassemblyModuleFilename =
    isServer && !dev
      ? '../static/media/[modulehash].wasm'
      : 'static/media/[modulehash].wasm'

    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    return config
  },
}

module.exports = nextConfig
