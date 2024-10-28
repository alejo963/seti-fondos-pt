# Backend BTG

Este es el directorio del backend desarrollado en [Nest](https://nestjs.com/).

## Configuración

```bash
$ npm install
```

## Compilar y ejecutar proyecto

El backend se ejecuta en el puerto 3000

```bash
# desarrollo
$ npm run start

# desarrollo en watch mode
$ npm run start:dev

# ejecución de producción
$ npm run start:prod
```

## Ejecutar tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Configuración de ambientes

El backend hace uso de archivos .env para cargar la configuracion de ambiente tanto para desarrollo como producción. En modo de desarrollo, obtiene las variables del archivo .env. En producción las toma del archivo prod.env. El archivo env.template sirve de plantilla para crear los archivos de configuración mencionados.
