create TABLE products (
    id SERIAL PRIMARY KEY,
        name VARCHAR(255), 
       image VARCHAR(255), 
    price VARCHAR(255), 
    article VARCHAR(255), 
    available VARCHAR(255), 
    category VARCHAR(255)
);



CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);
