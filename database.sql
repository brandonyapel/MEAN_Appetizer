--dbname farmersmarket

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(50),
password VARCHAR(100),
money FLOAT DEFAULT 100
);

CREATE TABLE market(
id SERIAL PRIMARY KEY,
name VARCHAR(50),
price FLOAT
);

CREATE TABLE basket(
id INT PRIMARY KEY,
user_id INT REFERENCES users,
market_id INT REFERENCES market,
quantity INT
);

INSERT INTO market (name, price)
VALUES ('Apple', .99), ('Tomato', 1.19), ('Coffee', 2.99), ('Flowers', 8.99), ('Orange', .89), ('Pepper', 1.29), ('Lettuce', 2.99), ('Basket', 5.99), ('Apron', 19.99), ('Potholders', 19.99);

