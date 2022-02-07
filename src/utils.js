import fs from 'fs';
import path from 'path';
import glob from 'glob';

// 提供特定于平台的路径段分隔符
const sep = path.sep;

const searchEntries = options => {
  const { entryPath, fileType, fileName, fileNamePrefix, isFuzzy } = options;

  let files = {};

  // 如果目录以 '/' 结尾，则去掉
  options.entryPath = entryPath.replace(/\/$/, '');

  /**
   * fileNamePrefix 表示输出文件的前缀
   * 如输出 'app/js/default/index.js', 则前缀为 'app/js/default/'
   */
  let pattern = '';

  if (fileType === 'less') {
    pattern = `${entryPath}/${fileName}*.less`;
  } else if (isFuzzy) {
    pattern = `${entryPath}/**/${fileName}.{js,jsx}`;
  } else {
    pattern = `${entryPath}/${fileName}.{js,jsx}`;
  }

  glob.sync(pattern).forEach(file => {
    const entryName = fileNamePrefix + file.replace(entryPath + '/', '').replace(file.substring(file.lastIndexOf('.')), '');
    files[entryName] = file;
  });

  return files;
}
