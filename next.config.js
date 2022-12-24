const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  optimizeFonts: true,
  images: {
    domains: [
      "img.youtube.com",
      "avatars.githubusercontent.com",
      "github.com",
      "avatars0.githubusercontent.com",
      "avatars1.githubusercontent.com",
      "avatars2.githubusercontent.com",
      "avatars3.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
});
