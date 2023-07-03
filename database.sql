CREATE DATABASE kitclub;
USE kitclub;
CREATE TABLE users(
    user_id INT NOT NULL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    user_subs INT(255)
);
CREATE TABLE videos(
    video_id INT NOT NULL PRIMARY KEY,
    video_name VARCHAR(57) NOT NULL,
    video_chanel VARCHAR(20) NOT NULL,
    video_tag VARCHAR(15),
    video_views INT(255),
    video_like(255)
);