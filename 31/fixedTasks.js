function addFixedTask() {
  const name = document.getElementById("task-name").value.trim();
  const start = document.getElementById("task-start").value;
  const duration = document.getElementById("task-duration").value;

  if (!name || !start || !duration) {
    alert("Veuillez remplir tous les champs !");
    return;
  }
  createTask(name, duration,false, null,null,"After", true, start)

/*
  // Calcul de l'heure de fin
  const [hour, minute] = start.split(":").map(Number);
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
    <strong>${name}</strong><br>
    Début : ${start}<br>
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
  taskDiv.dataset.fixedStart = start;
  taskDiv.innerHTML = `
    <strong>${name}</strong><br>
    Début : ${start}<br>
    Durée : ${duration} min<br>
    Fin estimée : <strong>${endStr}</strong>
  `;
  const label = document.createElement("label");
  label.textContent = name;
  taskDiv.append(label);

  
  //document.getElementById("task-list").appendChild(task);
  document.getElementById("task-list").appendChild(taskDiv);
	*/
  // Reset des champs
  document.getElementById("task-name").value = "";
  document.getElementById("task-start").value = "";
  document.getElementById("task-duration").value = "";
    saveTasks();  // Sauvegarde les tâches
}