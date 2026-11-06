const express = require('express');
const { conectarDB } = require('./database/conexion');

const disponibilidadRouter = require('./routers/disponibilidadRouter');
const backendRouter = require('./routers/backendRouter');
const turnoRouter = require('./routers/turnoRouter');

const app = express();

app.use(express.json());

app.use('/api/test-conexion', backendRouter);
app.use('/api/disponibilidades', disponibilidadRouter);
app.use('/api/turnos', turnoRouter);

const PUERTO = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200);
    console.log("Accediendo a '/'");
    res.send('<h1>¡Bienvenido al servidor del proyecto TurnoExpress!</h1>');
});

app.listen(PUERTO, HOST, () => {
    console.log(`Servidor corriendo en localhost: http://${HOST}:${PUERTO}`);
})

const iniciarBaseDeDatos = async () => {
    try {
        await conectarDB();
    } catch (error) {
        console.log('No se pudo iniciar la base de datos');
    }
};
iniciarBaseDeDatos();
