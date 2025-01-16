-- Create a database
CREATE DATABASE `task-manager-nest`;

-- Create the 'tasks' table in the above created database.
USE `task-manager-nest`;

CREATE TABLE tasks(
id INT AUTO_INCREMENT,
title VARCHAR(255) UNIQUE NOT NULL,
description VARCHAR(255) NOT NULL,
status ENUM('PENDING','IN_PROGRESS', 'COPMPLETED') DEFAULT 'PENDING' NOT NULL,
priority ENUM('LOW','MEDIUM', 'HIGH') DEFAULT 'LOW' NOT NULL,
createdAt DATETIME NOT  NULL,
updatedAt DATETIME NOT NULL,

PRIMARY KEY(id)
);