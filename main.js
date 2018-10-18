const word2html = require('./convert');
const path = require('path');

module.exports = function (wordPath, htmlTitle) {
  let configs = {
    local: path.resolve(process.cwd(), 'word'),
    title: 'word2html生成的静态页面'
  };
  if (wordPath) {
    configs.local = wordPath;
    // pc 斜杆处理
    configs.local = configs.local.replace(/\\/g, '/');
  }
  if (htmlTitle) {
    configs.title = htmlTitle;
  }
  word2html(configs);
};
