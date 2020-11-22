module.exports = {
  stories: [
    '../src/**/**/*.stories.@(mdx|tsx)'
  ],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs',
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
