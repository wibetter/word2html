const word2html = require('./convert');
const path = require('path');

module.exports = function (wordPath) {
  const configs = {
      local: path.resolve(process.cwd(), 'word'),
  };
  if (wordPath) {
    configs.local = wordPath;
    // pc 斜杆处理
    configs.local = configs.local.replace(/\\/g, '/');
  }
  word2html(configs);
};
