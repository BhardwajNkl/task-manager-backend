module.exports = {
    apps: [
      {
        name: "task-manager-app", // deployment name
        script: "dist/main.js", // app entry point
        autorestart: true, // restarts after crash. deafult true.
        max_restarts: 5, // Limit the app to 5 restart attempts
        instances: 1,
        exec_mode: "fork", // execution in fork mode

        // Default environment variables. Pass if any.
        env: {
        },
        // Environment variables for production. Pass if any.
        env_production: {
        },
  
        // Enable logging and specify log files
        // error_file: "./logs/app-err.log", // error logs
        // out_file: "./logs/app-out.log", // standard logs
        // log_date_format: "YYYY-MM-DD HH:mm:ss", // Format for timestamps in logs

        // Set memory and restart policies
        max_memory_restart: "500M", // Restart app if memory usage exceeds 500 MB
        restart_delay: 5000, // Delay between restarts (in ms)
  
        watch: false, // for development mode, set true.
        ignore_watch: ["node_modules", "logs"], // ignore these file changes in watch mode.
      },
    ],
  };