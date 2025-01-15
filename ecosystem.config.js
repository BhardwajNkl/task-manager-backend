module.exports = {
    apps: [
      {
        name: "task-manager-app", // Deployment name
        script: "dist/main.js", // App entry point
        autorestart: true, // Restarts after crash.
        max_restarts: 5, // Limit the app to 5 restart attempts.
        instances: 1, // Number of app instances to launch.
        exec_mode: "fork", // Execution in fork mode
  
        // Enable logging and specify log files
        error_file: "./logs/app-err.log", // Error logs
        out_file: "./logs/app-out.log", // Normal logs
        log_date_format: "YYYY-MM-DD HH:mm:ss", // Timestamps format in logs

        // Set memory and restart policies
        max_memory_restart: "500M", // Restart app if memory usage exceeds 500 MB
        restart_delay: 5000, // Delay between restarts (5 seconds)
  
        watch: false, // Launch in production mode.
      },
    ],
  };