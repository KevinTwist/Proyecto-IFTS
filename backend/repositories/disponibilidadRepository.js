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

exports.agregarDisponibilidad = async (disponibilidad) => {

    const pool = await conectarDB();

    try {

        const { date_disponible } = disponibilidad;

        const resultado = await pool.request()
        .input('date_disponible', sql.DateTime2, date_disponible)
        .query(queries.agregarDisponibilidad);

        return resultado.recordset;

    } catch (error) {
        console.log('Error en disponibilidadRepository:', error);
        throw error;
    }
    
};