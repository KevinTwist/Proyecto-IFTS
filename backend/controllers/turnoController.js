const turnoService = require('../services/turnoService');

exports.leerTurnos = async (req, res) => {
    try {
        const resultado = await turnoService.leerTurnos();

        res.status(200).json(resultado);

    } catch (error) {
        console.log('Error en turnoController:', error);
        res.status(500).json({ mensaje: 'Error al obtener los turnos' });
    }
};

exports.buscarTurnos = async (req, res) => {
    try {
        const codigoParam = req.params.codigoTurno;

        const codigoFiltered = await turnoService.buscarTurnos(codigoParam);

        if (codigoFiltered.length === 0) {
            return res.status(404).send(`No se encontró el codigoTurno: ${codigoParam}`);
        }
        res.status(200).json(codigoFiltered);

    } catch (error) {
        console.log('Error en turnoController:', error);
        res.status(500).json({ mensaje: 'Error al buscar el turno' });
    }
};

exports.eliminarTurno = async (req, res) => {
    try {
        const turnoId = Number(req.params.turnoId);

        if (!Number.isInteger(turnoId)) {
            return res.status(400).json({ mensaje: 'El ID del turno debe ser un número entero' });
        }

        const filasEliminadas = await turnoService.eliminarTurno(turnoId);

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: `No se encontró el turno con ID: ${turnoId}` });
        }

        res.status(200).json({ mensaje: 'Turno eliminado correctamente' });

    } catch (error) {
        console.log('Error en turnoController:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el turno' });
    }
};
