var express = require('express');
var router = express.Router();
var request = require("request");
var shortid = require('shortid');
var controls = [];
var machines = [];
var manager_control = [];

/*
  FOGO CONTROLLER ACTIONS TO CONTROL MOBILE.
*/

// BEGIN CONTROLLER CRUD.

/* CREATE a control. */
router.post('/fogo_controller', function(req, res, next) {
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  var json = {mac : mac, magic_id: magic_id};
  controls.push(json);
  manager_control.push(json);
  res.json(json);
});

/* LIST all controls. */
router.get('/fogo_controllers', function(req, res, next) {
  var fogo_controllers = {fogo_controllers: controls};
  res.json(fogo_controllers);
  // res.sendFile('/tests/get_controllers.json', {'root': '../api_fogo/public'});
});

/* ========================= TO DO ============================

// READ a control.
router.get('/fogo_controller/:id', function(req, res, next) {
  res.json({response: "ok"});
});

// PUT a control.
router.put('/fogo_controller/:id', function(req, res, next) {
  res.json({response: "ok"});
});

// DELETE a control.
router.delete('/fogo_controller/:id', function(req, res, next) {
  res.json({response: "ok"});
});

*/

// END CONTROLLER CRUD.

// BEGIN CONTROLLER ACTIONS.

/* SENDING fogo control data to inform the chosen machines. */
router.post('/fogo_controller/machines', function(req, res, next) {
  var id = req.body.id;
  var machines = req.body.machines;
  var response;

  var objects = [];
  for (var i in machines) {
    if (machines[i].checked) {
      objects.push(machines[i]);
    }
  }

  for (var i in manager_control) {
    if (manager_control[i].magic_id == id) {
      manager_control[i].machines = objects;
      response = manager_control[i];
    }
  }

  res.json(response);
});

// END CONTROLLER ACTIONS.

/*
  ACTIONS TO INFORM THE DATA OF FOGO MACHINE.
*/

// BEGIN MACHINE CRUD.

/* CREATE a fogo_machine. */
router.post('/fogo_machine', function(req, res, next) {
  var name = req.body.name;
  var ip = req.body.ip;
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  var machine = {name: name, ip: ip, mac: mac, magic_id: magic_id, checked: false};
  machines.push(machine);
  res.json(machine);
});

/* LIST all fogo_machines. */
router.get('/fogo_machines', function(req, res) {
  var fogo_machines = {fogo_machines: machines};
  res.json(fogo_machines);
  // res.sendFile('/tests/get_machines.json', {'root': '../api_fogo/public'});
});

/* ========================= TO DO ============================

// READ a machine.
router.get('/fogo_machine/:id', function(req, res, next) {
  res.json({response: "ok"});
});

// PUT a machine.
router.put('/fogo_machine/:id', function(req, res, next) {
  res.json({response: "ok"});
});

// DELETE a machine.
router.delete('/fogo_machine/:id', function(req, res, next) {
  res.json({response: "ok"});
});

*/

// END MACHINE CRUD.

/*
  API ACTIONS TO CONTROL FOGO PLAYER.
*/

/* INCREASE BUFFER with default value in all fogo_machines. */
router.get('/increase_buffer/:id', function(req, res, next){
  var id = req.params.id;

  for (var i in manager_control) {
    if (manager_control[i].id == id) {
      for (var j in manager_control[i].machines){
        var ip = manager_control[i].machines[j].ip;
        //Load the request module and send information to fogo machines.
        request({
          uri: "http://" + ip + ":8888/increase_buffer",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "increase_buffer_ok"});
});

/* RUN DECODER in all fogo_machines. */
router.get('/run_decoder/:id', function(req, res, next){
  var id = req.params.id;

  for (var i in manager_control) {
    if (manager_control[i].id == id) {
      for (var j in manager_control[i].machines){
        var ip = manager_control[i].machines[j].ip;
        //Load the request module and send information to fogo machines.
        request({
          uri: "http://" + ip + ":8888/run_decoder",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "run_decoder_ok"});
});

/* SENDER in all fogo_machines. */
router.post('/sender', function(req, res, next){
  var id = req.body.id;
  var address = req.body.address;
  var json = {address: address};

  for (var i in manager_control) {
    if (manager_control[i].id == id) {
      for (var j in manager_control[i].machines){
        var ip = manager_control[i].machines[j].ip;
        //Load the request module and send information to fogo machines.
        request({
          uri: "http://" + ip + ":8888/sender",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "sender_ok"});
});

module.exports = router;