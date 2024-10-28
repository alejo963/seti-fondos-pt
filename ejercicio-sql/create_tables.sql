CREATE TABLE cliente (
	id INT 	PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	apellidos VARCHAR(30) NOT NULL,
	ciudad VARCHAR(20) NOT NULL
);

CREATE TABLE sucursal (
	id INT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	ciudad VARCHAR(20) NOT NULL
);

CREATE TABLE producto(
	id INT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	tipoProducto VARCHAR(20) NOT NULL
);

CREATE TABLE inscripcion (
	idProducto INT,
	idCliente INT,
	PRIMARY KEY(idProducto, idCliente),
	FOREIGN KEY(idProducto) REFERENCES producto(id),
	FOREIGN KEY(idCliente) REFERENCES cliente(id)
);

CREATE TABLE disponibilidad (
	idSucursal INT,
	idProducto INT,
	PRIMARY KEY(idSucursal, idProducto),
	FOREIGN KEY(idSucursal) REFERENCES sucursal(id),
	FOREIGN KEY(idProducto) REFERENCES producto(id)
);

CREATE TABLE visitan (
	idSucursal INT,
	idCliente INT,
	fechaVisita DATE NOT NULL,
	PRIMARY KEY(idSucursal, idCliente),
	FOREIGN KEY(idSucursal) REFERENCES sucursal(id),
	FOREIGN KEY(idCliente) REFERENCES cliente(id)
	
);


