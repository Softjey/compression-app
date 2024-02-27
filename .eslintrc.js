module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true,
    es6: true
  },
  rules: {
    'no-proto': 0,
  },
  plugins: ['jest'],
};
