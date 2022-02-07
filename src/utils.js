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

// 判断文件或文件夹是否存在
const fsExistsSync = path => {
  try {
    // fs.F_OK 文件对调用进程可见
    fs.accessSync(path, fs.F_OK);
  } catch (error) {
    return false;
  }
  return true;
}

const searchDirs = (searchDir, isExistDir) => {
  let dirsArr = [];

  if (!fsExistsSync(searchDir)) {
    return [];
  }

  let dirs = fs.readdirSync(searchDir);

  dirs = dirs.filter(dir => {
    return dir !== '.DS_Store' && dir !== '.gitkeep' && fsExistsSync(`${searchDir}/${dir}/${isExistDir}`);
  });

  dirsArr = dirs.map(dir => {
    return `${searchDir}/${dir}`;
  });

  return dirsArr;
}

// 需要忽略的目录
const searchIgnoreDirs = (searchDirs, watchDirs) => {
  let dirsArr = [];

  if (!fsExistsSync(searchDirs)) {
    return [];
  }

  const dirs = fs.readFileSync(searchDirs);

  dirs = dirs.filter(dir => {
    return dir !== '.DS_Store' && dir !== '.gitkeep' && watchDirs.indexOf(dir) === -1;
  });

  dirsArr = dirs.map(dir => {
    return `${searchDir}/${dir}`;
  });

  return dirsArr;
}

const isArray = arr => {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

const isEmptyObject = obj => {
  for (const key in obj) {
    return false;
  }
  return true;
}

const firstUpperCase = str => {
  return str.toLowerCase();
}
