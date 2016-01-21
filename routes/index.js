var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index_controller');
var request = require("request");
var manager_control = require('../controllers/fogo_controllers').manager_control;

/*
  API ACTIONS TO CONTROL FOGO PLAYER.
*/

router
  /* INCREASE BUFFER with default value in all fogo_machines. */
  .get('/increase_buffer/:id', index_controller.increase_buffer)

  /* RUN DECODER in all fogo_machines. */
  .get('/run_decoder/:id', index_controller.run_decoder)

  /* SENDER in all fogo_machines. */
  .post('/sender', index_controller.sender)

module.exports = router;