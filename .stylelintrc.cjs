// .stylelintrc.cjs

module.exports = {
  root: true,
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss", "stylelint-config-html/vue"],
  plugins: ["stylelint-prettier"],
  overrides: [
    { files: ["**/*.{vue,html}"], customSyntax: "postcss-html" },
    { files: ["**/*.{css,scss}"], customSyntax: "postcss-scss" },
  ],
  rules: {
    "prettier/prettier": true,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global", "export", "v-deep", "deep"] }],
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
    "selector-type-no-unknown": [true, { ignoreTypes: ["page"] }],
    "comment-empty-line-before": "never",
    "custom-property-empty-line-before": "never",
    "no-empty-source": null,
    "comment-no-empty": null,
    "scss/comment-no-empty": null,
    "no-duplicate-selectors": null,
    "selector-class-pattern": null,
    "no-descending-specificity": null,
  },
}
