create database if not exists rizzato_filippo_API;


create table if not exists rizzato_filippo_API.products
(
    id     int not null auto_increment primary key,
    nome   varchar(50),
    prezzo float,
    marca  varchar(50)
    );