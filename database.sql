CREATE DATABASE kitclub;
USE kitclub;
CREATE TABLE users(
    user_id INT NOT NULL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL
);