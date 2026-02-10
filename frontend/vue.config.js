const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Keeps your linting preference
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Velasquez Funeral & Chapel', // This fixes the "frontend" name issue
    },
  }
});