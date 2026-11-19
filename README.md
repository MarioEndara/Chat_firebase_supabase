# Proyecto: Aplicación de Chat con Supabase y Firebase

**Universidad:** [Nombre de tu Universidad]
**Materia:** [Nombre de la materia, ej. Desarrollo de Aplicaciones Móviles]
**Integrantes:**
*   Mario Endara ([mendara2009@gmail.com])
*   [Dila Obando] ([dillanobandos@hotmail.com])

**Repositorio:

---

## 1. Descripción del Proyecto
Desarrollamos una aplicación de mensajería en tiempo real multiplataforma. El proyecto integra dos servicios en la nube de forma simultánea: **Firebase** para gestionar la autenticación de usuarios y **Supabase** para el almacenamiento de datos, perfiles y mensajes en tiempo real. La app fue construida utilizando **Ionic + Angular (Standalone) + Capacitor**.

## 2. División del Trabajo
Para organizar el proyecto, dividimos las funcionalidades por módulos:

*   **Integrante 1 (Mario Endara):** Encargado del módulo de Autenticación (Login, Registro y Edición de Perfiles), configuración inicial de Firebase y despliegue del APK.
*   **Integrante 2 ([Nombre del compañero]):** Encargado de la lógica del Chat (Creación de salas, envío de mensajes en tiempo real, soporte para imágenes, archivos y ubicación).

## 3. ¿Cómo utilizamos Firebase y Supabase?

**Firebase (Autenticación):**
Utilizamos Firebase Authentication exclusivamente para gestionar la identidad de los usuarios. Cuando un usuario se registra, Firebase crea la cuenta, encripta la contraseña y genera un **Token de identificación (UID)** único. 

**Supabase (Base de datos y Tiempo Real):**
Supabase se encarga de toda la base de datos relacional (PostgreSQL) y el almacenamiento. Lo interesante es cómo conectamos ambos servicios: configuramos el cliente de Supabase para que utilice la función `accessToken` que le pasa el token generado por Firebase. De esta forma, Supabase "confía" en el usuario autenticado por Firebase y le permite leer y escribir en las tablas.

**Tablas creadas en Supabase:**
*   `profiles`: Guarda el nombre de usuario y el avatar (el ID es el UID de Firebase).
*   `rooms`: Guarda las salas de chat creadas.
*   `messages`: Guarda el contenido de los mensajes (texto, url de archivos o coordenadas GPS).

## 4. Funcionalidades Implementadas
*   [x] **Inicio de sesión y gestión de usuarios:** Login y Registro validados con Firebase.
*   [x] **Edición de perfiles:** Los usuarios pueden cambiar su nombre de usuario y este se actualiza en Supabase.
*   [x] **Creación de salas de chat:** Los usuarios pueden crear nuevas salas.
*   [x] **Envío y almacenamiento de mensajes:** Mensajes de texto guardados en Supabase.
*   [x] **Mensajería en tiempo real:** Uso de Supabase Realtime para recibir mensajes sin recargar la pantalla.
*   [x] **Envío de imágenes y archivos:** Soporte implementado en la base de datos (pendiente de pruebas en UI).
*   [x] **Compartir ubicaciones:** Preparado en la estructura de la base de datos (latitud y longitud).

## 5. Seguridad y Credenciales
Tal como se solicitó, **no se subieron claves privadas ni contraseñas al repositorio**. 
*   Las credenciales de Firebase y Supabase se manejan a través de los archivos `src/environments/environment.ts` y `environment.prod.ts`.
*   Para ejecutar este proyecto localmente, es necesario solicitar dichos archivos a los integrantes del equipo o generar un proyecto nuevo en ambas plataformas y colocar las claves correspondientes.

## 6. Manual de Instalación y Ejecución
Para correr el proyecto en la computadora:
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `ionic serve` para ver el proyecto en el navegador local.

Para generar el APK de Android:
1. Compilar la app web con `ionic build --prod`.
2. Sincronizar Capacitor con `npx cap sync android`.
3. Abrir Android Studio con `npx cap open android` y compilar el APK.

## 7. Galería de la Aplicación (Capturas)
*(Aquí debes insertar capturas de pantalla reales de tu app, por ejemplo:)*
*   <img src="ruta_de_tu_imagen" width="250"> *(Pantalla de Login)*
*   <img src="ruta_de_tu_imagen" width="250"> *(Pantalla de Registro)*
*   <img src="ruta_de_tu_imagen" width="250"> *(Lista de Salas)*
*   <img src="ruta_de_tu_imagen" width="250"> *(Chat en acción)*

## 8. Video Demostrativo
*(Aquí debes pegar el enlace al video publicado en redes sociales, como pedía la rúbrica)*
*   **Enlace al video:** [PEGA EL ENLACE DE TU VIDEO AQUÍ]
