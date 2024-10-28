# Consulta SQL

En este directorio se encuentran los scripts para la creación de tablas, inserción de datos y la consulta para resolución del segundo punto de la prueba técnica. La consulta se encuentra en el archivo `query.sql`.

## Explicación del archivo query.sql

- `cliente` (alias `c`) se une con `inscripcion` (`i`) para obtener a  que tienen algún producto inscrito.
- Luego, `inscripcion` se une con `disponibilidad` (`d`) para verificar que el producto esté disponible en alguna sucursal.
- Finalmente, `cliente` se une con `visitan` (`v`) asegurando que el cliente haya visitado la sucursal donde el producto está disponible (`d.idSucursal = v.idSucursal`).
