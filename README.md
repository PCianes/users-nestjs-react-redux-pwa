# Backend Node (NestJS)

Con la intención de mejorar la estructura del código para las bases de una App escalable y mantenible, se evita la habitual decisión de usar sólo `Express` para realizar la API, y se usa el cada vez más popular framework progresivo y profesional para NODE: [NestJS](https://nestjs.com/) (el cual trabaja por defecto usando "Express")

Se decide desplegar en [Heroku](https://dashboard.heroku.com/login) por la facilidad para hacerlo y su capa gratuita. Además facilita la integración de bases de datos también gratuita, en este caso se elige [Managed PostgreSQL](https://www.heroku.com/postgres).

La persistencia de datos se realiza con la ayuda de [TypeORM](https://typeorm.io/) que está bien integrado con NestJS. Como se trata de una gestión de usuarios puede ser buena elección SQL (gratuita en Heroku) que es la que se elige junto con "Sqlite" para la parte de desarrollo en local y testing. Aquí la mayor dificultad es configurar estas 3 opciones de base de datos, y es algo que se hace finalmente con un fichero de configuración `ormconfig.js`

El control de autenticación planteado con "JWT" se hace con la ayuda de [Passport](https://www.passportjs.org/) que actua como "middleware" y facilita el uso de diferentes estrategias como la usada. Además de esto, la gestión de contraseñas se hace más segura mediante la encriptación antes de guardar en base de datos.

- Url Local: [LocalHost](http://localhost:3000/)

## Pruebas manuales, unitarias & integración e2e

Durante el desarrollo lo más cómodo es usar pruebas manuales. En esta ocasión en vez de usar "Postman" o "Insomnia" se ha optado por documentarlo dentro de la carpeta `requests`, con unos ficheros que gracias al uso de la extensión de VSCode llamada [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) facilitan probar todos los endpoints mientras se desarrolla la API

Algunas pruebas de controlador se ejecutan con el comando:
`npm run test`

Otras pruebas más desarrolladas al detalle sobre la funcionalidad al completo de la API se encuentran en la carpeta `test` y se ejecutan con el comando:
`npm run test:e2e`

Las pruebas e2e del backend daban problemas ya que por defecto se ejecutan todas a la vez, siendo conveniente y se solventa el error indicando en el comando del `package.json` la configuración `--maxWorkers=1`

# Frontend React (Redux & PWA)

Se decide realizarlo con React, pero descartando opciones que ya conozco bien como [Gatsby](https://www.gatsbyjs.com/) ya que el desarrollo es considerado más una APP que una página web estática. Aunque ahora los más acertado por velocidad y rendimiento puede ser usar [Vite](https://vitejs.dev/), como se quiere partir de una configuración rápida con integración de pruebas y también con un control bajo "Redux" finalmente se hace con "Create React App" usando el comando:
`npx create-react-app project-name --template redux`

Para agilizar el desarrollo de la parte visual, se decide usar el framework de estilos CSS [Tailwindcss](https://tailwindcss.com/), el cual en su útima versión facilita su configuración con "React" y solo añade los estilos que realmente se usan. Por otra parte hay muchos "layouts" y componentes que se pueden integrar relativamente rápido en "React", aunque la dificultad está en dividirlo en componentes como mejor convenga al proyecto. El desarrollo con esta herramienta agiliza un diseño profesional y responsive en menos tiempo.

El proyecto usa [Redux Toolkit](https://redux-toolkit.js.org/) para facilitar la estructura del proyecto con "Redux" (mismos creadores). Podría ser suficiente en este caso sin un estado global, o en todo caso usando "Context" + "Reducer" ya incluidos en "React", pero se usa "Redux" a nivel formativo y como una base más profesional para gestión de todas las acciones sobre la aplicación: pudiendo controlar esto con las herramientas de desarrollo del navegador.

Se realiza un despliegue en [Netlify](https://www.netlify.com/) por su capa gratuita y facil funcionamiento. El problema que surge con "React" de páginas no encontradas se solventa añadiendo un fichero "\_redirects" en la carpeta "public"

Finalmente se convierte la aplicación en PWA usando la misma configuración que mi otra aplicación [HideFaces.app](https://hidefaces.app/): esto permite instalar la APP en el escritorio o en el móvil.

- Url Local: [LocalHost](http://localhost:5000/)
  -> cambiando el puerto por defecto al 5000 para no colisionar con el backend al desarrollar en local ambos a la vez)

## Pruebas e2e

Es necesario tener tanto el backend como el frontend ejecutándose antes de iniciar las pruebas de extremo a extremo (e2e). Tras estar operativos en local, las pruebas (en este caso con Cypress) se inician desde la carpeta `client` mediante el comando:

`npm run cypress:open`

Las pruebas en cliente se limitan al tipo e2e, y se encuentran en el directorio `client\cypress\integration`. Simulan el flujo habitual de un usuario, por lo que realmente se testea el conjunto.

# Notas finales

- Backend con TypeScript para mejorar el control de datos y lógica de negocio aprovechando su buena integración y configuración con NestJS
- Frontend se evita TypeScript ya que no es tan importante para el control de la lógica de negocio (el backend está mejor controlado), y evitarlo puede facilitar cambios (que son más previsibles en cliente que en la API) y aumentar velocidad de desarrollo. En cualquier caso se hace uso de "PropTypes" para mejorar el control de las "props" en los componentes durante el desarrollo.
- El estilo de la APP realizado no sigue un diseño previo y se basa en aquello más rápido de implementar partiendo de plantillas html con estilos de Tailwindcss.
- Se mejora el aspecto de los usuarios mostrados añadiendo imágenes "fake" aleatorias mediante el uso de urls externas "random".
- El orden de desarrollo a grandes rasgos ha sido:
  - API backend
  - Pruebas backend
  - Web "fake" sin llamadas backend
  - Integración de Redux en cliente para conectarlo con API
  - Pruebas e2e cliente
