const path = require('path');

const {
  searchEntries,
  searchDirs,
  isPlugin,
  isBundle,
  isTheme,
  isActivity
} = require('../utils');

const options = require('./options');

// 设置别名
const configAlias = {
  libs: `${options.globalDir}/libs`,
  common: `${options.globalDir}/common`,
  app: `${options.globalDir}/app`,
  nodeModulesDir: options.nodeModulesDir, // 即将废弃
  node_modules: options.nodeModulesDir
};

/**
  * 输出格式
  * let commonEntry = {
  *   'crmplugin': {
  *     'crmplugin/js/index': '/plugins/CrmPlugin/Resources/static-src/js/index.js',
  *     'crmplugin/js/default/index': '/plugins/CrmPlugin/Resources/static-src/js/default/index.js',
  *     ...
  *   },
  *   'custombundle': {
  *     'custombundle/js/index': '/src/CustomBundle/Resources/static-src/js/index.js',
  *     'custombundle/js/default/index': '/src/CustomBundle/Resources/static-src/js/default/index.js',
  *     ...
  *   },
  *   'defaulttheme': {
  *     'defaulttheme/js/default/index': '/web/themes/default/static-src/js/default/index.js',
  *     ...
  *   },
  *   'defaultbtheme': {
  *     'defaultbtheme/js/default/index': '/web/themes/default-b/static-src/js/default/index.js',
  *     ...
  *   },
  * };
  */
let commonEntry = {};
let commonSrcEntry = {};
if (options.isBuildAllModule || options.buildModule.length) {
  let commonNames = [];

  if (options.buildModule.length) {
    commonNames = options.buildModule;
  } else {
    commonNames = commonNames.concat(
      searchDirs(options.pluginsDir, 'Resources/static-src'),
      searchDirs(options.bundlesDir, 'Resources/static-src'),
      searchDirs(options.themesDir, 'static-src'),
      searchDirs(options.activitiesDir, 'static-src')
    );
  }


  commonNames.forEach((item) => {
    let commonDir;
    let commonName;

    if (isPlugin(item) || isBundle(item)) {
      commonDir = `${item}/Resources/static-src`;
      commonName = item.split(path.sep).pop().toLowerCase();
    } else if (isTheme(item)) {
      commonDir = `${item}/static-src`;
      commonName = item.split(path.sep).pop().replace('-','').toLowerCase() + 'theme';
    } else if (isActivity(item)) {
      commonDir = `${item}/static-src`;
      commonName = item.split(path.sep).pop().replace('-','').toLowerCase() + 'activity';
    }

    commonEntry[commonName] = {};

    Object.assign(
      commonEntry[commonName],
      searchEntries({
        fileName: options.extryCssName,
        entryPath: `${commonDir}/less`,
        fileNamePrefix: `${commonName}/css/`,
        fileType: 'less'
      }),
      searchEntries({
        fileName: options.entryMainName,
        entryPath: `${commonDir}/js`,
        fileNamePrefix: `${commonName}/js/`
      }),
      searchEntries({
        fileName: options.entryFileName,
        entryPath: `${commonDir}/js`,
        fileNamePrefix: `${commonName}/js/`,
        isFuzzy: true
      }),
      searchEntries({
        fileName: options.entryFileName,
        entryPath: `${commonDir}/vue`,
        fileNamePrefix: `${commonName}/vue/`,
        isFuzzy: true
      })
    );

    configAlias[commonName] = commonDir;
    commonSrcEntry[commonName] = commonDir;
  })
}

let libEntry = {};
/**
 * let libEntry = {
 *   libs/base: ['libs/base.js']
 * };
 */
if (options.isBuildAllModule) {
  for (let key in options.libs) {
    libEntry[`libs/${key}`] = [];

    options.libs[key].forEach((le) => {
      libEntry[`libs/${key}`].push(le);
    });
  }
}

let appEntry = {};
if (options.isBuildAllModule) {
  const appDir = `${options.globalDir}/app`;
  appEntry['app'] = {};

  Object.assign(
    appEntry['app'],
    searchEntries({
      fileName: options.extryCssName,
      entryPath: `${appDir}/less`,
      fileNamePrefix: `app/css/`,
      fileType: 'less'
    }),
    searchEntries({
      fileName: options.entryMainName,
      entryPath: `${appDir}/js`,
      fileNamePrefix: `app/js/`
    }),
    searchEntries({
      fileName: options.entryFileName,
      entryPath: `${appDir}/js`,
      fileNamePrefix: `app/js/`,
      isFuzzy: true
    }),
    searchEntries({
      fileName: options.entryFileName,
      entryPath: `${appDir}/vue`,
      fileNamePrefix: `app/vue/`,
      isFuzzy: true
    }),
  );
}

let onlyCopys = [];
if (options.onlyCopys.length) {
  let copyitem = {};
  options.onlyCopys.forEach((item) => {
    copyitem = {
      from : `${options.nodeModulesDir}/${item.name}`,
      to: `libs/${item.name}`,
      force: true,
      globOptions: {
        ignore: item.ignore || []
      }
    }
    onlyCopys.push(copyitem);
  })
}

module.exports = {
  libEntry,
  appEntry,

  commonEntry,
  commonSrcEntry,

  onlyCopys,
  configAlias
}
