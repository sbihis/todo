// app.js

const cleanBtn = document.getElementById("clean-btn");
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("file-input");
const toggleDone = document.getElementById("toggle-done");


new Sortable(taskList, {
  handle: '.drag-handle',
  animation: 150,
  onEnd: () => {
    updateTaskTimes();
    saveTasks();
  }
});

cleanBtn.addEventListener("click", () => {
  [...taskList.children].forEach(task => {
    if (task.dataset.completed === "true") task.remove();
  });
  firstTaskStartTime = new Date();
  updateTaskTimes();
  saveTasks();
});



toggleDone.addEventListener("change", () => {
  updateTaskTimes();
  saveTasks();
});

exportBtn.addEventListener("click", exportTasks);
importBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) importTasks(file);
});

loadTasks();
updateTaskTimes();
