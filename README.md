# es-webpack-engine

基于 webpack 的多入口构建方案。

1、wwebpack 是如何查找 index.js 文件的。
通过调用 searchEntries 方法，传入 options 中的 entryFileName 字段。

2、webpack 总共对哪些目录进行了监听打包？
app/Resources/static-src
plugins
src
activities // edusoho 中暂无
web/themes

3、ES根目录下的 webpack.config.js 的 libs 配置的作用是什么？
在 resolve.alias 中配置了 libs，配置的 libs 可以更加方便的使用。

4、module 只打包传入的模块

5、watch 不参与监听打包