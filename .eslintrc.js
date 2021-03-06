module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["test/**"],
  plugins: ["prettier", "jest"],
  rules: {
    "prettier/prettier": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
};
