const express = require('express');
const app = express();

const PUERTO = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200)
    console.log("Accediendo a '/' ");
    res.send('<h1>¡Bienvenido al servidor del proyecto TurnoExpress!</h1>');
})
app.listen(PUERTO, HOST, () => {
    console.log(`Servidor corriendo en localhost: http://${HOST}:${PUERTO}`);
})