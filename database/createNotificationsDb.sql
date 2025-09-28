CREATE DATABASE IF NOT EXISTS notifications;
USE notifications;

CREATE TABLE IF NOT EXISTS notification (
    id BINARY(16) NOT NULL,
    user_id BINARY(16) NOT NULL,
    rental_id BINARY(16) NOT NULL,
    template VARCHAR(100) NOT NULL,
    channel VARCHAR(20) NOT NULL
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
    );