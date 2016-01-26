var express = require('express');
var router = express.Router();
var fogo_controllers = require('../controllers/fogo_controllers');

/*
  FOGO CONTROLLER ACTIONS TO CONTROL MOBILE.
*/

// BEGIN CONTROLLER CRUD.

router
  /* LIST all fogo_controllers. */
  .get('/', fogo_controllers.index)

  /* READ a fogo_controller. */
  .get('/:id', fogo_controllers.show)

  /* CREATE a fogo_controller. */
  .post('/new', fogo_controllers.create)

  /* PUT a fogo_controller. */
  .put('/:id', fogo_controllers.edit)

  /* DELETE a fogo_controller. */
  .delete('/:id', fogo_controllers.delete)

// END CONTROLLER CRUD.

// BEGIN CONTROLLER ACTIONS.

  /* READ fogo_controller and show your data machines. */
  .get('/:id/machines', fogo_controllers.machines)

  /* SENDING fogo control data to inform the chosen machines. */
  .post('/:id/machines/new', fogo_controllers.new_machine)

    /* INCREASE BUFFER with default value in all fogo_machines. */
  .get('/:id/increase_buffer', fogo_controllers.increase_buffer)

  /* RUN DECODER in all fogo_machines. */
  .get('/:id/run_decoder', fogo_controllers.run_decoder)

  /* SENDER in all fogo_machines. */
  .post('/:id/sender', fogo_controllers.sender)

// END CONTROLLER ACTIONS.

module.exports = router;