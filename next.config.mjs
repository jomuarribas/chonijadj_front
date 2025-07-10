const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "e-cdns-images.dzcdn.net"],
    unoptimized: true,
  },
  webpack(config) {
    config.cache = {
      type: "memory",
    };
    return config;
  },
};

export default nextConfig;
