const API_URL = "https://n8n.srv884150.hstgr.cloud/webhook/fahrzeugauswahl";

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderSelectOptions(data);
  } catch (error) {
    console.error("Fehler beim Laden der Fahrzeugdaten:", error);
  }
}

function renderSelectOptions(data) {
  const select = document.getElementById("fahrzeug");
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = JSON.stringify(item); // alle Daten speichern
    option.text = item.label;
    select.appendChild(option);
  });
}

function openForm() {
  const selected = document.getElementById("fahrzeug").value;
  if (!selected) return alert("Bitte ein Fahrzeug auswählen");

  const fahrzeug = JSON.parse(selected);
  const baseUrl = "https://form.jotform.com/251782043275053";

  const params = new URLSearchParams({
    kennzeichen: fahrzeug.kennzeichen,
    kunde: fahrzeug.kunde,
    vin: fahrzeug.vin,
    marke: fahrzeug.marke,
    modell: fahrzeug.modell,
    email: fahrzeug.email,
  });

  const link = `${baseUrl}?${params.toString()}`;
  window.open(link, "_blank");
}

// Beim Laden der Seite
document.addEventListener("DOMContentLoaded", fetchData);
