import prettier from "eslint-plugin-prettier";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          classFields: true,
        },
        requireConfigFile: false,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "function", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
      ],
    },
  },
];
