const express = require('express');
const disponibilidadController = require('../controllers/disponibilidadController');

const router = express.Router();

router.get('/', disponibilidadController.obtenerDisponibilidades);

router.post("/create", disponibilidadController.crearDisponibilidad);

router.delete("/delete/:id", disponibilidadController.eliminarDisponibilidad);

module.exports = router;