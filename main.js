const word2html = require('./convert');
const path = require('path');

module.exports = function (wordPath, option, distDir, template) { // option:{ htmlTitle,distDir,template}
  let configs = {
    local: path.resolve(process.cwd(), 'word'),
    dist: path.resolve(process.cwd(), 'dist'),
    template: path.resolve(__dirname, 'template', 'common.html'),
    title: 'word2html生成的静态页面'
  };
  if (wordPath) {
    configs.local = wordPath;
  }
  if (option && option['title']) { // 考虑otion是一个配置对象
    configs.title = option['title'];
    if (option['dist']) {
      configs.dist = option['dist'];
    }
    if (option['template']) {
      configs.template = option['template'];
    }
  } else if (option) { // 考虑otion是只是一个String参数：htmlTitle【兼容早期版本的使用方法】
    configs.title = option;
    if (distDir) {
      configs.dist = distDir;
    }
    if (template) {
      configs.template = template;
    }
  }
  word2html(configs);
};
