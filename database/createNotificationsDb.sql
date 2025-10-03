CREATE DATABASE IF NOT EXISTS notifications;
USE notifications;

CREATE TABLE IF NOT EXISTS notification (
    id BINARY(16) NOT NULL,
    user_id BINARY(16) NOT NULL,
    rental_id BINARY(16),
    template VARCHAR(100) NOT NULL,
    channel VARCHAR(20) NOT NULL,
    content TEXT,
    notification_type ENUM('USER', 'SUPPORT') NOT NULL,
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
    );