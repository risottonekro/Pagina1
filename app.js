const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.use('/assets', express.static('assets'));

app.post('/calcular-interes', (req, res) => {
    const { inversion, meses } = req.body;

    if (isNaN(inversion) || isNaN(meses) || inversion <= 0 || meses <= 0) {
        return res.status(400).json({ error: 'Valores inválidos.' });
    }

    const tasaMensual = 0.02; 

    const montoFinal = inversion * Math.pow((1 + tasaMensual), meses);

    res.json({
        montoFinal: montoFinal.toFixed(2)
    });
});

app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});