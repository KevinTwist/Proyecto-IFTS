const turnoRepository = require('../repositories/turnoRepository');

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