const turnoRepository = require('../repositories/turnoRepository');

const generarCodigo = () =>
    Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0');

exports.crearTurno = async (datosTurno) => {
    const codigo = generarCodigo();
    const nombre = `${datosTurno.nombre ?? ''} ${datosTurno.apellido ?? ''}`.trim();

    const resultado = await turnoRepository.crearTurno(
        codigo,
        nombre,
        datosTurno.id_disponibilidad
    );
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


exports.editarTurno = async (codigoActual, nombre, idDisponibilidad) => {
    const nuevoCodigo = idDisponibilidad !== undefined ? generarCodigo() : null;

    const filasAfectadas = await turnoRepository.editarTurno(
        codigoActual,
        nuevoCodigo,
        nombre,
        idDisponibilidad
    );

    if (filasAfectadas === 0) {
        return null; 
    }

    return { codigo: nuevoCodigo ?? codigoActual };
};

exports.eliminarTurno = async (codigo) => {
    const filasEliminadas = await turnoRepository.eliminarTurno(codigo);

    return filasEliminadas;
};