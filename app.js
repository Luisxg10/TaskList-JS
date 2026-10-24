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

  return { agregarTarea, alternarTarea, eliminarTarea, contarPendientes, limpiarCompletadas };
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
    let tareas = cargarTareas();

    function cargarTareas() {
      try { return JSON.parse(localStorage.getItem("tasklist-tareas")) || []; }
      catch { return []; }
    }

    function guardarTareas() {
      localStorage.setItem("tasklist-tareas", JSON.stringify(tareas));
    }

    function renderizar() {
      lista.replaceChildren();
      tareas.forEach(tarea => {
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
      listaVacia.hidden = tareas.length > 0;
    }

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
