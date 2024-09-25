const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    // 添加对 TypeScript 文件的处理
    config.resolve.extensions
      .add('.ts')
      .add('.d.ts');

    // 使用 ts-loader 处理 .ts 和 .d.ts 文件
    config.module
      .rule('typescript')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();

    config.module
      .rule('typescript-declaration')
      .test(/\.d\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();
  }
});
