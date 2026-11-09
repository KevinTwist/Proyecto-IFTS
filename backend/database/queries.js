const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurnos: `${queryBaseSelect} WHERE codigo = @codigo`,
    agregarDisponibilidad: 'INSERT INTO disponibilidad (date_disponible) VALUES (@date_disponible);'
};
