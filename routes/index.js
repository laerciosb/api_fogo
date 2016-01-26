var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index_controller');

/*
  TUTORIAL API ACTIONS TO CONTROL FOGO PLAYER.
*/

router
  /* INCREASE BUFFER with default value in all fogo_machines. */
  .get('/', index_controller.index)

module.exports = router;