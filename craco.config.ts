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
      "import-graphql"
    ]
  },
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      webpackConfig.resolve.fallback = {"timers": false}
      return webpackConfig;
    }
  }
}
