// app.js

const cleanBtn = document.getElementById("clean-btn");
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("file-input");
const toggleDone = document.getElementById("toggle-done");



	
    // Fonction pour mettre à jour la sélection visuelle
    function updateSelection() {
      displayedTasks.forEach((task, index) => {
        task.classList.toggle('selected', index === selectedIndex);
      });
    }




/** Gestion clavier gobale */
window.addEventListener('keydown', (e) => {
	const key = e.key;
	//ne pas interferer si on est dans un champ éditable
	const active = document.activeElement;
	const isTextInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
	if (isTextInput) return;
	
	//Flèches
	if (key === 'ArrowRight' || key === 'ArrowDown'){
		e.preventDefault();
		selectedIndex = (selectedIndex + 1) % displayedTasks.length;
		console.log(selectedIndex);
        updateSelection();
		console.log("en bas");
		return;
	}
	
	if (key === 'ArrowLeft' || key === 'ArrowUp'){
		e.preventDefault();
		selectedIndex = (selectedIndex - 1 + displayedTasks.length) % displayedTasks.length;
        updateSelection();
		console.log("en haut");
		return;
	}
	// Créer (N / n)
	if (key === 'n' || key === 'N'){
		e.preventDefault();
		taskInput.focus();
		console.log("créer un élément");
		return;
	}

	if (key === 'Backspace'){
		e.preventDefault();
		console.log("supprimer un élément");
		return;
	}
});


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

    const displayedTasks = document.querySelectorAll('.task');
    let selectedIndex = -1;
	console.log(displayedTasks.length);
	console.log(selectedIndex);
	
    // Clic à la souris pour sélectionner un élément
    displayedTasks.forEach((task, index) => {
      task.addEventListener('click', () => {
        selectedIndex = index;
        updateSelection();
      });
    });