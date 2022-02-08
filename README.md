# es-webpack-engine

基于 webpack 的多入口构建方案。

``` js
module.exports = {
  output: {
    // 用于生产环境下的输出目录
    path: 'web/static-dist/',
    // 用于开发环境下的输出目录
    publicPath: '/static-dist/'
  },
	
  // 共用的依赖
  libs: {
    'base': ['libs/base.js'], // 基础类库
    'fix-ie': ['console-polyfill', 'respond-js'] // 也可以是一个 npm 依赖包
  },

  // 不解析依赖，加快编译速度
  noParseDeps: {
    'jquery': 'jquery/dist/jquery.js'
  },

  //纯拷贝文件到输出的libs目录下
  onlyCopys: [
    {
      name: 'es-ckeditor',
      ignore: [
        '**/samples/**',
        '**/kityformula/libs/**'
      ]
    }
  ],
  extryCssName: '{main,header,bootstrap,mobile,admin}',
  isESlint: false,
  baseName: 'libs/base,libs/ltc-sdk',
  activitiesDir: 'web/activities'
};
```