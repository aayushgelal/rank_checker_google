
const nextConfig = {
    // next.config.js


  webpack: (config, { isServer }) => {
    // Extend the default Webpack configuration
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader'
    });

    // Other customizations can go here

    return config;
},


};

export default nextConfig;
