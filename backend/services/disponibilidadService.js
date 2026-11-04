const disponibilidadRepository = require('../repositories/disponibilidadRepository');

exports.obtenerDisponibilidades = async () => {
    const disponibilidades = await disponibilidadRepository.obtenerDisponibilidades();

    return disponibilidades;
};