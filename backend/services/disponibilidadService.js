const disponibilidadRepository = require('../repositories/disponibilidadRepository');

exports.obtenerDisponibilidades = async () => {
    const disponibilidades = await disponibilidadRepository.obtenerDisponibilidades();

    return disponibilidades;
};

exports.crearDisponibilidad = async (disponibilidad) => {

    try{
        const respuesta = await disponibilidadRepository.crearDisponibilidad(disponibilidad);
        return respuesta;
        
    } catch (error) {
        console.log('Error en disponibilidadService:', error);
        throw error;
    }

};

exports.eliminarDisponibilidad = async (id) => {

    try {
        const filasEliminadas = await disponibilidadRepository.eliminarDisponibilidad(id);
        return filasEliminadas;

    } catch (error) {
        console.log('Error en disponibilidadService:', error);
        throw error;
    }

};