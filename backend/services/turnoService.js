const turnoRepository = require('../repositories/turnoRepository');

exports.leerTurnos = async () => {
    const turnos = await turnoRepository.leerTurnos();

    return turnos;
};

exports.buscarTurnos = async (codigo) => {
    const turno = await turnoRepository.buscarTurnos(codigo);

    return turno;
};


exports.editarTurno = async (codigoActual, nuevoCodigo, nombre, idDisponibilidad) => {
    const resultado = await turnoRepository.editarTurno(
        codigoActual,
        nuevoCodigo,
        nombre,
        idDisponibilidad
    );

    return resultado;
};
