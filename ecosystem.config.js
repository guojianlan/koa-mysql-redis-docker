module.exports = {
  apps: [{
    name: "app",
    script: "./server/bin/start.js",
    max_restarts: 10,
    watch: process.env.NODE_ENV == 'development' ? ['server'] : false,
    output: './log/pm2/out.log',
    error: './log/pm2/error.log',
    log: './log/pm2/combined.outerr.log',
    ignore_watch: ["node_modules"],
    env: {
      NODE_ENV: process.env.NODE_ENV,
    }
  }]
}