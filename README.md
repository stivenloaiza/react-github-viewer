# GitHub Viewer - v0.0.3

GitHub Viewer es una aplicación web que permite a los usuarios autenticarse con OAuth2 para acceder a sus repositorios privados de GitHub, ver y filtrar sus repositorios y buscar repositorios específicos. La aplicación está diseñada para manejar grandes cantidades de repositorios con una experiencia de usuario eficiente y agradable.

## Características

- **Autenticación con OAuth2**: Accede a tus repositorios privados de GitHub con la seguridad que ofrece la autenticación OAuth2.
- **Paginación eficiente**: Navega a través de grandes cantidades de repositorios de forma eficiente con nuestra implementación de paginación.
- **Filtrado avanzado**: Filtra los repositorios por lenguaje de programación, fecha de creación o estrellas.
- **Ordenamiento flexible**: Ordena los repositorios por fecha de aactualización o estrellas para encontrar lo que necesitas rápidamente.
- **Búsqueda inteligente**: Utiliza la función de búsqueda para localizar repositorios específicos con facilidad.

## Tecnologías Utilizadas

- React + Vite: Un enfoque moderno y rápido para el desarrollo de aplicaciones web.
- Firebase Auth: Autenticación gestionada de forma segura con GitHub como proveedor.
- Firebase Hosting: Alojamiento rápido y seguro con despliegues automatizados a través de GitHub Actions.
- Gitflow: Estrategia de manejo de ramas que mantiene el desarrollo organizado y eficiente.

## Dependencias

Este proyecto está construido con las siguientes librerías y frameworks:

- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.23.0
- MUI 5.15.15
- Firebase 10.11.1
- Octokit 3.2.0
- Node.js 21.6.1

## Configuración Local

Para ejecutar el proyecto localmente, primero ajusta la configuración de Firebase en el archivo `src/firebase/config.ts`.

```shell
apiKey: "<TU_API_KEY>",
authDomain: "github-viewer-7e48c.firebaseapp.com",
projectId: "github-viewer-7e48c",
```

## Comandos para Desarrollo

Para ejecutar el proyecto localmente, primero ajusta la configuración de Firebase en el archivo `src/firebase/config.ts`.

```shell
npm install
npm run dev
```

## Despliegue en Producción

Para construir la aplicación para producción:
```shell
npm ci
npm run build
```
El archivo `.github/workflows/firebase-hosting-merge.yml` está configurado para desplegar automáticamente a Firebase Hosting cuando se realiza un merge a la rama main.

## Estructura de Carpetas del Proyecto

A continuación se describe la organización del código fuente dentro de la carpeta `src`:

### Descripciones Detalladas

- `/assets`: Contiene recursos gráficos como logos e imágenes que se pueden utilizar en la UI de la aplicación.

- `/components`: Incluye componentes de React como `CustomAppBar.tsx` para la barra de navegación y `CustomTextFieldLanguage.tsx` que podrían ser campos de entrada personalizados, etc.

- `/firebase`: Almacena la configuración de Firebase, por ejemplo, la inicialización del SDK de Firebase y la configuración de autenticación.

- `/models`: Define las estructuras de datos o interfaces, por ejemplo `github.ts` podría contener la definición de tipos para los objetos que interactúan con la API de GitHub.

- `/services`: Contiene los servicios o utilidades, como `home_service.ts` y `login_service.ts`, que encapsulan las llamadas a la API y el manejo de la data.

- `/views`: Compone la interfaz de usuario de la aplicación, con archivos como `Home.tsx` y `Login.tsx` representando diferentes páginas o rutas en la aplicación.

Esta estructura de carpetas está diseñada para mantener el proyecto ordenado y modular, haciendo que el código sea más fácil de mantener y escalar.



---
¡Espero que disfrutes utilizando GitHub Viewer tanto como yo disfrute desarrollándolo!

Cordialmente,  
**Milton Loaiza**

[loaizadeveloper@gmail.com](mailto:loaizadeveloper@gmail.com)


## Licencia

Este proyecto está licenciado bajo Creative Commons [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)

Puedes usar y redistribuir este trabajo para cualquier propósito, siempre y cuando se otorgue el crédito apropiado.


