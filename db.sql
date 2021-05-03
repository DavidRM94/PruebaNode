create database if not exists usuarios_gim;

use usuarios_gim;

create table usuarios (
  id int(255) not null auto_increment,
  name varchar(45) default null,
  ciudad varchar(20) default null,
  sede varchar(20) default null,
  tipoUsu varchar(20) default null,
  contrasena varchar(300) default null

  primary key(id)
);

describe usuarios;


select * from usuarios;

create table sedes(
  id int(255),
  nombresede varchar(50),
  idciudad int(255),
  primary key(id)
);
describe usuarios;

create table ciudades(
id int(255),
ciudad varchar(50),
primary key(id)
);

describe ciudades;

select * from sedes;
select * from ciudades;