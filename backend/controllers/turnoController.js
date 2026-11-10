const turnoService = require('../services/turnoService');

exports.crearTurno = async (req, res) => {
    try {
        const datosTurno = req.body;
        const nuevoTurno = await turnoService.crearTurno(datosTurno);

        res.status(201).json({
            mensaje: 'Turno creado con éxito',
            turno: nuevoTurno
        });

    } catch (error) {
        console.log('Error en turnoController:', error);

        if (error.number === 547 || error.message.includes('FOREIGN KEY')) {
            return res.status(404).json({ 
                mensaje: 'El horario seleccionado no existe.' 
            });
        }

        if (error.message.includes('UNIQUE') || error.number === 2601 || error.code === 'EREQUEST') {
            return res.status(409).json({ 
                mensaje: 'Este horario fue reservado por otro cliente.' 
            });
        }

         

        res.status(500).json({ mensaje: 'Error al crear el turno' });
    }
};

exports.leerTurnos = async (req, res) => {
    try {
        const resultado = await turnoService.leerTurnos();

        res.status(200).json(resultado);

    } catch (error) {
        console.log('Error en turnoController:', error);
        res.status(500).json({ mensaje: 'Error al obtener los turnos' });
    }
};

exports.buscarTurno = async (req, res) => {
    try {
        const codigoParam = req.params.codigoTurno;

        const codigoFiltered = await turnoService.buscarTurno(codigoParam);

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

exports.eliminarTurno = async (req, res) => {
    try {
        const codigoTurno = (req.params.codigo);


        const filasEliminadas = await turnoService.eliminarTurno(codigoTurno);

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: `No se encontró el turno con codigo: ${codigoTurno}` });
        }

        res.status(200).json({ mensaje: 'Turno eliminado correctamente' });

    } catch (error) {
        console.log('Error en turnoController:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el turno' });
    }
};
