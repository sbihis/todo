// app.js

const cleanBtn = document.getElementById("clean-btn");
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("file-input");
const toggleDone = document.getElementById("toggle-done");
let selectedIndex = -1;



loadTasks();
updateTaskTimes();
let taskSelector = '.task:not(.done)'
if (toggleDone.checked) taskSelector = '.task'
let displayedTasks = document.querySelectorAll(taskSelector);
console.log(displayedTasks.length)

updateSelection();


// Fonction qui affiche correctement la tache selectionnée (dont l'index = selectedIndex)
function updateSelection() {
    taskSelector = '.task:not(.done)'
	if (toggleDone.checked) taskSelector = '.task'
    displayedTasks = document.querySelectorAll(taskSelector);
  
  displayedTasks.forEach((task, index) => {
	task.classList.toggle('selected', index === selectedIndex);
	// Clic à la souris pour sélectionner un élément
	  task.addEventListener('click', () => {
		  selectedIndex = index;
		  updateSelection();
		});
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
	
	// déplacer une tache avec shift + fleche ?
	if (e.shiftKey && key === "ArrowDown") {
	  e.preventDefault();
	  const addAfterButton = displayedTasks[selectedIndex].querySelector('.addAfter-btn');
	  addAfterButton.dispatchEvent(new Event('click'));
	  return;
	}
	if (e.shiftKey && key === "ArrowUp") {
	  e.preventDefault();
	  const addBeforeButton = displayedTasks[selectedIndex].querySelector('.addBefore-btn');
	  addBeforeButton.dispatchEvent(new Event('click'));
	   return;
	}
	
	
	if (key === 'ArrowRight' || key === 'ArrowDown'){
		e.preventDefault();
		selectedIndex = (selectedIndex + 1) % displayedTasks.length;
        updateSelection();
		return;
	}
	
	if (key === 'ArrowLeft' || key === 'ArrowUp'){
		e.preventDefault();
		selectedIndex = (selectedIndex - 1 + displayedTasks.length) % displayedTasks.length;
        updateSelection();
		return;
	}
	// Créer (N / n)
	if (key === 'n' || key === 'N'){
		e.preventDefault();
		taskInput.focus();
		return;
	}

	// Créer (A / a)
	if (key === 'A' || key === 'a'){
		e.preventDefault();
		const toggleDone = document.getElementById("toggle-done");
		toggleDone.checked = !toggleDone.checked;
		toggleDone.dispatchEvent(new Event('change'));
		return;
	}
	
	if (key === 'Backspace'){
	      if (selectedIndex >= 0 && displayedTasks[selectedIndex]) {	
			// on simule un click sur le bouton
			const deleteBtn = displayedTasks[selectedIndex].querySelector('.delete-btn');
			deleteBtn.dispatchEvent(new Event('click')); 
			
            if (displayedTasks.length === 0) {
              selectedIndex = -1;
            } else {
              selectedIndex = Math.min(selectedIndex, displayedTasks.length - 1);
            }
            updateSelection();
          }
		e.preventDefault(); // empêche le retour arrière du navigateur
		return;
	}
	
	if (key === ' '){
	  e.preventDefault();
	  const cb = displayedTasks[selectedIndex].querySelector('.custom-checkbox');
	  displayedTasks[selectedIndex].querySelector('.custom-checkbox').checked = !displayedTasks[selectedIndex].querySelector('.custom-checkbox').checked ;
	  cb.dispatchEvent(new Event('change'));
	  updateSelection();
	  return;
	}
	
	if (key === 'Escape'){
	  selectedIndex = -1; // reinitialiser la selection
	  closePopup(); //fermer la pop up 
	  updateSelection();
	}
	
    // Afficher pop-up avec ?
    // e.key === "?" ne marche pas toujours, on vérifie shift + /
    if ((key === "?" || (e.shiftKey && key === "/")) && popup.style.display === "none") {
      openPopup();
    }
	
});


new Sortable(taskList, {
  handle: '.task',
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

// gestion de la pop-up clavier

  const popup = document.getElementById("shortcutPopup");
  const overlay = document.getElementById("popupOverlay");

  // Fonction pour ouvrir la pop-up
  function openPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
  }

  // Fonction pour fermer la pop-up
  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }