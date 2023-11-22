/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/**',
          },
          //add ip address of backend server
          {
            protocol: 'http',
            hostname: '165.227.132.4',
            port: '3000',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
