const queryBaseSelect = `SELECT
    t.turno_id, t.codigo, t.nombre, t.id_disponibilidad, t.created_at,
    CONVERT(CHAR(10), d.date_disponible, 23) AS fecha,
    CONVERT(CHAR(5), d.date_disponible, 108) AS hora
    FROM turnos t
    INNER JOIN disponibilidad d ON d.id_disponibilidad = t.id_disponibilidad`;

const queryDisponibilidadesLibres = `SELECT
    d.id_disponibilidad, d.date_disponible
    FROM disponibilidad d
    LEFT JOIN turnos t ON t.id_disponibilidad = d.id_disponibilidad
    WHERE t.turno_id IS NULL
    ORDER BY d.date_disponible`;

const queryCrearTurno = `INSERT INTO turnos
    (codigo, nombre, id_disponibilidad)
    VALUES (@codigo, @nombre, @idDisponibilidad);

    SELECT SCOPE_IDENTITY() AS turno_id;`;

module.exports = {
    leerDisponibilidadesLibres: queryDisponibilidadesLibres,
    crearTurno: queryCrearTurno,
    leerTurnos: queryBaseSelect,
    buscarTurno: `${queryBaseSelect} WHERE t.codigo = @codigo`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo'
}




