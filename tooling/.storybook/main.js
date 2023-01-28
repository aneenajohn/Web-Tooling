module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  // DOCS: To add Custom webpack and babel: pass the default config
  webpackFinal: async (config) => {
    // NOTE: add the custom config here
    return config
  },
  babel: async (options) => {
    // NOTE: add the custom config here
    return {
      ...options,
    }
  }
}