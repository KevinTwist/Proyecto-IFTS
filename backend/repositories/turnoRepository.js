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



exports.buscarTurno = async (turnoId) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('turno_id', sql.Int, turnoId)
            .query(queries.buscarTurno);

        return resultado.recordset;

    } catch (error) {
        console.log('Error al obtener el turno', error);
        throw error;
    }
};

exports.eliminarTurno = async (turnoId) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('turno_id', sql.Int, turnoId)
            .query(queries.eliminarTurno);

        return resultado.rowsAffected[0];

    } catch (error) {
        console.log('Error al eliminar el turno', error);
        throw error;
    }
};