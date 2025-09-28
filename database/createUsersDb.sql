CREATE DATABASE IF NOT EXISTS users;
USE users;

CREATE TABLE IF NOT EXISTS user_address (
    id BINARY(16) NOT NULL,
    number VARCHAR(10),
    street VARCHAR(150),
    city VARCHAR(100),
    zipcode VARCHAR(20),
    country VARCHAR(100),
    PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS user (
    id BINARY(16) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    phone_number VARCHAR(20),
    place_of_birth VARCHAR(100),
    address_id BINARY(16) UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_address FOREIGN KEY (address_id) REFERENCES user_address(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );


