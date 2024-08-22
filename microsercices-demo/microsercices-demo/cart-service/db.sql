create database cart_service_db;
use cart_service_db;
create table cart (id integer primary key auto_increment, userId integer, productId integer, price double, productTitle varchar(100), quantity integer);