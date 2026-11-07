const sql = require('mssql');
const { conectarDB } = require('../database/conexion');
const queries = require('../database/queries');

exports.crearTurno = async (datosTurno) => {
    try {
        const pool = await conectarDB();

        const codigo = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0');
        const nombre = `${datosTurno.nombre ?? ''} ${datosTurno.apellido ?? ''}`.trim();

        const resultado = await pool.request()
            .input('codigo', sql.NVarChar(10), codigo)
            .input('nombre', sql.NVarChar(20), nombre)
            .input('idDisponibilidad', sql.Int, datosTurno.id_disponibilidad)
            .query(`
                INSERT INTO turnos (codigo, nombre, id_disponibilidad)
                VALUES (@codigo, @nombre, @idDisponibilidad);
                SELECT SCOPE_IDENTITY() AS turno_id;
            `);

        return {
            turno_id: resultado.recordset[0]?.turno_id,
            codigo,
            nombre,
            id_disponibilidad: datosTurno.id_disponibilidad
        };

    } catch (error) {
        console.log('Error en turnoRepository (SQL Server):', error);
        throw error;
    }
};

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