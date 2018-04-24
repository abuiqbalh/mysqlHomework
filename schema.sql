drop database  if exists bamazon;
create database bamazon;
use bamazon;
create table products (item_id int not null auto_increment,
product_name varchar(24),
department_name varchar(25),
price decimal(4,2),
stock_quantity int,
primary-key(item_id)
)