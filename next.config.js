module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(java|cpp|cs|class|txt)$/i,
      use: 'raw-loader',
    });

    return config
  },
}
