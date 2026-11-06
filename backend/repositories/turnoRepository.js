const sql = require('mssql');
const { conectarDB } = require('../database/conexion');
const queries = require('../database/queries');

exports.leerTurnos = async () => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(queries.leerTurnos);

        // para probar resultado
        return resultado.recordset;

    } catch (error) {
        console.log('Error al obtener los turnos', error);
        throw error;
    }
};



exports.buscarTurnos = async (codigo) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('codigo', sql.NVarChar(10), codigo)
            .query(queries.buscarTurnos);

        return resultado.recordset;

    } catch (error) {
        console.log('Error al obtener el turno', error);
        throw error;
    }
};