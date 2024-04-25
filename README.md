# This is Amynogym Shop

## Correr en dev

1. Clonar el repositorio
3. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
4. Instalar las dependencias ```pnpm run install```
5. Tener docker abierto y levantar la base de datos ```docker compose up -d```
6. Correr las migraciones de Prisma ```pnpx prisma migrate dev```
7. Limpiar el local storage del navegador.
8. Ejecutar el seed ```pnpm run seed```
9. Correr el proyecto ```pnpm run dev```

## Correr en producción
