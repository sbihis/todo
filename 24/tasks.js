const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const durationInput = document.getElementById("duration-input");
const taskList = document.getElementById("task-list");

/*function createTask(text, duration = 5, completed = false, realEnd = null) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.duration = duration;
  taskDiv.dataset.completed = completed;
  if (realEnd) taskDiv.dataset.realEnd = realEnd;

  // Composants de la tâche
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

  // Regrouper les éléments
  taskDiv.append(dragHandle, checkbox, label, document.createElement('br'), slider, durationSpan, timeSpan, deleteBtn);
  if (completed) taskDiv.classList.add("done");
  taskList.appendChild(taskDiv);

  updateTaskTimes();
}*/

function createTask(text, duration = 5, completed = false, realEnd = null) {
  console.log("dans la nouvelle create task");
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.duration = duration;
  taskDiv.dataset.completed = completed;
  if (realEnd) taskDiv.dataset.realEnd = realEnd;

  // Div pour le contenu principal
  const mainContentDiv = document.createElement("div");
  mainContentDiv.classList.add("task-main-content");

  // Composants de la tâche : mainContentDiv
  const dragHandle = document.createElement("span");
  dragHandle.classList.add("drag-handle");
  dragHandle.textContent = "☰";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("custom-checkbox");
  checkbox.checked = completed;

  const label = document.createElement("label");
  label.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Supprimer cette tâche";

  // Ajouter ces éléments dans mainContentDiv
  mainContentDiv.append(dragHandle, checkbox, label, deleteBtn);

  // Div pour la durée
  const durationDiv = document.createElement("div");
  durationDiv.classList.add("task-duration-content");

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

  // Ajouter ces éléments dans durationDiv
  durationDiv.append(slider, durationSpan, timeSpan);

  // Ajouter les deux divs (mainContentDiv et durationDiv) à taskDiv
  taskDiv.append(mainContentDiv, durationDiv);

  // Si la tâche est complétée, on lui ajoute la classe "done"
  if (completed) taskDiv.classList.add("done");

  // Ajouter la tâche à la liste
  taskList.appendChild(taskDiv);

  // Mettre à jour les horaires des tâches (fonction à définir ailleurs)
  updateTaskTimes();
}





function createTask(text, duration = 5, completed = false, realEnd = null) {
    
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.duration = duration;
  taskDiv.dataset.completed = completed;
  if (realEnd) taskDiv.dataset.realEnd = realEnd;

// Div pour le contenu principal
  const mainContentDiv = document.createElement("div");
  mainContentDiv.classList.add("task-main-content");
  
    // Div pour la durée
  const durationDiv = document.createElement("div");
  durationDiv.classList.add("task-duration-content");
  
  // Composants de la tâche
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
	  taskDiv.dataset.completed = checkbox.checked;  // Change le statut "completed" de la tâche
	  
	  if (checkbox.checked) {  // Si la tâche est cochée, on marque la tâche comme terminée
		taskDiv.classList.add("done");  // Ajoute la classe CSS "done" pour styliser la tâche comme terminée
		taskDiv.dataset.realEnd = new Date().toISOString();  // Enregistre la date de fin réelle
		const rect = e.target.getBoundingClientRect();
		launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);  // Lance des confettis
	  } else {
		taskDiv.classList.remove("done");  // Enlève la classe CSS "done" si la case est décochée
		delete taskDiv.dataset.realEnd;  // Supprime la date de fin réelle
	  }
	  updateTaskTimes();  // Met à jour les heures des tâches
	  saveTasks();  // Sauvegarde l'état des tâches dans le localStorage
	});

  deleteBtn.addEventListener("click", () => {
      taskDiv.remove();
      updateTaskTimes();
      saveTasks(); 
  });

// Regrouper les éléments
  //taskDiv.append(dragHandle, checkbox, label, slider, durationSpan, timeSpan, deleteBtn);
  
  // Ajouter ces éléments dans mainContentDiv
  mainContentDiv.append(dragHandle, checkbox, label, deleteBtn);
  
  // Ajouter ces éléments dans durationDiv
  durationDiv.append(slider, durationSpan, timeSpan);

  // Ajouter les deux divs (mainContentDiv et durationDiv) à taskDiv
  taskDiv.append(mainContentDiv, durationDiv);
  
  if (completed) taskDiv.classList.add("done");
  taskList.appendChild(taskDiv);
  updateTaskTimes();
  
}

function addTask() {
  const text = taskInput.value.trim();  // Récupère le texte sans espaces avant et après
  let duration = parseInt(durationInput.value) || 5; // Valeur par défaut à 5 min si aucune valeur dans durationInput

  // Vérification si le texte se termine par un nombre
  const durationMatch = text.match(/(\d+)$/);  // Regarde si le texte se termine par un nombre

  if (durationMatch) {
    // Si un nombre est trouvé, on l'utilise comme durée
    duration = parseInt(durationMatch[1]);  // `1` est l'index du groupe capturé
    taskInput.value = text.replace(durationMatch[0], '').trim();  // Enlève la durée du texte
  }

  // Si le texte est vide après le nettoyage, on ne crée pas la tâche
  if (!taskInput.value.trim()) return;

  createTask(taskInput.value, duration, false, null);  // Crée la tâche avec le texte et la durée calculée
  taskInput.value = "";  // Réinitialise le champ de saisie
  durationInput.value = "";  // Réinitialise la durée par défaut
  saveTasks();  // Sauvegarde les tâches
}


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => { if (e.key === "Enter") addTask(); });
durationInput.addEventListener("keypress", e => { if (e.key === "Enter") addTask(); });

