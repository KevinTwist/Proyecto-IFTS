const { conectarDB } = require('../database/conexion');

exports.obtenerDisponibilidades = async () => {
    try {
        const pool = await conectarDB();

        const resultado = await pool.request().query(
            'SELECT * FROM Disponibilidades'
        );

        // Mapeamos los resultados para limpiar el formato de fecha y hora
        const disponibilidadesFormateadas = resultado.recordset.map(item => {
            return {
                ...item,
                // Si FECHA existe, extraemos solo la parte de la fecha (YYYY-MM-DD)
                FECHA: item.FECHA ? item.FECHA.toISOString().split('T')[0] : null,
                
                // Si HORA existe, extraemos solo la parte de la hora (HH:mm)
                // (Asumiendo que SQL te devuelve un objeto Date para la hora)
                HORA: item.HORA ? item.HORA.toISOString().split('T')[1].substring(0, 5) : null
            };
        });

        return disponibilidadesFormateadas;

    } catch (error) {
        console.log('Error al obtener las disponibilidades:', error);
        throw error;
    }
};