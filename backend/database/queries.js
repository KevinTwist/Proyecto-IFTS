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
    leerTurnos: queryBaseSelect,
    buscarTurno: `${queryBaseSelect} WHERE codigo = @codigo`,
     
editarTurno: `
    UPDATE turnos
    SET
        codigo = COALESCE(@nuevoCodigo, codigo),
        nombre = COALESCE(@nombre, nombre),
        id_disponibilidad = COALESCE(@idDisponibilidad, id_disponibilidad)
    WHERE codigo = @codigoActual;
`,

    leerDisponibilidadesLibres: queryDisponibilidadesLibres,
    crearTurno: queryCrearTurno,
    leerTurnos: queryBaseSelect,
    buscarTurno: `${queryBaseSelect} WHERE codigo = @codigo`,
    
    crearDisponibilidad: `INSERT INTO disponibilidad (date_disponible)
        VALUES (CAST(@date_disponible AS DATETIME2));

        SELECT SCOPE_IDENTITY() AS id_disponibilidad;`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo'
}




