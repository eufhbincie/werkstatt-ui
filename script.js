const apiUrl = 'https://n8n.srv884150.hstgr.cloud/webhook/fahrzeugauswahl';

async function fetchFahrzeuge() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    populateDropdown(data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeugdaten:', error);
  }
}

function populateDropdown(fahrzeuge) {
  const select = document.getElementById('fahrzeug');
  select.innerHTML = ''; // Leeren

  fahrzeuge.forEach(f => {
    const option = document.createElement('option');
    option.value = JSON.stringify(f); // ganze Datenstruktur
    option.text = f.label;
    select.appendChild(option);
  });
}

function filterOptions() {
  const search = document.getElementById('search').value.toLowerCase();
  const select = document.getElementById('fahrzeug');

  for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    const text = option.text.toLowerCase();
    option.style.display = text.includes(search) ? 'block' : 'none';
  }
}

function openForm() {
  const select = document.getElementById('fahrzeug');
  if (select.value) {
    const data = JSON.parse(select.value);

    const params = new URLSearchParams({
      kennzeichen: data.kennzeichen || '',
      kunde: data.kunde || '',
      vin: data.vin || '',
      marke: data.marke || '',
      modell: data.modell || '',
      'E-Mail': data.email || ''
    });

    const url = `https://form.jotform.com/251782043275053?${params.toString()}`;
    window.open(url, '_blank');
  } else {
    alert('Bitte ein Fahrzeug auswählen.');
  }
}

// Seite geladen → Fahrzeuge holen
window.onload = fetchFahrzeuge;
