const express = require('express');
const turnoController = require('../controllers/turnoController');

const router = express.Router();

router.get('/', turnoController.leerTurnos);
router.get('/:codigoTurno', turnoController.buscarTurnos);
module.exports = router;