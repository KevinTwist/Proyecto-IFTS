const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./database/conexion');

const disponibilidadRouter = require('./routers/disponibilidadRouter');
const backendRouter = require('./routers/backendRouter');
const turnoRouter = require('./routers/turnoRouter');
const eliminarTurno = require('./database/queries');
const router = require('./routers/disponibilidadRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', backendRouter);
app.use('/api', backendRouter);
app.use('/api/disponibilidades', disponibilidadRouter);
app.use('/api/turnos', turnoRouter);


const PUERTO = 3000;
const HOST = '127.0.0.1';


app.listen(PUERTO, HOST, () => {
    console.log(`Servidor corriendo en localhost: http://${HOST}:${PUERTO}`);
})

const iniciarBaseDeDatos = async () => {
    try {
        await conectarDB();
    } catch (error) {
        console.error('No se pudo iniciar la base de datos:', error.message);
    }
};
iniciarBaseDeDatos();