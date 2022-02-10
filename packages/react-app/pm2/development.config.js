module.exports = {
  apps: [
    {
      name: 'web-app',
      script: 'yarn react-scripts start',
      args: [],
      watch: false,
      //instances: 'max',
      //exec_mode: 'cluster',
      time: true
    }
  ]
}
