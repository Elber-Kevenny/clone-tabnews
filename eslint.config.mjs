import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
// import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "node_modules/*", // ignore its content
    ".next/*",
    "**/*.yaml",
    "**/*config*",
    "**/migrations/*",
  ]),
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, "@next/next": pluginNext, jest },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...jest.configs.recommended.rules,
      "jest/no-identical-title": "off",
    },
  },

  // pluginReact.configs.flat.recommended,
]);
