const turnoRepository = require('../repositories/turnoRepository');

exports.crearTurno = async (datosTurno) => {
    const resultado = await turnoRepository.crearTurno(datosTurno);
    return resultado;
};

exports.leerTurnos = async () => {
    const turnos = await turnoRepository.leerTurnos();

    return turnos;
};

exports.buscarTurno = async (turnoId) => {
    const turno = await turnoRepository.buscarTurno(turnoId);

    return turno;
};

exports.eliminarTurno = async (turnoId) => {
    const filasEliminadas = await turnoRepository.eliminarTurno(turnoId);

    return filasEliminadas;
};