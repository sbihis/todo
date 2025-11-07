const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const durationInput = document.getElementById("duration-input");
const taskList = document.getElementById("task-list");

function createTask(text, duration = 5, completed = false, realEnd = null) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.duration = duration;
  taskDiv.dataset.completed = completed;
  if (realEnd) taskDiv.dataset.realEnd = realEnd;

  const dragHandle = document.createElement("span");
  dragHandle.classList.add("drag-handle");
  dragHandle.textContent = "☰";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("custom-checkbox");
  checkbox.checked = completed;

  const label = document.createElement("label");
  label.textContent = text;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "1"; slider.max = "30";
  slider.value = duration;
  slider.classList.add("duration-slider");

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("task-duration");
  durationSpan.textContent = `${duration} min`;

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("task-time");
  timeSpan.innerHTML = "--:--";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Supprimer cette tâche";

  // === Événements ===
  slider.addEventListener("input", () => {
    taskDiv.dataset.duration = slider.value;
    durationSpan.textContent = `${slider.value} min`;
    updateTaskTimes();
    saveTasks();
  });

  checkbox.addEventListener("change", (e) => {
    taskDiv.dataset.completed = checkbox.checked;
    updateTaskTimes();
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Supprimer cette tâche ?")) {
      taskDiv.remove();
      updateTaskTimes();
      saveTasks();
    }
  });

  taskDiv.append(dragHandle, checkbox, label, slider, durationSpan, timeSpan, deleteBtn);
  if (completed) taskDiv.classList.add("done");
  taskList.appendChild(taskDiv);
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const duration = parseInt(durationInput.value) || 5;
  if (!text) return;
  createTask(text, duration, false, null);
  taskInput.value = "";
  durationInput.value = 5;
  saveTasks();
});
