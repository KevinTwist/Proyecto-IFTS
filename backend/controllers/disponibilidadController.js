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