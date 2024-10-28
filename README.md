# Prueba técnica SETI: Plataforma de fondos BTG y ejercicio SQL

Este repositorio contiene tanto el frontend desarrollado en Angular y el backend en NestJS de la aplicación. También, contiene los scripts SQL para la resolución del problema. La especificación de la prueba se encuentra en el documento PDF que se encuentra en este repositorio.

La aplicación se encuentra desplegada en AWS, con el frontend hospedado en S3 y el backend junto con la base de datos Mongo ejectándose en un container en una instancia de EC2.

## Acceder a la aplicación desplegueda

Para acceder a la aplicación, se ingresa al siguiente link: http://273354646519-app-bucket.s3-website.us-east-2.amazonaws.com

La aplicación tiene tres secciones: Fondos, Suscripciones, Usuario y Transacciones

### Fondos

La aplicación recibe al usuario en la sección principal de Fondos de inversión, donde puede explorar los fondos disponibles a los cuales se puede suscribir y el monto mínimo requerido para abrirlo.

![alt text](images/front_page.png)

Al hacer click en el botón de Suscribirme, una cuadro de dialogo aparece para definir el monto con el cual se desa suscribir:

![alt text](images/suscribir.png)

Aqui ingresa el monto y, dependiendo del monto que ingrese, se suscribiará al fondo o recibirá un mensaje detallando porque no se pudo suscribir. De ser exitoso, recibirá una notificación por correo o SMS, dependiendo de la configuración de usuario.

### Suscripciones

En esta sección, el usuario puede observar que suscripciones tiene activas y puede cancelarlas si lo desea.

![alt text](images/suscripciones.png)

### Usuario

Aquí podrá observar la información del usuario activo y seleccionar el método de notificación (mensaje de texto o correo electrónico).

![alt text](images/usuario.png)

### Transacciones

Por último, en esta sección se detalla el historial de transacciones de forma paginada, mostrando el tipo de transacción, la cedula del usuario, el nombre del fondo y la fecha de la transacción.

![alt text](images/transacciones.png)
