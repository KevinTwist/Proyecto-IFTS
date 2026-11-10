const express = require('express');
const turnoController = require('../controllers/turnoController');

const router = express.Router();

router.post('/', turnoController.crearTurno);

router.get('/', turnoController.leerTurnos);
router.get('/:codigoTurno', turnoController.buscarTurno);
router.delete('/:codigo', turnoController.eliminarTurno);
router.patch('/:codigoTurno', turnoController.editarTurno);
module.exports = router;
