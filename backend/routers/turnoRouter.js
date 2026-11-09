const express = require('express');
const turnoController = require('../controllers/turnoController');

const router = express.Router();

router.post('/', turnoController.crearTurno);

router.get('/', turnoController.leerTurnos);
router.get('/:codigoTurno', turnoController.buscarTurno);
router.delete('/:turnoId', turnoController.eliminarTurno);
module.exports = router;