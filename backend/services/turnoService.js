const turnoRepository = require('../repositories/turnoRepository');

exports.crearTurno = async (datosTurno) => {
    const resultado = await turnoRepository.crearTurno(datosTurno);
    return resultado;
};

exports.leerTurnos = async () => {
    const turnos = await turnoRepository.leerTurnos();

    return turnos;
};

exports.buscarTurno = async (codigo) => {
    const turno = await turnoRepository.buscarTurno(codigo);

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


exports.eliminarTurno = async (codigo) => {
    const filasEliminadas = await turnoRepository.eliminarTurno(codigo);

    return filasEliminadas;
};