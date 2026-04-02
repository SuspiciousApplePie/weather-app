import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["**/*.config.{js,mjs,cjs}", "**/webpack.*.{js,mjs,cjs}"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    rules: {
      eqeqeq: ["error", "smart"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
  eslintConfigPrettier,
]);
