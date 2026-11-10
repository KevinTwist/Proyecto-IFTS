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
            .query(
                queries.crearTurno
            );

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



exports.buscarTurno = async (codigo) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('codigo',sql.NVarChar(10), codigo)
            .query(queries.buscarTurno);

        return resultado.recordset;

    } catch (error) {
        console.log('Error al obtener el turno', error);
        throw error;
    }
};


exports.editarTurno = async (codigoActual, nuevoCodigo, nombre, idDisponibilidad) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('codigoActual', sql.NVarChar(10), codigoActual)
            .input('nuevoCodigo', sql.NVarChar(10), nuevoCodigo ?? null)
            .input('nombre', sql.NVarChar(20), nombre ?? null)
            .input('idDisponibilidad', sql.Int, idDisponibilidad ?? null)
            .query(queries.editarTurno);

        return resultado.rowsAffected[0];

    } catch (error) {
        console.log('Error al editar el turno', error);
        throw error;
    }
};


exports.eliminarTurno = async (codigo) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('codigo',sql.NVarChar(10), codigo)
            .query(queries.eliminarTurno);

        return resultado.rowsAffected[0];

    } catch (error) {
        console.log('Error al eliminar el turno', error);
        throw error;
    }
};