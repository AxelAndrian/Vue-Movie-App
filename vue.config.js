const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: '@import "@/assets/scss/main.scss";',
  //     },
  //   },
  // },
  devServer: {
    host: '0.0.0.0',
  },
};
