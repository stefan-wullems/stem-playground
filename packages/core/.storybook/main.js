module.exports = {
  stories: [
    '../src/**/*.story.(mdx|tsx)'
  ],
  presets: [
    '@storybook/preset-create-react-app',
  ],
  addons: [
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
