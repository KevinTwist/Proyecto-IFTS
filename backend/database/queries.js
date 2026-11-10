const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    crearTurno: `INSERT INTO turnos (codigo, nombre, id_disponibilidad)
                VALUES (@codigo, @nombre, @idDisponibilidad);
                SELECT SCOPE_IDENTITY() AS turno_id;`,
    buscarTurno: `${queryBaseSelect} WHERE codigo = @codigo`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo',
};
