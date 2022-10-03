const {CracoAliasPlugin} = require('react-app-alias')

const options = {} // default is empty for most cases

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        baseUrl: '.'
      }
    }
  ],
  babel: {
    plugins: [
      "graphql-tag",
      "import-graphql",
      "babel-plugin-macros"
    ]
  },
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      webpackConfig.resolve.fallback = {"timers": require.resolve('timers-browserify')}
      webpackConfig.resolve.fallback = {"assert": require.resolve('assert')}
      webpackConfig.resolve.fallback = {"buffer": require.resolve('buffer')}
      webpackConfig.resolve.fallback = {"path": require.resolve('path-browserify')}
      webpackConfig.resolve.fallback = {"os": require.resolve('os-browserify')}
      return webpackConfig;
    }
  }
}
