module.exports = async ({ config }) => {
  // Get rid of eslint loader
  config.module.rules = config.module.rules.filter(rule => rule.enforce !== 'pre')

  return config
}
