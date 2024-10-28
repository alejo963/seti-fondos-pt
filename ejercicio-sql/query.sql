SELECT c.nombre, c.apellidos FROM cliente c
JOIN inscripcion i ON c.id = i.idCliente
JOIN disponibilidad d ON i.idProducto = d.idProducto
JOIN visitan v ON c.id = v.idCliente AND d.idSucursal = v.idSucursal;
