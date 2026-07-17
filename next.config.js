/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de build
  reactStrictMode: true,
  
  // Configurações de imagens
  images: {
    domains: [],
  },
  
  // Configurações de redirecionamento
  async redirects() {
    return [];
  },
  
  // Configurações de headers
  async headers() {
    return [];
  },
  
  // Configurações de webpack
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
