const { conectarDB } = require('../database/conexion');
const sql = require('mssql');
const queries = require('../database/queries');

exports.obtenerDisponibilidades = async () => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(queries.leerDisponibilidadesLibres);

        return resultado.recordset.map(item => ({
            id_disponibilidad: item.id_disponibilidad,
            fecha: item.date_disponible.toISOString().split('T')[0],
            hora: item.date_disponible.toISOString().split('T')[1].substring(0, 5)
        }));

    } catch (error) {
        console.log('Error al obtener las disponibilidades:', error);
        throw error;
    }
};

exports.crearDisponibilidad = async (disponibilidad) => {

    const pool = await conectarDB();

    try {

        const { date_disponible } = disponibilidad;

        const resultado = await pool.request()
        .input('date_disponible', sql.NVarChar(30), date_disponible)
        .query(queries.crearDisponibilidad);

        return {
            id_disponibilidad: resultado.recordset[0]?.id_disponibilidad,
            date_disponible
        };

    } catch (error) {
        console.log('Error en disponibilidadRepository:', error);
        throw error;
    }
    
};

exports.eliminarDisponibilidad = async (id) => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query(queries.eliminarDisponibilidad);

        return resultado.rowsAffected[0];

    } catch (error) {
        console.log('Error en disponibilidadRepository:', error);
        throw error;
    }
};