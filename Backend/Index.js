const express = require('express');
const { conectarDB } = require('./database/conexion');
const backendRouter = require('.routers/backendRouter');
const app = express();

const PUERTO = 3000;
const HOST = '127.0.0.1';

app.use('/', backendRouter);
app.use('/api/test-conexion', backendRouter);

app.listen(PUERTO, HOST, () => {
    console.log(`Servidor corriendo en localhost: http://${HOST}:${PUERTO}`);
})