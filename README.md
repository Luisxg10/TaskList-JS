# TaskList JS

## Descripción
TaskList JS es una aplicación web sencilla para registrar y organizar tareas pendientes.

## Objetivo
Practicar JavaScript, control de versiones con Git y validación automática con GitHub Actions.

## Funcionalidades
- Agregar tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Borrar todas las tareas completadas.
- Guardar las tareas en el navegador con `localStorage`.
- Ejecutar pruebas automáticas con Node.js.

## Herramientas
- HTML5 y CSS3.
- JavaScript.
- Node.js 22 o compatible con `node:test`.
- Git y GitHub.
- GitHub Actions.

## Cómo ejecutar la aplicación
1. Descarga o clona este repositorio.
2. Abre `index.html` en un navegador moderno.
3. Escribe una tarea y pulsa **Agregar**.

No es necesario instalar dependencias para usar la aplicación.

## Cómo ejecutar las pruebas
Instala Node.js 22 o una versión compatible. Desde la carpeta del proyecto ejecuta:

```bash
npm test
```

## Integración continua
El archivo `.github/workflows/ci.yml` ejecuta las pruebas al subir cambios a `main` o al crear una solicitud de integración (pull request).

## Estructura
```text
TaskList_JS_Semana1/
├── .github/workflows/ci.yml
├── test/app.test.js
├── app.js
├── index.html
├── styles.css
├── package.json
├── .gitignore
└── README.md
```

## Evidencias de la semana 1
Agregar al PDF capturas propias de:
- Aplicación ejecutándose.
- Repositorio de GitHub.
- Historial con al menos cinco commits.
- Archivo de GitHub Actions.
- Ejecución exitosa de las pruebas.
- Ejecución fallida por el error controlado y ejecución exitosa después de corregirlo.
