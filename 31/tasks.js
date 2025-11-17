const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const durationInput = document.getElementById("duration-input");
const taskList = document.getElementById("task-list");


function createTask(text, duration = 5, completed = false, realEnd = null, taskToInsertAfter = null, createDirection = "After", fixedTask = false, fixedStart = null)  {
  
	  if(fixedTask){
/*		  // Calcul de l'heure de fin
	  const [hour, minute] = fixedStart.split(":").map(Number);
	  const startDate = new Date();
	  startDate.setHours(hour, minute, 0, 0);
	  const endDate = new Date(startDate.getTime() + duration * 60000);

	  const endStr = endDate.toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit"
	  });

	  // Création de l'affichage
	  const task = document.createElement("div");
	  task.className = "task";
	  task.innerHTML = `
		<strong>${text}</strong><br>
		Début : ${fixedStart}<br>
		Durée : ${duration} min<br>
		Fin estimée : <strong>${endStr}</strong>
	  `;

	  const taskDiv = document.createElement("div");
	  taskDiv.classList.add("task");
	  taskDiv.classList.add("fixed");
	  taskDiv.dataset.duration = duration;
	  taskDiv.dataset.completed = false;
	  taskDiv.dataset.fixed = true;
	  taskDiv.dataset.fixedEndDate = endDate;
	  taskDiv.dataset.fixedStart = fixedStart;
	  taskDiv.innerHTML = `
		<strong>${text}</strong><br>
		Début : ${fixedStart}<br>
		Durée : ${duration} min<br>
		Fin estimée : <strong>${endStr}</strong>
	  `;
	  const label = document.createElement("label");
	  label.textContent = text;
	  taskDiv.append(label);

	  document.getElementById("task-list").appendChild(taskDiv);
	 // saveTasks();
	  return;*/
	}
  
  const timeSpan = document.createElement("span");
  timeSpan.classList.add("task-time");
  timeSpan.innerHTML = "--:--";
  
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.dataset.duration = duration;
  taskDiv.dataset.completed = completed;
  if (realEnd) taskDiv.dataset.realEnd = realEnd;
  if(fixedTask){
	  // Calcul de l'heure de fin
	  const [hour, minute] = fixedStart.split(":").map(Number);
	  const startDate = new Date();
	  startDate.setHours(hour, minute, 0, 0);
	  const endDate = new Date(startDate.getTime() + duration * 60000);

	  const endStr = endDate.toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit"
	  });
	  taskDiv.classList.add("fixed");
	  taskDiv.dataset.duration = duration;
	  taskDiv.dataset.completed = completed;
	  taskDiv.dataset.fixed = true;
	  taskDiv.dataset.fixedEndDate = endDate;
	  taskDiv.dataset.fixedStart = fixedStart;
	  timeSpan.innerHTML = `${fixedStart} -> ${endStr}` ;
  }

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

  // === Nouveau bouton pour ajouter une tache en dessous ===
  const addAfterBtn = document.createElement("button");
  addAfterBtn.classList.add("addAfter-btn");
  addAfterBtn.innerHTML = "➕";
  addAfterBtn.title = "ajouter une tâche après";
  
    // === Nouveau bouton pour ajouter une tache au dessus ===
  const addBeforeBtn = document.createElement("button");
  addBeforeBtn.classList.add("addBefore-btn");
  addBeforeBtn.innerHTML = "🥷";
  addBeforeBtn.title = "ajouter une tâche avant";
  
  // === Div pour ajouter une sous-tâche ===
  const subtaskInputContainer = document.createElement("div");
  subtaskInputContainer.classList.add("subtask-input-container");
  subtaskInputContainer.style.display = "none"; // cacher la div au départ

  const subtaskInput = document.createElement("input");
  subtaskInput.type = "text";
  subtaskInput.placeholder = "...";


  // Lorsque la touche "Enter" appuyée

  subtaskInput.addEventListener("keydown", e => { 
	if (e.key === "Enter") {
	  
	  const text = subtaskInput.value.trim();  // Récupère le texte sans espaces avant et après
	  let duration =  5; // Valeur par défaut à 5 min

	  // Vérification si le texte se termine par un nombre
	  const durationMatch = text.match(/(\d+)$/);  // Regarde si le texte se termine par un nombre

	  if (durationMatch) {
		// Si un nombre est trouvé, on l'utilise comme durée
		duration = parseInt(durationMatch[1]);  // `1` est l'index du groupe capturé
		subtaskInput.value = text.replace(durationMatch[0], '').trim();  // Enlève la durée du texte
	  }

	  subtaskInputContainer.style.display = "none"; 

	  // Si le texte est vide après le nettoyage, on ne crée pas la tâche
	  if (!subtaskInput.value.trim()) return;

	  createTask(subtaskInput.value, duration, false, null,taskDiv,subtaskInputContainer.dataset.direction);  // Crée la tâche avec le texte et la durée calculée
	  subtaskInput.value = "";  // Réinitialise le champ de saisie
	  subtaskInputContainer.dataset.direction =""
	  saveTasks();  // Sauvegarde les tâches
  }
	if (e.key === "Escape") {
		subtaskInputContainer.style.display = "none";
	}
  
  });

  // Quand le bouton "Ajouter une sous-tâche" est cliqué, afficher la div de saisie
  addAfterBtn.addEventListener("click", () => {
    subtaskInputContainer.style.display = "block";
	subtaskInputContainer.dataset.direction = "After";
	subtaskInput.focus();
  });
  
  addBeforeBtn.addEventListener("click", () => {
    subtaskInputContainer.style.display = "block";
	subtaskInputContainer.dataset.direction = "Before";
	subtaskInput.focus();
  });

  // Ajouter le bouton et la div de saisie à la tâche
  subtaskInputContainer.append(subtaskInput);
  
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

  
  // Ajouter ces éléments dans mainContentDiv  
  // Ajouter ces éléments dans durationDiv
  // Ajouter les deux divs (mainContentDiv et durationDiv) à taskDiv
  mainContentDiv.append(dragHandle, checkbox, label, deleteBtn);
  durationDiv.append(addBeforeBtn, slider, durationSpan, timeSpan, addAfterBtn, subtaskInputContainer);
  taskDiv.append(mainContentDiv, durationDiv);
  if (completed) taskDiv.classList.add("done");
  
  // Si on a passé une tâche après laquelle insérer la nouvelle tâche
  if (taskToInsertAfter) {
	if (createDirection == "Before"){
		// Insérer la nouvelle tâche juste avant la tâche existante
		taskList.insertBefore(taskDiv, taskToInsertAfter); 
	} else {
		// Insérer la nouvelle tâche juste après la tâche existante
		taskList.insertBefore(taskDiv, taskToInsertAfter.nextSibling); // nextSibling est l'élément suivant la tâche cliquée
	}
  } else {
    // Si aucune tâche n'est passée (ajout normal à la fin de la liste)
    taskList.appendChild(taskDiv);
  }
  
  updateTaskTimes();
  
}

function addTask() {
  const text = taskInput.value.trim();  // Récupère le texte sans espaces avant et après
  let duration =  5; // Valeur par défaut à 5 min

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
  saveTasks();  // Sauvegarde les tâches
}

taskInput.addEventListener("keydown", e => { 
	if (e.key === 'Escape') taskInput.blur();
	if (e.key === "Enter") addTask(); 
	});



