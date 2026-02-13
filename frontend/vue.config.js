const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  
  // 1. KEEP YOUR ORIGINAL PAGE SETTINGS (Fixes the "frontend" title issue)
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Velasquez Funeral & Chapel',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },

  // 2. ADD PRODUCTION OPTIMIZATIONS
  productionSourceMap: false,
  
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10
          }
        }
      }
    }
  },
  
  chainWebpack: config => {
    // 3. ADD IMAGE OPTIMIZATIONS
    config.module
      .rule('images')
      .set('parser', {
        dataUrlCondition: {
          maxSize: 10 * 1024 // 10KB
        }
      });

    // 4. ENSURE META TAGS ARE ACCESSIBLE
    config.plugin('html-index').tap(args => {
      args[0].title = 'Velasquez Funeral & Chapel';
      return args;
    });
  }
});