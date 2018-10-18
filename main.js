const word2html = require('./convert');
const path = require('path');

module.exports = function (wordPath, htmlTitle, distDir) {
  let configs = {
    local: path.resolve(process.cwd(), 'word'),
    title: 'word2html生成的静态页面',
    dist: path.resolve(process.cwd(), 'html')
  };
  if (wordPath) {
    configs.local = wordPath;
    // pc 斜杆处理
    configs.local = configs.local.replace(/\\/g, '/');
  }
  if (htmlTitle) {
    configs.title = htmlTitle;
  }
  if (distDir) {
    configs.dist = distDir;
  }
  word2html(configs);
};
