
const nextConfig = {
    // next.config.js
    experimental: {
        serverComponentsExternalPackages: [
          "puppeteer-core",
          "@sparticuz/chromium-min",
        ],
      },


};

export default nextConfig;
