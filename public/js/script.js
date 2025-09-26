const forminv = document.getElementById('inversion22');
const resultadoElement = document.getElementById('resultado');

forminv.addEventListener('submit', async function (event) {
  event.preventDefault();

  const inversionInput = document.getElementById('inversioon');
  const mesesInput = document.getElementById('meses');

  const inversion = parseFloat(inversionInput.value);
  const meses = parseInt(mesesInput.value);

  if (isNaN(inversion) || isNaN(meses) || inversion <= 0 || meses <= 0) {
    resultadoElement.textContent = 'Por favor, ingresa valores válidos.';
    return;
  }

  try {
    const response = await fetch('/calcular-interes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inversion, meses })
    });

    const data = await response.json();

    if (response.status !== 200) {
      resultadoElement.textContent = `Error: ${data.error}`;
      return;
    }

    resultadoElement.textContent = `Tu inversión de $${inversion.toFixed(2)} crecerá a $${data.montoFinal} en ${meses} meses.`;

    console.log('Monto final recibido del servidor:', data.montoFinal);

  } catch (error) {
    resultadoElement.textContent = 'Ocurrió un error al conectar con el servidor.';
    console.error('Error:', error);
  }
});
