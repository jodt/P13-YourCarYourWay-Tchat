CREATE DATABASE IF NOT EXISTS payments;
USE payments;

CREATE TABLE IF NOT EXISTS payment (
    id BINARY(16) NOT NULL,
    user_id BINARY(16) NOT NULL,
    rental_id BINARY(16) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    stripe_payment_id VARCHAR(100) NOT NULL,
    devise CHAR(3) NOT NULL,
    payment_date DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
    );