## Prueba node.js 
Esta prueba es un api de un gimnasio con multiples sedes en distintas ciudades. Puede descargar el repositorio para probar su funcionalidad.
El api puede registrar usuarios tipo "admin", quienes seran los habilitados para registrar ciudades y sedes del gimnasio si estan logueados, y tipo "norm" quienes solo se registraran en la sede y ciudad donde esten usando el servicio del gimnasio.
El logueo de los usuarios tipo "admin" se realiza enviando el nombre y contraseña, para que el api le de un token con una vigencia de un dia y pueda acceder a la consulta de usuarios por, ciudad y sede, todos los usuarios "norm" registrados y por id del usuario. tambien puede acceder a el registro, consulta y eliminacion de sedes y ciudades. por ultimo tambien puede acceder a eliminar usuarios.

Ya que no es gran volumen de informacion almacenada por registro no se realizo acceso a modificaciones. Si algun registro quedo mal o cambio, se debe eliminar el registro y volver a registrarlo.


** base de datos
La base de datos es en Mysql llamada "usuarios_gim". La estructura la puede encontrar en el archivo db.sql

## Despliegue
** Docker
   Si quiere desplegar el api con contenedores de Docker debe tener docker instalado en su equipo e iniciado
   puede descargarlo en la siguiente direccion https://docs.docker.com/docker-for-windows/install/
   
   Luego de instalado debe crear su usuario y contraseña para iniciar docker

   **nota:
   Si su equipo no trabaja con windows, debe instalar docker-compose en la pagina de docker 
   
   ya iniciado docker debe abrir una consola de comandos. Puede abrirla con win+r o ctrl+ ñ en el editor visual studio code.
   Se situa en la carpeta del proyecto con el comando cd direccionando su ubicacion
   Una vez en la carpeta del proyecto ejecute el comando docker-compose up

   Esto desplegara los contenedores de node.js y mysql y podra acceder a los endpoint's en el localhost:4000

**localhost
  Si quiere ejecutar el api en un servidor local debe tener instalado node.js en su equipo o lo puede descargar en la siguiente direccion  https://nodejs.org/es/. Tambien debe tener instalado mysql o lo puede descargar en la siguiente direccion https://dev.mysql.com/downloads/

  una ves intaladas estas dos herramientas debe abrir una consola de comandos. Puede abrirla con win+r o ctrl+ ñ en el editor visual studio code. Se situa en la carpeta del proyecto con el comando cd direccionando su ubicacion
  Una vez en la carpeta del proyecto ejecute el comando npm run dev

  Esto desplecara la api en el localhost:3000 y podra acceder a los endpoint's

## Uso

paso 1- Ejecutar los endpoint's 1,2 y 3. quienes son los que crean las tablas en la base de datos de mysql donde se almacenaran los usuarios, ciudades y sedes.

paso 2- registrar un usuario tipo "admin" con el endpoint 10. para posteriormente registrar ciudades y sedes. Con el fin de poder registrar ciudades y sedes ya creadas en los usuarios tipo "norm"

paso 3- loguear el usuario tipo "admin" ya registrado con el endpoint 13 y guardar el token que genera el api

paso 4- registrar ciudades y sedes con los endpoint's 11 y 12. Para registrar una sede, la ciudad a la que pertenece ya debe estar registrada.
nota: debe enviarse el token generado por el api para tener el acceso a estas acciones.

paso 5- ya puede registrar usuarios tipo "norm" en las ciudades y sedes ya creadas con el endpoint 10

paso 6- Puede consultar los usuarios, ciudades y sedes con los endpoint's 5, 7, 9, 14

paso 7- puede eliminar los usuarios, ciudades y sedes con los endpoint's 6, 8, 15

paso 5- 
## Endpoint's
**Docker

1- get http://localhost:4000/base/creatablaUsu

2- get http://localhost:4000/base/creatablaCiu

3- get http://localhost:4000/base/creatablasSedes

4- get http://localhost:4000/base/consultaUsu
         enviar en el header x-access-token el token del usuario "admin"

5- get http://localhost:4000/base/consultaCiu
         enviar en el header x-access-token el token del usuario "admin"

6- delete http://localhost:4000/base/elimCiu
         enviar en el header x-access-token el token del usuario "admin"
         body 
         {
             id:[identificacion de la ciudad a eliminar,,,,]
         }


7- get http://localhost:4000/base/consultaSede
         enviar en el header x-access-token el token del usuario "admin"

8- delete http://localhost:4000/base/elimSede
         enviar en el header x-access-token el token del usuario "admin"
         body 
         {
             id:[identificacion de la sede a eliminar,,,,]
         }

9- get http://localhost:4000/base/consultaUsuId/:id
         enviar en el header x-access-token el token del usuario "admin"

10- post http://localhost:4000/base/regUsu
        body
        {
        "id": identificacion del usuario,
        "name": nombre del usuario,
        "ciudad": nombre de la ciudad,
        "sede": nombre de la sede,
        "tipoUsu": tipo de usuario "admin" o "norm",
        "contrasena": contraseña
        }

11- post http://localhost:4000/base/regCiu
         enviar en el header x-access-token el token del usuario "admin"
         body
         {
             "id": identificacion de la ciudad,
             "ciudad": nombre de la ciudad
         }

12- post http://localhost:4000/base/regSede
         enviar en el header x-access-token el token del usuario "admin"
         body
         {
             id:identificacion de la ciudad,
             nombresede: nombre de la sede,
             idciudad: identificacion de la ciudad a la que pertenece la sede
         }
         

13- post http://localhost:4000/base/sigin
        body{
            name:nombre del usuario,
            contrasena:contraseña
        }
         

14- post http://localhost:4000/base/consRegSede
         enviar en el header x-access-token el token del usuario "admin"

15- delete http://localhost:4000/base/elimUsu
         enviar en el header x-access-token el token del usuario "admin"
         body
         {
             id:[identificacion del usuario,,,,]
         }

**localhost
   Son los mismos endpoit' de docker pero en el puerto 3000
   http://localhost:3000/....