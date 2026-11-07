const { conectarDB } = require('../database/conexion');

exports.obtenerDisponibilidades = async () => {
    try {
        const pool = await conectarDB();

        // Formateamos en SQL para respetar la hora tal cual está guardada,
        // sin que el driver la interprete como UTC y reste la zona horaria.
        const resultado = await pool.request().query(`
            SELECT
                id_disponibilidad,
                date_disponible,
                CONVERT(varchar(10), date_disponible, 23) AS FECHA,
                CONVERT(varchar(5), date_disponible, 108) AS HORA
            FROM disponibilidad
        `);

        return resultado.recordset;

    } catch (error) {
        console.log('Error al obtener las disponibilidades:', error);
        throw error;
    }
};