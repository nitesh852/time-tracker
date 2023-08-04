const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Provide polyfills for 'fs' and 'path' modules
      webpackConfig.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
      };

      return webpackConfig;
    },
  },
};
