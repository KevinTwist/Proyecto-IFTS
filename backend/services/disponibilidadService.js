const disponibilidadRepository = require('../repositories/disponibilidadRepository');

exports.obtenerDisponibilidades = async () => {
    const disponibilidades = await disponibilidadRepository.obtenerDisponibilidades();

    return disponibilidades;
};

exports.agregarDisponibilidad = async (disponibilidad) => {

    try{
        const respuesta = await disponibilidadRepository.agregarDisponibilidad(disponibilidad);
        return respuesta;
        
    } catch (error) {
        console.log('Error en disponibilidadService:', error);
        throw error;
    }

};