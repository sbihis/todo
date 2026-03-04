const gantt = document.getElementById("gantt");
gantt.innerText = gantt.innerText + `
teote :10m
fsdf : 22m 
last_task : 9m `

console.log(gantt.innerText)

gantt.removeAttribute("data-processed");
mermaid.run({ nodes: [gantt] });

