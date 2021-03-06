var express = require('express');
var router = express.Router();
var fogo_machines = require('../controllers/fogo_machines');

/*
  ACTIONS TO INFORM THE DATA OF FOGO MACHINE.
*/

// BEGIN MACHINE CRUD.

router
  /* LIST all fogo_machines. */
  .get('/', fogo_machines.index)

  /* READ a fogo_machine. */
  .get('/:id', fogo_machines.show)

  /* CREATE a fogo_machine. */
  .post('/new', fogo_machines.create)

  /* PUT a fogo_machine. */
  .put('/:id', fogo_machines.edit)

  /* DELETE a fogo_machine. */
  .delete('/:id', fogo_machines.delete)

// END MACHINE CRUD.

module.exports = router;