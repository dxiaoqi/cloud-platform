const {override} = require("customize-cra");

module.exports = {
  webpack: override(config => {
    const oneOfLoaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    oneOfLoaders.unshift({
      test: /.md$/,
      use: [{
        loader: 'html-loader',
      }, {
        loader: 'markdown-loader',
        options: {}
      }]
    });
    return config;
  })
};