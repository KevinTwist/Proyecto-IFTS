const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurnos: `${queryBaseSelect} WHERE codigo = @codigo`,
};
