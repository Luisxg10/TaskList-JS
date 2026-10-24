const test = require("node:test");
const assert = require("node:assert/strict");
const TaskList = require("../app.js");

test("agrega una tarea con texto válido", () => {
  const resultado = TaskList.agregarTarea([], "Estudiar JavaScript");
  assert.equal(resultado.tareas.length, 1);
  assert.equal(resultado.tareas[0].texto, "Estudiar JavaScript");
  assert.equal(resultado.tareas[0].completada, false);
  assert.equal(resultado.error, "");
});

test("no agrega una tarea vacía", () => {
  const resultado = TaskList.agregarTarea([], "   ");
  assert.equal(resultado.tareas.length, 0);
  assert.notEqual(resultado.error, "");
});

test("marca una tarea como completada", () => {
  const tareas = [{ id: 1, texto: "Leer", completada: false }];
  const resultado = TaskList.alternarTarea(tareas, 1);
  assert.equal(resultado[0].completada, true);
});

test("elimina la tarea indicada", () => {
  const tareas = [
    { id: 1, texto: "Leer", completada: false },
    { id: 2, texto: "Practicar", completada: false }
  ];
  assert.deepEqual(TaskList.eliminarTarea(tareas, 1).map(t => t.id), [2]);
});

test("cuenta solo las tareas pendientes", () => {
  const tareas = [
    { id: 1, texto: "Leer", completada: false },
    { id: 2, texto: "Practicar", completada: true }
  ];
  assert.equal(TaskList.contarPendientes(tareas), 99);
});

test("limpia las tareas completadas", () => {
  const tareas = [
    { id: 1, texto: "Leer", completada: false },
    { id: 2, texto: "Practicar", completada: true }
  ];
  assert.deepEqual(TaskList.limpiarCompletadas(tareas).map(t => t.id), [1]);
});
