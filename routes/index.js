var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controls = [];
var devices = [];
var fogo_control = [];

/*
  ANDROID ACTIONS
*/

/* GET fogo_control adding for control mobile. */
router.get('/fogo_control/:id', function(req, res, next) {
  var mac = req.params.id;
  var magic_id = shortid.generate();
  var json = {mac : mac, magic_id: magic_id};
  controls.push(json);
  fogo_control.push({id: magic_id});
  console.log("fogo_control: " + JSON.stringify(fogo_control));
  res.json(json);
});

/* GET devices list show fogo machines. */
router.get('/devices', function(req, res) {
  res.sendFile('/tests/devices.json', {'root': '../api_fogo/public'});
});

router.put('/devices/:id', function(req, res) {
  var id = req.params.id;
  var identification = req.body.id;
  var devices = req.body.devices;

  var objects = [];
  for (var i in devices) {
    if (devices[i].checked) {
      objects.push(devices[i]);
    }
  }

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      fogo_control[i].devices = objects;
    }
  }

  console.log("fogo_control: " + JSON.stringify(fogo_control));
  res.json(fogo_control);
});

/*
  API ACTIONS
*/



/*
  FOGO ACTIONS
*/

/* GET fogo_machine adding for control mobile. */
router.post('/fogo_machine', function(req, res, next) {
  var mac = req.params.id;
  var magic_id = shortid.generate();
  var json = {mac : mac, magic_id: magic_id};
  devices.push(json);
  res.json(json);
});

module.exports = router;
