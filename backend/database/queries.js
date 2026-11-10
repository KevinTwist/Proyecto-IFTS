const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurno: `${queryBaseSelect} WHERE codigo = @codigo`,
    eliminarTurno: 'DELETE FROM turnos WHERE codigo = @codigo',
};
