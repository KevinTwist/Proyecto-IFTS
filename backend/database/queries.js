const queryBaseSelect = 'SELECT * FROM turnos'




module.exports = {
    leerTurnos: queryBaseSelect,
    buscarTurnos: `${queryBaseSelect} WHERE codigo = @codigo`,
     
editarTurno: `
    UPDATE turnos
    SET
        codigo = COALESCE(@nuevoCodigo, codigo),
        nombre = COALESCE(@nombre, nombre),
        id_disponibilidad = COALESCE(@idDisponibilidad, id_disponibilidad)
    WHERE codigo = @codigoActual;
`,

};
