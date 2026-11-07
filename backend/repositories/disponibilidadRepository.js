const { conectarDB } = require('../database/conexion');

exports.obtenerDisponibilidades = async () => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(`
            SELECT d.id_disponibilidad, d.date_disponible
            FROM disponibilidad d
            LEFT JOIN turnos t ON t.id_disponibilidad = d.id_disponibilidad
            WHERE t.turno_id IS NULL
            ORDER BY d.date_disponible
        `);

        return resultado.recordset.map(item => ({
            id_disponibilidad: item.id_disponibilidad,
            FECHA: item.date_disponible.toISOString().split('T')[0],
            HORA: item.date_disponible.toISOString().split('T')[1].substring(0, 5)
        }));

    } catch (error) {
        console.log('Error al obtener las disponibilidades:', error);
        throw error;
    }
};