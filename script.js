const n8nWebhookUrl = "https://DEINE_N8N_WEBHOOK_URL";

const fahrzeugSelect = document.getElementById("fahrzeugSelect");
const searchInput = document.getElementById("search");
const startBtn = document.getElementById("startBtn");

let fahrzeuge = [];

fetch(n8nWebhookUrl)
  .then(res => res.json())
  .then(data => {
    fahrzeuge = data.map(item => ({
      label: item.label,
      link: item.link
    }));
    renderOptions(fahrzeuge);
  });

function renderOptions(data) {
  fahrzeugSelect.innerHTML = "";
  data.forEach(fzg => {
    const opt = document.createElement("option");
    opt.value = fzg.link;
    opt.text = fzg.label;
    fahrzeugSelect.appendChild(opt);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = fahrzeuge.filter(fzg => fzg.label.toLowerCase().includes(value));
  renderOptions(filtered);
});

startBtn.addEventListener("click", () => {
  const link = fahrzeugSelect.value;
  if (link) window.open(link, "_blank");
});
