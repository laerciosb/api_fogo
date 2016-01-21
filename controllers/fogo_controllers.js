var shortid = require('shortid');
var controls = [];
var manager_control = [];
var machines = require('../controllers/fogo_machines').machines;

exports.index = function(req, res, next) {
  var fogo_controls = {fogo_controls: controls};
  res.json(fogo_controls);
  // res.sendFile('/tests/get_machines.json', {'root': '../api_fogo/public'});
}

exports.create = function(req, res, next) {
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  var json = {mac : mac, magic_id: magic_id};
  controls.push(json);
  manager_control.push(json);
  res.json(json);
};

exports.machines = function(req, res, next) {
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
};

/* ========================= TO DO ============================ */

exports.show = function(req, res, next) {
  res.json({response: "ok"});
};
exports.edit = function(req, res, next) {
  res.json({response: "ok"});
};
exports.delete = function(req, res, next) {
  res.json({response: "ok"});
};

exports.manager_control = manager_control;