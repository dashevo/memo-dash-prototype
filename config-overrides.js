const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env)

  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer.forEach(item => {
      if (item.constructor.name === 'TerserPlugin') {
        item.options.terserOptions.mangle = false
      }
    })
  }

  return config
}
