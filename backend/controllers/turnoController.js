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


exports.editarTurno = async (req, res) => {
    try {
        const codigoActual = req.params.codigoTurno;
        const { nuevoCodigo, nombre, idDisponibilidad } = req.body;

        if (
            nuevoCodigo === undefined &&
            nombre === undefined &&
            idDisponibilidad === undefined
        ) {
            return res.status(400).json({
                mensaje: 'Debe enviar al menos un dato para modificar'
            });
        }

        const resultado = await turnoService.editarTurno(
            codigoActual,
            nuevoCodigo,
            nombre,
            idDisponibilidad
        );

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'No se encontró el turno'
            });
        }

        res.status(200).json({
            mensaje: 'Turno editado correctamente'
        });

    } catch (error) {
        console.log('Error al editar el turno:', error);
        res.status(500).json({
            mensaje: 'Error al editar el turno'
        });
    }
};
