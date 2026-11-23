/* TaskList JS: funciones de tareas y conexión con la interfaz. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.TaskList = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function agregarTarea(tareas, texto) {
    const nombre = String(texto ?? "").trim();
    if (!nombre) return { tareas, error: "Escribe una tarea antes de agregarla." };
    const nueva = { id: Date.now() + Math.random(), texto: nombre, completada: false };
    return { tareas: [...tareas, nueva], error: "" };
  }

  function alternarTarea(tareas, id) {
    return tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
  }

  function eliminarTarea(tareas, id) {
    return tareas.filter(tarea => tarea.id !== id);
  }

  function contarPendientes(tareas) {
    return tareas.filter(tarea => !tarea.completada).length;
  }

  function limpiarCompletadas(tareas) {
    return tareas.filter(tarea => !tarea.completada);
  }

  function filtrarTareas(tareas, filtro) {
    if (filtro === "pendientes") return tareas.filter(tarea => !tarea.completada);
    if (filtro === "completadas") return tareas.filter(tarea => tarea.completada);
    return tareas;
  }

  return { agregarTarea, alternarTarea, eliminarTarea, contarPendientes, limpiarCompletadas, filtrarTareas };
});

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario-tarea");
    if (!formulario) return;

    const entrada = document.querySelector("#entrada-tarea");
    const lista = document.querySelector("#lista-tareas");
    const contador = document.querySelector("#contador");
    const mensaje = document.querySelector("#mensaje");
    const listaVacia = document.querySelector("#lista-vacia");
    const limpiar = document.querySelector("#limpiar-completadas");
    const botonesFiltro = document.querySelectorAll("[data-filtro]");
    let tareas = cargarTareas();
    let filtroActual = "todas";

    function cargarTareas() {
      try {
        const guardadas = JSON.parse(localStorage.getItem("tasklist-tareas"));
        if (!Array.isArray(guardadas)) return [];
        return guardadas.filter(tarea =>
          tarea && typeof tarea.id === "number" &&
          typeof tarea.texto === "string" &&
          typeof tarea.completada === "boolean"
        );
      }
      catch { return []; }
    }

    function guardarTareas() {
      localStorage.setItem("tasklist-tareas", JSON.stringify(tareas));
    }

    function renderizar() {
      lista.replaceChildren();
      TaskList.filtrarTareas(tareas, filtroActual).forEach(tarea => {
        const item = document.createElement("li");
        item.className = `tarea${tarea.completada ? " completada" : ""}`;

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = tarea.completada;
        check.setAttribute("aria-label", `Marcar ${tarea.texto} como completada`);
        check.addEventListener("change", () => {
          tareas = TaskList.alternarTarea(tareas, tarea.id);
          guardarTareas(); renderizar();
        });

        const texto = document.createElement("span");
        texto.className = "tarea-texto";
        texto.textContent = tarea.texto;

        const boton = document.createElement("button");
        boton.className = "eliminar";
        boton.type = "button";
        boton.textContent = "Eliminar";
        boton.setAttribute("aria-label", `Eliminar ${tarea.texto}`);
        boton.addEventListener("click", () => {
          tareas = TaskList.eliminarTarea(tareas, tarea.id);
          guardarTareas(); renderizar();
        });

        item.append(check, texto, boton);
        lista.append(item);
      });
      const pendientes = TaskList.contarPendientes(tareas);
      contador.textContent = `${pendientes} ${pendientes === 1 ? "tarea pendiente" : "tareas pendientes"}`;
      listaVacia.hidden = TaskList.filtrarTareas(tareas, filtroActual).length > 0;
      listaVacia.textContent = tareas.length === 0
        ? "Todavía no tienes tareas"
        : "No hay tareas en esta categoría";
    }

    botonesFiltro.forEach(boton => boton.addEventListener("click", () => {
      filtroActual = boton.dataset.filtro;
      botonesFiltro.forEach(opcion => {
        const seleccionado = opcion === boton;
        opcion.classList.toggle("activo", seleccionado);
        opcion.setAttribute("aria-pressed", String(seleccionado));
      });
      renderizar();
    }));

    formulario.addEventListener("submit", event => {
      event.preventDefault();
      const resultado = TaskList.agregarTarea(tareas, entrada.value);
      mensaje.textContent = resultado.error;
      if (resultado.error) return;
      tareas = resultado.tareas;
      entrada.value = "";
      guardarTareas(); renderizar(); entrada.focus();
    });

    limpiar.addEventListener("click", () => {
      tareas = TaskList.limpiarCompletadas(tareas);
      guardarTareas(); renderizar();
    });

    renderizar();
  });
}
