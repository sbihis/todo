// saveLoad.js

function saveTasks() {
  const tasks = [...document.getElementById("task-list").children].map(t => ({
    text: t.querySelector("label").textContent,
    duration: t.dataset.duration,
    completed: t.dataset.completed === "true",
    realEnd: t.dataset.realEnd || null,
	fixed: t.dataset.fixed === "true",
	fixedEndDate: t.dataset.fixedEndDate,
	fixedStart: t.dataset.fixedStart
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if(firstTaskStartTime){
	localStorage.setItem("firstTaskStartTime", firstTaskStartTime.toISOString());
  }
  localStorage.setItem("toggleDone", document.getElementById("toggle-done").checked);
}

function loadTasks(data = null) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  const saved = data || JSON.parse(localStorage.getItem("tasks") || "[]");
  const showDone = localStorage.getItem("toggleDone");
  const savedStart = localStorage.getItem("firstTaskStartTime");
  firstTaskStartTime = savedStart ? new Date(savedStart) : null;
  if (showDone !== null) document.getElementById("toggle-done").checked = showDone === "true";

  saved.forEach(task => createTask(task.text, task.duration, task.completed, task.realEnd, null, null, task.fixed, task.fixedStart));
}

function exportTasks() {
  const data = localStorage.getItem("tasks") || "[]";
  const firstTaskStartTime = localStorage.getItem("FirstTaskStartTime");
  const blob = new Blob([data,firstTaskStartTime], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "todo_list.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importTasks(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error();
      loadTasks(data);
      firstTaskStartTime = new Date();
      updateTaskTimes();
      saveTasks();
      alert("Liste importée avec succès !");
    } catch {
      alert("Fichier JSON invalide !");
    }
  };
  reader.readAsText(file);
}
