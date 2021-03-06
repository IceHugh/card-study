const { override, fixBabelImports } = require('customize-cra');
const CompressionPlugin = require('compression-webpack-plugin');
const rewireHotLoader = require('react-app-rewire-hot-loader');
// const TerserPlugin = require('terser-webpack-plugin');
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css',
//   }),
// );
module.exports = function(config, env) {
  // config = rewireHotLoader(config, env);
  config.plugins = (config.plugins || []).concat([
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      cache: true,
      threshold: 8192,
    }),
  ]);
  const test = fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  });
  const _config = test(config);
  _config.resolve.alias = {
    ..._config.resolve.alias,
    // 'react-dom': '@hot-loader/react-dom',
  };
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
  return _config;
};
