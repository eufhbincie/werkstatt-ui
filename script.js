async function fetchData() {
  const response = await fetch('https://n8n.srv884150.hstgr.cloud/webhook/fahrzeugauswahl');
  const fahrzeuge = await response.json();

  const select = document.getElementById('fahrzeugSelect');
  select.innerHTML = ''; // Clear previous options

  fahrzeuge.forEach(fahrzeug => {
    const option = document.createElement('option');
    option.value = JSON.stringify(fahrzeug); // gesamte Daten speichern
    option.textContent = fahrzeug.label;
    select.appendChild(option);
  });

  document.getElementById('startBtn').addEventListener('click', () => {
    const selectedOption = JSON.parse(select.value);
    const baseUrl = 'https://form.jotform.com/251782043275053';

    const params = new URLSearchParams({
      kennzeichen: selectedOption.kennzeichen || '',
      kunde: selectedOption.kunde || '',
      vin: selectedOption.vin || '',
      marke: selectedOption.marke || '',
      modell: selectedOption.modell || '',
      email: selectedOption.email || ''
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;
    window.open(finalUrl, '_blank');
  });
}

fetchData();
