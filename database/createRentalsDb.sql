CREATE DATABASE IF NOT EXISTS rentals;
USE rentals;

CREATE TABLE IF NOT EXISTS rental (
    id BINARY(16) NOT NULL,
    user_id BINARY(16) NOT NULL,
    car_id BINARY(16) NOT NULL,
    departure_agency BINARY(16) NOT NULL,
    return_agency BINARY(16) NOT NULL,
    departure_date DATETIME(6) NOT NULL,
    return_date DATETIME(6) NOT NULL,
    status ENUM('RESERVED', 'ONGOING', 'CANCELLED', 'FINISHED') NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
    );