module.exports = {
  apps: [
    {
      name: 'davidcosta.com.br',
      script: 'server.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
