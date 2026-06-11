import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["node_modules/**", "client/dist/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        process: "readonly",
        React: "readonly",
        URLSearchParams: "readonly",
        window: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    }
  }
];
