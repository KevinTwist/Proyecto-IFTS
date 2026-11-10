const queryBaseSelect = 'SELECT * FROM turnos';

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
    buscarTurno: `${queryBaseSelect} WHERE codigo = @codigo`,
    agregarDisponibilidad: 'INSERT INTO disponibilidad (date_disponible) VALUES (@date_disponible);',
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo'
}




