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
    AND d.date_disponible > GETDATE()
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
    buscarTurno: `${queryBaseSelect} WHERE t.codigo = @codigo`,
    
    crearDisponibilidad: `INSERT INTO disponibilidad (date_disponible)
        VALUES (CAST(@date_disponible AS DATETIME2));

        SELECT SCOPE_IDENTITY() AS id_disponibilidad;`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo',
    eliminarDisponibilidad: 'DELETE FROM disponibilidad WHERE id_disponibilidad = @id'
}




