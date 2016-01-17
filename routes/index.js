var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controls = [];
var devices = [];
var fogo_control = [];

/*
  ANDROID ACTIONS
*/

/* GET fogo_control adding to control mobile. */
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
  res.sendFile('/tests/get_devices.json', {'root': '../api_fogo/public'});
});

/* PUT device data to list the checked machines. */
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

router.get('/:id/increase_buffer/:value', function(req, res, next){
  var id = req.params.id;
  var value = req.params.value;
  var json = {value: value};

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.

      }
    }
  }

  res.json({response: "ok"});
});

router.get('/:id/run_decoder', function(req, res, next){
  var id = req.params.id;

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.

      }
    }
  }

  res.json({response: "ok"});
});

router.get('/:id/sender/:address', function(req, res, next){
  var id = req.params.id;
  var address = req.params.address;
  var json = {address: address};

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.

      }
    }
  }

  res.json({response: "ok"});
});

/*
  FOGO ACTIONS
*/

/* GET fogo_machine adding to control mobile. */
router.post('/fogo_machine', function(req, res, next) {
  var name = req.body.name;
  var ip = req.body.ip;
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  var json = {name: name, ip: ip, mac: mac, magic_id: magic_id, checked: false};
  devices.push(json);
  // res.json(json);
  res.json({response: "ok"});
});

module.exports = router;
