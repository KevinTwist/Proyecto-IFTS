const express = require('express');
const disponibilidadController = require('../controllers/disponibilidadController');

const router = express.Router();

router.get('/', disponibilidadController.obtenerDisponibilidades);

router.post("/create", disponibilidadController.agregarDisponibilidad);

module.exports = router;