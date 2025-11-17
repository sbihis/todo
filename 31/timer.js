// timer.js

let firstTaskStartTime = null;

function updateTaskTimes() {
  const taskList = document.getElementById("task-list");
  const toggleDone = document.getElementById("toggle-done");
  const tasks = [...taskList.children];
  if (tasks.length === 0) {
    firstTaskStartTime = null;
    localStorage.removeItem("tasks");
    return;
  }
  if (!firstTaskStartTime) firstTaskStartTime = new Date();

  let currentEnd = new Date(firstTaskStartTime);

  tasks.forEach(task => {
    const isDone = task.dataset.completed === "true";
    const duration = parseInt(task.dataset.duration);
    const timeSpan = task.querySelector(".task-time");
    currentEnd = new Date(currentEnd.getTime() + duration * 60000);

	//ajoutée
	if (task.dataset.fixed){
		currentEnd = new Date(task.dataset.fixedEndDate);
	}
    else {
		if (isDone && task.dataset.realEnd) {
		  const realEnd = new Date(task.dataset.realEnd);
		  const estStr = currentEnd.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		  const realStr = realEnd.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		  const delta = Math.round((realEnd - currentEnd) / 60000);
		  const deltaStr = delta >= 0 ? `+${delta} min` : `${delta} min`;
		  timeSpan.innerHTML = `Est: ${estStr}, Réel: ${realStr} (<span>${deltaStr}</span>)`;
		} else {
		  const estStr = currentEnd.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		  timeSpan.textContent = `Fin estimée: ${estStr}`;
		}
	}

    task.style.display = (!toggleDone.checked && isDone) ? "none" : "flex";
  });
}
