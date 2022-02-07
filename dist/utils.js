"use strict";var _fs=_interopRequireDefault(require("fs"));var _path=_interopRequireDefault(require("path"));var _glob=_interopRequireDefault(require("glob"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}// 提供特定于平台的路径段分隔符
var sep=_path["default"].sep;var searchEntries=function searchEntries(options){var entryPath=options.entryPath,fileType=options.fileType,fileName=options.fileName,fileNamePrefix=options.fileNamePrefix,isFuzzy=options.isFuzzy;var files={};// 如果目录以 '/' 结尾，则去掉
options.entryPath=entryPath.replace(/\/$/,'');/**
   * fileNamePrefix 表示输出文件的前缀
   * 如输出 'app/js/default/index.js', 则前缀为 'app/js/default/'
   */var pattern='';if(fileType==='less'){pattern="".concat(entryPath,"/").concat(fileName,"*.less");}else if(isFuzzy){pattern="".concat(entryPath,"/**/").concat(fileName,".{js,jsx}");}else{pattern="".concat(entryPath,"/").concat(fileName,".{js,jsx}");}_glob["default"].sync(pattern).forEach(function(file){var entryName=fileNamePrefix+file.replace(entryPath+'/','').replace(file.substring(file.lastIndexOf('.')),'');files[entryName]=file;});return files;};// 判断文件或文件夹是否存在
var fsExistsSync=function fsExistsSync(path){try{// fs.F_OK 文件对调用进程可见
_fs["default"].accessSync(path,_fs["default"].F_OK);}catch(error){return false;}return true;};