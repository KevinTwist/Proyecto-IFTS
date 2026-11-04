const express = require('express');
const { conectarDB } = require('./database/conexion');
const disponibilidadRouter = require('./routers/disponibilidadRouter');
const turnoRouter = require('./routers/turnoRouter');

const app = express();

app.use(express.json());

app.use('/api/disponibilidades', disponibilidadRouter);

app.use('/api/turnos', turnoRouter);

const PUERTO = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200);
    console.log("Accediendo a '/'");
    res.send('<h1>¡Bienvenido al servidor del proyecto TurnoExpress!</h1>');
});

const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PUERTO, HOST, () => {
            console.log(`Servidor corriendo en http://${HOST}:${PUERTO}`);
        });

    } catch (error) {
        console.log('No se pudo iniciar el servidor');
    }
};

iniciarServidor();