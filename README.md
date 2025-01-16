# Task Manager
This is a backend service for task management. This service exposes APIs to create, fetch, update and delete tasks.

## Table of contents
1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
    - Download The Project
    - Install Dependencies
3. [Configuration](#configuration)
    - Environment Variables
    - Example '.env' File
4. [Running The Application](#running-the-application)
    - Using PM2
5. [Connecting to External Services](#connecting-to-external-services)
    - [MySQL](mysql)
    - [Redis](redis)
    - [RabbitMQ](rabbitmq)
---

## Prerequisites
Ensure that you have the following installed:
- **Node JS**
- **npm**
- **PM2 (Process Manager)**
- **MySQL**
- **Redis**
- **Rabbit MQ**

You may find quick setup instructions for the external services using Docker in [External Services](#external-services) section.

---
## Getting started
### Download The Project
The project is not available in public domain. So, you need to get it from the developers.

### Install Dependencies
Once the download is done, open the project folder inside a command prompt. And install application's dependencies using the following command.
```
npm install
```

---

## Configuration
### Environment Variables
The application requires a **.env** file for configuration. We have already provided a sample **.env** file in the root directory of the project. Modify it as per your setup.

### Example *.env* File:
```
# App configuration variables
APP_NAME=task-manager
APP_PORT=3000

# Database configuration variables
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task-manager-nest
DB_USER=root
DB_PASSWORD=root
DB_SYNC_ENABLE=true,
DB_AUTO_LOAD_MODELS_ENABLE=true

# Redis server configuration variables
REDIS_HOST=localhost
REDIS_PORT=6379

# Rabbit MQ server configuration variables
RABBIT_HOST=localhost
RABBIT_PORT=5672

# Winston log files directory configuration variables.
WINSTON_LOG_DIR=./winston-logs
```

---
## Running the application
### Using PM2
PM2 is used to manage the application processes.

**Install PM2 globally if you haven't already**
```
npm install pm2 -g
```

**Build the project**
```
npm run build
```

**Start the application**

We have provided a PM2 configuration file with the project. You may modify it as per the requirement. This file can be used to start application instance.
```
pm2 start ecosystem.config.js
```

**You can monitor the application using the below command**
```
pm2 monit
```

**Stop the application**
```
pm2 stop ecosystem.config.js
```

---
## External Services