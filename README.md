# QA Challenge — Playwright + TypeScript

Este documento registra el proceso de configuración y desarrollo que fui realizando para resolver el challenge de QA Manual y Automation sobre Tricentis Demo Web Shop.

El proyecto está creado en Windows y lo estoy trabajando desde Visual Studio Code, utilizando Playwright con TypeScript para desarrollar y ejecutar las pruebas automatizadas.

## 1. Herramientas instaladas

- Visual Studio Code
- Node.js y npm
- Git
- Playwright con TypeScript

## 2. Instalación y comprobaciones

### Visual Studio Code

Descargué e instalé Visual Studio Code desde su [sitio oficial](https://code.visualstudio.com/).

Para comprobar que quedó instalado, abrí PowerShell y ejecuté:

```powershell
code --version
```

El comando respondió con la versión instalada.

También instalé la extensión **Playwright Test for VSCode** desde el apartado de extensiones del editor.

### Node.js y npm

Descargué e instalé Node.js desde [nodejs.org](https://nodejs.org/).

Después abrí una nueva ventana de PowerShell y comprobé las versiones:

```powershell
node --version
npm --version
```

En mi entorno, los comandos devolvieron:

```text
Node.js: v26.13.0
npm: 11.20.0
```

### Git

Descargué Git for Windows desde su [sitio oficial](https://git-scm.com/install/windows).

Durante la instalación seleccioné Visual Studio Code como editor predeterminado y habilité Git para utilizarlo desde la línea de comandos y desde otras aplicaciones.

Al finalizar, cerré y volví a abrir PowerShell y ejecuté:

```powershell
git --version
```

El comando respondió con la versión instalada de Git.

## 3. Creación del proyecto Playwright

Creé la carpeta del proyecto y la abrí desde Visual Studio Code.

Desde la terminal integrada ejecuté:

```powershell
npm init playwright@latest
```

En el asistente seleccioné:

- TypeScript como lenguaje.
- `tests` como carpeta de pruebas.
- No agregar un workflow de GitHub Actions por el momento.
- Instalar los navegadores de Playwright.

El asistente generó la estructura inicial del proyecto, incluyendo `tests`, `playwright.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json` y `.gitignore`.

La versión de Playwright instalada es:

```text
1.64.1
```

La comprobé con:

```powershell
npx playwright --version
```

## 4. Desarrollo de la estructura del framework

A partir de la configuración inicial, fui organizando el proyecto para mantener el código modular y facilitar su mantenimiento.

Implementé una estructura basada en Page Object Model (POM), separando los elementos y acciones de cada página de los casos de prueba.

También incorporé Fixtures para centralizar la inicialización y reutilización de las páginas y servicios dentro de los tests.

La estructura principal quedó organizada de la siguiente manera:

```text
qa-challenge-msa/
├── node_modules/
│
├── fixtures/
│   └── test.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── RegistrationPage.ts
│   ├── LoginPage.ts
│   └── CartPage.ts
│
├── services/
│   └── MercadoLibreService.ts
│
├── tests/
│   ├── ui/
│   │   ├── register/
│   │   ├── login/
│   │   └── cart/
│   │
│   ├── api/
│   │
│   └── forced-failure/
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

## 5. Pruebas automatizadas de interfaz (UI)

Desarrollé seis casos de prueba automatizados sobre la aplicación [Tricentis Demo Web Shop](http://demowebshop.tricentis.com/).

Los casos se distribuyeron en tres módulos:

### Registro

- Registro exitoso de un nuevo usuario.
- Validación del rechazo de registro utilizando un correo electrónico que ya existe.

### Login

- Inicio de sesión exitoso con credenciales válidas.
- Validación de inicio de sesión con credenciales incorrectas.

### Cart

- Incorporación de productos al carrito y validación de sus datos.
- Modificación de cantidades, recálculo de importes y eliminación de productos del carrito.

Para estos escenarios utilicé los Page Objects correspondientes, buscando reutilizar acciones y mantener las validaciones dentro de cada caso de prueba.

## 6. Integración y pruebas de API

También incorporé una integración para realizar una prueba sobre la API de Mercado Libre.

El endpoint utilizado fue:

```text
GET https://www.mercadolibre.com.ar/menu/departments
```

La prueba valida que la respuesta del servicio sea correcta y que el contenido recibido incluya la propiedad `departments`.

Para mantener la misma organización del framework, separé la comunicación con el servicio dentro de `services/MercadoLibreService.ts` y reutilicé su instancia mediante Fixtures.

## 7. Capturas de pantalla automáticas ante fallas

Configuré Playwright para generar evidencias automáticamente cuando un test falla.

Dentro de `playwright.config.ts` configuré:

- Capturas de pantalla únicamente ante fallas.
- Grabación de video cuando un test falla.
- Retención del trace para facilitar el análisis de errores.

Estas configuraciones permiten revisar lo ocurrido durante la ejecución sin necesidad de reproducir manualmente cada escenario.

Las evidencias generadas se almacenan dentro de la carpeta `test-results`.

## 8. Prueba de fallo forzado (Forced Failure)

Incorporé un caso de prueba adicional para comprobar el funcionamiento de las capturas automáticas.

El test realiza una validación deliberadamente incorrecta, buscando provocar un fallo controlado y verificar que Playwright genere las evidencias correspondientes.

Durante la ejecución comprobe que se generaron correctamente:

- Captura de pantalla (`test-failed-1.png`).
- Video de la ejecución (`video.webm`).
- Trace (`trace.zip`).

Este caso se mantiene separado de las seis pruebas funcionales para identificar claramente su objetivo.

## 9. Reporte de ejecución

Configuré el reporter HTML de Playwright para generar un reporte interactivo con los resultados de las ejecuciones.

Para visualizarlo utilizo:

```powershell
npx playwright show-report
```

El reporte permite consultar los casos ejecutados, sus resultados y los detalles de las fallas.

En la ejecución final de la suite se obtuvo el siguiente resultado:

```text
6 passed
1 failed
```

Los seis casos funcionales finalizaron correctamente y el único fallo corresponde al test `FORCED-FAILURE-001`, que fue diseñado intencionalmente para comprobar la generación automática de evidencias.

## 10. Ejecución del proyecto

Para ejecutar el proyecto desde una instalación nueva, primero es necesario instalar las dependencias:

```powershell
npm install
```

Para ejecutar todos los casos:

```powershell
npx playwright test
```

Para ejecutar los tests en un navegador visible:

```powershell
npx playwright test --headed
```

Para visualizar el reporte HTML:

```powershell
npx playwright show-report
```

## 11. Estado final del challenge

Al finalizar el desarrollo, el proyecto cuenta con:

- Entorno configurado con Playwright y TypeScript.
- Framework organizado y modularizado.
- Implementación de Page Object Model.
- Fixtures para reutilización de páginas y servicios.
- Seis casos de prueba funcionales automatizados sobre la interfaz.
- Integración y prueba de API de Mercado Libre.
- Capturas de pantalla automáticas ante fallas.
- Prueba adicional de fallo forzado.
- Reporte HTML interactivo de ejecución.

Este fue un proceso de desarrollo en el que fui construyendo y verificando cada parte del proyecto de manera progresiva, desde la configuración inicial del entorno hasta la ejecución de los casos automatizados y la generación de evidencias.
