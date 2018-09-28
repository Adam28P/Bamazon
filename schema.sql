CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255) NOT NULL DEFAULT '',
department_name VARCHAR(255) NOT NULL DEFAULT '',
price DECIMAL (10,2) NOT NULL DEFAULT '0',
stock_quantity INT NOT NULL DEFAULT '0'
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Overwatch","Electronics",79.99,500),
    ("Nintendo Switch","Electronics",399.99,250),
    ("Apples","Produce",9.99,50),
    ("iPhone","Electronics",199.99,100),
    ("Dell Laptop","Electronics",1499.99,35),
    ("Sony Television","Electronics",349.99,28),
    ("Bananas","Produce",4.99,25),
    ("The Simpsons Comic Book","Entertainment",24.99,60),
    ("American Horror Story Funko Pop","Entertainment",12.99,10),
    ("Watermelon","Produce",19.99,75);

SELECT * FROM products;