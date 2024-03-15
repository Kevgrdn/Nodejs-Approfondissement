module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      instances: 3,
      max_memory_restart: "200M",
      error_file: "logs/err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
