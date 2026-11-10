const disponibilidadService = require('../services/disponibilidadService');

exports.obtenerDisponibilidades = async (req, res) => {
    try {
        const resultado = await disponibilidadService.obtenerDisponibilidades();

        res.status(200).json(resultado);

    } catch (error) {
        console.log('Error en disponibilidadController:', error);
        res.status(500).json({ mensaje: 'Error al obtener las disponibilidades' });
    }
};

exports.crearDisponibilidad = async (req, res) => {
    try {
        const disponibilidad = req.body ?? {};

        if (!disponibilidad.date_disponible) {
            return res.status(400).json({
                mensaje: 'Debe enviar date_disponible (ej: 2027-12-01T10:00:00)'
            });
        }

        const resultado = await disponibilidadService.crearDisponibilidad(disponibilidad);

        res.status(201).json({
            mensaje: 'Disponibilidad creada con éxito',
            disponibilidad: resultado
        });

    } catch (error) {
        console.log('Error en disponibilidadController:', error);

        
        if (error.number === 241) {
            return res.status(400).json({
                mensaje: 'La fecha no es válida. Use el formato 2027-12-01T10:00:00'
            });
        }

        res.status(500).json({ mensaje: 'Error al crear la disponibilidad' });
    }
};