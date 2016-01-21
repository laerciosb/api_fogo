var express = require('express');
var router = express.Router();
var fogo_controllers = require('../controllers/fogo_controllers');

/*
  FOGO CONTROLLER ACTIONS TO CONTROL MOBILE.
*/

// BEGIN CONTROLLER CRUD.

router
  /* LIST all fogo_machines. */
  .get('/', fogo_controllers.index)

  /* READ a machine. */
  .get('/:id', fogo_controllers.show)

  /* CREATE a fogo_machine. */
  .post('/new', fogo_controllers.create)

  /* PUT a machine. */
  .put('/:id', fogo_controllers.edit)

  /* DELETE a machine. */
  .delete('/:id', fogo_controllers.delete)

// END CONTROLLER CRUD.

// BEGIN CONTROLLER ACTIONS.

  /* SENDING fogo control data to inform the chosen machines. */
  .post('/machines', fogo_controllers.machines)

// END CONTROLLER ACTIONS.

module.exports = router;