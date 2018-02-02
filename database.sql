--dbname MEAN_Appetizer

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(50),
password VARCHAR(100)
);

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
user_id INT,
projectname VARCHAR(100)
);

CREATE TABLE files(
id SERIAL PRIMARY KEY,
project_id INT,
fileName VARCHAR(100),
filetype VARCHAR(100),
code VARCHAR(3000)
);
