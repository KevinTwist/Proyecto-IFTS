const queryBaseSelect = 'SELECT * FROM turnos'

const queryDisponibilidadesLibres = `SELECT
    d.id_disponibilidad, d.date_disponible
    FROM disponibilidad d
    LEFT JOIN turnos t ON t.id_disponibilidad = d.id_disponibilidad
    WHERE t.turno_id IS NULL
    ORDER BY d.date_disponible`;

module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurnos: `${queryBaseSelect} WHERE codigo = @codigo`,
    leerDisponibilidadesLibres: queryDisponibilidadesLibres,
    crearTurno: `INSERT INTO turnos (codigo, nombre, id_disponibilidad)
                VALUES (@codigo, @nombre, @idDisponibilidad);
                SELECT SCOPE_IDENTITY() AS turno_id;`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo',
}




