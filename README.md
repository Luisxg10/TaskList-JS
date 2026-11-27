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
- Filtrar tareas por estado y evitar duplicados.

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

## Liberación y despliegue continuo (semana 2)

- **Versión inicial:** 1.0.0.
- **Actualización publicada:** 1.0.1; aclara el botón de limpieza y moderniza las acciones del flujo para quitar advertencias de runtime obsoleto.
- **Plataforma:** GitHub Pages, adecuada para esta aplicación estática porque utiliza HTML, CSS y JavaScript del lado del navegador y permite publicar sin servidor ni dependencias de ejecución.
- **URL pública:** https://luisxg10.github.io/TaskList-JS/ (se activa al habilitar GitHub Actions como origen de Pages en la configuración del repositorio).
- **Proceso:** cada cambio enviado a `main` ejecuta primero `npm test`. Solo si las pruebas pasan, GitHub Actions empaqueta `index.html`, `styles.css` y `app.js` y despliega el sitio. Las solicitudes de cambios ejecutan CI, pero no publican.
- **Configuración:** `.github/workflows/ci.yml`; no requiere secretos ni variables de configuración para esta aplicación.
- **Ejecución manual:** desde **Actions → Validación de TaskList JS → Run workflow**.

Después de habilitar Pages, guardar capturas de la ejecución exitosa en Actions, de la URL pública y de las verificaciones funcionales posteriores al despliegue para integrarlas al PDF de la entrega.

### Historial de liberaciones

- **1.0.0:** primera publicación de TaskList JS con filtros, validación de duplicados y persistencia local.
- **1.0.1:** texto del botón más claro y mantenimiento del flujo CI/CD.


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

