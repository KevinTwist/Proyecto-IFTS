const express = require('express');
const router = express.Router();
const { conectarDB } = require('./database/conexion');

router.get('/', (req, res) => {
    res.status(200)
    console.log("Accediendo a '/' ");
    res.send('<h1>¡Bienvenido al servidor del proyecto TurnoExpress!</h1>');
})

router.get('/api/test-conexion', async (req, res) => {
    try {
        const pool = await conectarDB();
        const resultado = await pool.request().query('SELECT GETDATE() AS FechaActual');

        res.status(200).json({
            mensaje: "¡Conexión exitosa entre Express y SQL Server!",
            fechaServidorBD: resultado.recordset[0].FechaActual
        });
    } catch (error) {
        res.status(500).json({
            error: "No se pudo establecer la conexión con la base de datos",
            detalle: error.message
        });
    }
});

module.exports = router;