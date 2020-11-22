module.exports = {
  stories: [
    '../src/**/**/*.stories.@(mdx|tsx)'
  ],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null
      },
    }
  ]
}
