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
  .get('/machines/:id', fogo_controllers.manager)

  /* SENDING fogo control data to inform the chosen machines. */
  .post('/machines', fogo_controllers.machines)

// END CONTROLLER ACTIONS.

module.exports = router;