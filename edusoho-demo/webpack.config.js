module.exports = {
  output: {
    path: 'web/static-dist/', // 用于生产环境下的输出目录
    publicPath: '/static-dist/', // 用于开发环境下的输出目录
  },
  libs: {
    'base': ['libs/base.js'], // 基础类库
  },
  noParseDeps: { // 不解析依赖，加快编译速度
    'jquery': 'jquery/dist/jquery.js',
    'codeages-design': 'codeages-design/dist/codeages-design.js'
  },
  onlyCopys: [ //纯拷贝文件到输出的libs目录下
    {
      name: 'codeages-design',
      ignore: [
        'node_modules/**',
        'src/**',
      ]
    },
  ],
  extryCssName: '{main,header,bootstrap,mobile,admin}',
  baseName: 'libs/base,libs/ltc-sdk',
  activitiesDir: 'web/activities',
};
