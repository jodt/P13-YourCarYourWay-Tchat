CREATE DATABASE IF NOT EXISTS fleet;
USE fleet;

CREATE TABLE IF NOT EXISTS agency_address (
    id BINARY(16) NOT NULL,
    number VARCHAR(10),
    street VARCHAR(150),
    city VARCHAR(100),
    zipcode VARCHAR(20),
    country VARCHAR(100),
    PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS agency (
    id BINARY(16) NOT NULL,
    phone_number VARCHAR(20),
    address_id BINARY(16) UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT fk_agency_address FOREIGN KEY (address_id) REFERENCES agency_address(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

CREATE TABLE IF NOT EXISTS car (
    id BINARY(16) NOT NULL,
    category CHAR(4) NOT NULL,
    model VARCHAR(100) NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    daily_price DECIMAL(10,2) NOT NULL,
    agency_id BINARY(16),
    PRIMARY KEY (id),
    CONSTRAINT fk_agency FOREIGN KEY (agency_id) REFERENCES agency(id)
    ON DELETE SET NULL
    );
