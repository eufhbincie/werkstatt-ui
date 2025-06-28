let vehicles = [];
let selectedVehicle = null;

const listElement = document.getElementById("vehicleList");
const searchInput = document.getElementById("search");
const errorMsg = document.getElementById("errorMsg");

// Webhook aufrufen und Fahrzeuge holen
fetch("https://n8n.srv884150.hstgr.cloud/webhook/fahrzeugauswahl")
  .then((res) => res.json())
  .then((data) => {
    vehicles = data;
    renderList(vehicles);
  });

function renderList(items) {
  listElement.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "vehicle-item";
    li.textContent = item.label;
    li.addEventListener("click", () => selectVehicle(index));
    if (selectedVehicle === index) {
      li.classList.add("selected");
    }
    listElement.appendChild(li);
  });
}

function selectVehicle(index) {
  selectedVehicle = index;
  errorMsg.style.display = "none";
  renderList(vehicles);
}

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase();
  const filtered = vehicles.filter((v) =>
    v.label.toLowerCase().includes(search)
  );
  renderList(filtered);
});

document.querySelectorAll(".start-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (selectedVehicle === null) {
      errorMsg.style.display = "block";
      return;
    }

    const fahrzeug = vehicles[selectedVehicle];
    const typ = btn.dataset.type;

    const baseUrl = "https://form.jotform.com/251782043275053";
    const params = new URLSearchParams({
      kennzeichen: fahrzeug.kennzeichen || "",
      kunde: fahrzeug.kunde || "",
      vin: fahrzeug.vin || "",
      marke: fahrzeug.marke || "",
      modell: fahrzeug.modell || "",
      email: fahrzeug.email || "",
      typ: typ
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  });
});
