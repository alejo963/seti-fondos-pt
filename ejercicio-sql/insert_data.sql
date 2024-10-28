INSERT INTO cliente VALUES(1, 'Pepito', 'Perez', 'Medellin');
INSERT INTO cliente VALUES(2, 'Juan', 'Arango', 'Bogotá');
INSERT INTO cliente VALUES(3, 'Sara', 'Toro', 'Cali');
INSERT INTO cliente VALUES(4, 'Pepito', 'Botero', 'Medellin');
INSERT INTO cliente VALUES(5, 'Cosme', 'Fulanito', 'Medellin');

INSERT INTO sucursal VALUES(1, 'Sucursal en Medellin', 'Medellin');
INSERT INTO sucursal VALUES(2, 'Sucursal en Cali', 'Cali');
INSERT INTO sucursal VALUES(3, 'Sucursal en Bogotá', 'Bogotá');

INSERT INTO producto VALUES(1, 'Producto 1', 'Tipo A');
INSERT INTO producto VALUES(2, 'Producto 2', 'Tipo A');
INSERT INTO producto VALUES(3, 'Producto 3', 'Tipo B');
INSERT INTO producto VALUES(4, 'Producto 4', 'Tipo A');
INSERT INTO producto VALUES(5, 'Producto 5', 'Tipo B');
 
INSERT INTO inscripcion VALUES(1, 1);
INSERT INTO inscripcion VALUES(2, 1);
INSERT INTO inscripcion VALUES(2, 2);
INSERT INTO inscripcion VALUES(3, 2);
INSERT INTO inscripcion VALUES(4, 5);

INSERT INTO disponibilidad VALUES(1, 1);
INSERT INTO disponibilidad VALUES(2, 1);
INSERT INTO disponibilidad VALUES(2, 2);
INSERT INTO disponibilidad VALUES(3, 3);

INSERT INTO visitan VALUES(1, 1, TO_DATE('28-10-2024', 'DD-MM-YYYY'));
INSERT INTO visitan VALUES(2, 2, TO_DATE('28-10-2024', 'DD-MM-YYYY'));
INSERT INTO visitan VALUES(1, 2, TO_DATE('28-10-2024', 'DD-MM-YYYY'));
INSERT INTO visitan VALUES(2, 3, TO_DATE('28-10-2024', 'DD-MM-YYYY'));
INSERT INTO visitan VALUES(2, 4, TO_DATE('28-10-2024', 'DD-MM-YYYY'));
INSERT INTO visitan VALUES(3, 5, TO_DATE('28-10-2024', 'DD-MM-YYYY'));

