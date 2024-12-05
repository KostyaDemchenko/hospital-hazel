module.exports = {
  webpack: (config) => {
    config.resolve.alias["@"] = __dirname;
    return config;
  },
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  },
};
