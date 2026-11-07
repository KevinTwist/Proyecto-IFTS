const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurno: `${queryBaseSelect} WHERE turno_id = @turno_id`,
    eliminarTurno: 'DELETE FROM turnos WHERE turno_id = @turno_id',
};
