  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";

    // Configuration (optionnel)
    mermaid.initialize({
      startOnLoad: true,
      theme: "default"
      // securityLevel: "strict" // recommandé si tu injectes du contenu non fiable
    });
  </script>

const gantt = document.getElementById("gantt");
gantt.innerText = gantt.innerText + `
teote :10m
fsdf : 22m 
last_task : 9m `

console.log(gantt.innerText)

gantt.removeAttribute("data-processed");
mermaid.run({ nodes: [gantt] });

