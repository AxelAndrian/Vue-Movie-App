module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["simple-import-sort"],
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "quotes": [2, "single"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
