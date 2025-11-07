// confetti.js
function launchConfetti(x, y) {
  const colors = ["#81c784", "#ffca28", "#ef5350", "#42a5f5", "#ab47bc"];
  
  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.setProperty("--x", `${(Math.random() - 0.5) * 200}px`);
    confetti.style.setProperty("--y", `${150 + Math.random() * 100}px`);
    
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
  }
}
