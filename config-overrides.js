const { override, fixBabelImports } = require('customize-cra');
const CompressionPlugin = require('compression-webpack-plugin');

// const TerserPlugin = require('terser-webpack-plugin');
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css',
//   }),
// );
module.exports = function override(config, env) {
  config.plugins = (config.plugins || []).concat([
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      cache: true,
      threshold: 8192,
    }),
  ]);
  // config.optimization = Object.assign(config.optimization, {
  //   minimizer: [
  //     new TerserPlugin({
  //       sourceMap: true,
  //       terserOptions: {
  //         compress: {
  //           drop_console: true,
  //           drop_debugger: true,
  //         },
  //       },
  //     }),
  //   ],
  // })
  return config;
};
