module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0, // 是否要分号结尾
    'quotes': 0, // 引号
    'space-before-function-paren': 0, // 函数（）前面是否必须要空格
    'no-multiple-empty-lines': [1, { 'max': 2 }], // 空行最多不能超过2行
    'no-tabs': 0,
    'no-multi-spaces': 2,
    'no-mixed-spaces-and-tabs': 0,
    'no-irregular-whitespace': 2,
    'indent': [2, 2],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    'vue/require-default-prop': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
