const { conectarDB } = require('../database/conexion');
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