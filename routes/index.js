var express = require('express');
var router = express.Router();
var request = require("request");
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
  // console.log("fogo_control: " + JSON.stringify(fogo_control));
  res.json(json);
});

/* GET devices list show fogo machines. */
router.get('/devices', function(req, res) {
  // var machines = {devices: devices};
  // res.json(machines);
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

  // console.log("fogo_control: " + JSON.stringify(fogo_control));
  res.json(fogo_control);
});

/*
  API ACTIONS
*/

router.get('/increase_buffer/:id', function(req, res, next){
  var id = req.params.id;

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.
        //Load the request module
        request({
          uri: "http://127.0.0.1:3000/increase_buffer",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(fogo_control[i].devices[j]));
      }
    }
  }

  res.json({response: "ok"});
});

router.get('/run_decoder/:id', function(req, res, next){
  var id = req.params.id;

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.
        //Load the request module
        request({
          uri: "http://127.0.0.1:3000/run_decoder",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(fogo_control[i].devices[j]));
      }
    }
  }

  res.json({response: "ok"});
});

router.get('/sender/:id/:address', function(req, res, next){
  var id = req.params.id;
  var address = req.params.address;
  var json = {address: address};

  for (var i in fogo_control) {
    if (fogo_control[i].id == id) {
      for (var j in fogo_control[i].devices){
        //send information to fogo machines.
        //Load the request module
        request({
          uri: "http://127.0.0.1:3000/sender",
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            res.json({response: "error"});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(fogo_control[i].devices[j]));
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