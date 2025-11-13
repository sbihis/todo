let manualTheme = localStorage.getItem("themeMode") || "auto";

function applyTheme() {
  if (manualTheme === "dark") { 
    document.body.classList.add("dark"); 
    document.getElementById("theme-toggle").textContent = "☀️"; 
    return; 
  }
  if (manualTheme === "light") { 
    document.body.classList.remove("dark"); 
    document.getElementById("theme-toggle").textContent = "🌙"; 
    return; 
  }
  
  const hour = new Date().getHours();
  const isDark = hour >= 19 || hour < 7;
  document.body.classList.toggle("dark", isDark);
  document.getElementById("theme-toggle").textContent = isDark ? "☀️" : "🌙";
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  if (manualTheme === "auto") manualTheme = document.body.classList.contains("dark") ? "light" : "dark";
  else if (manualTheme === "dark") manualTheme = "light";
  else manualTheme = "auto";
  
  localStorage.setItem("themeMode", manualTheme);
  applyTheme();
});

applyTheme();
