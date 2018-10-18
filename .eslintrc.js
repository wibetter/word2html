module.exports = {
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'env': {
    'node': true
  },
  // https://eslint.org/docs/rules/ 使用 eslint 推荐规则
  'extends': 'eslint:recommended',
  'root': true,
  'rules': {
    "no-console": "off"
  }
};
