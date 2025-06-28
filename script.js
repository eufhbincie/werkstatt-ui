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
      kennzeichen: item.kennzeichen,
      kunde: item.kunde,
      vin: item.vin,
      marke: item.marke,
      modell: item.modell
    }));
    renderOptions(fahrzeuge);
  });

function renderOptions(data) {
  fahrzeugSelect.innerHTML = "";
  data.forEach((fzg, index) => {
    const opt = document.createElement("option");
    opt.value = index; // speichere Index statt Link
    opt.text = fzg.label;
    fahrzeugSelect.appendChild(opt);
  });
}

startBtn.addEventListener("click", () => {
  const selectedIndex = fahrzeugSelect.value;
  const selectedFzg = fahrzeuge[selectedIndex];

  if (selectedFzg) {
    const url = new URL("https://form.jotform.com/251782043275053");
    url.searchParams.set("kennzeichen", selectedFzg.kennzeichen);
    url.searchParams.set("kunde", selectedFzg.kunde);
    url.searchParams.set("vin", selectedFzg.vin);
    url.searchParams.set("marke", selectedFzg.marke);
    url.searchParams.set("modell", selectedFzg.modell);

    window.open(url.toString(), "_blank");
  } else {
    alert("Bitte ein Fahrzeug auswählen.");
  }
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = fahrzeuge.filter(fzg => fzg.label.toLowerCase().includes(value));
  renderOptions(filtered);
});
