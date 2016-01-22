var Control = require('../models/control');
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
  // var control = {mac : mac, magic_id: magic_id};
  var control = false;
  for(var i in controls){
    if(controls[i].mac == mac){
      control = controls[i];
    }
  }
  if(control){
    res.json(control);
  } else {
    var control = new Control(mac, magic_id);
    control.showData();
    controls.push(control);
    manager_control.push(control);
    res.json(control);
  }
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

exports.show = function(req, res, next) {
  var magic_id = req.params.id;
  var control = false;
  for(var i in controls){
    if(controls[i].magic_id == magic_id){
      control = controls[i];
    }
  }
  if(control){
    res.json(control);
  } else {
    res.json({response: "Não foi possível encontrar o controle pelo id informado."});
  }
};
exports.edit = function(req, res, next) {
  var magic_id = req.params.id;
  var mac = req.body.mac;
  var new_mac = req.body.new_mac;
  var control = false;
  for(var i in controls){
    if(controls[i].magic_id == magic_id && controls[i].mac == mac){
      controls[i].mac = new_mac;
      control = controls[i];
    }
  }
  if(control){
    res.json(control);
  } else {
    res.json({response: "Não foi possível encontrar o controle pelo id informado."});
  }
};
exports.delete = function(req, res, next) {
  var magic_id = req.params.id;
  var control = false;
  for(var i in controls){
    if(controls[i].magic_id == magic_id){
      control = controls.splice(i,1);
    }
  }
  if(control){
    res.json(control);
  } else {
    res.json({response: "Não foi possível encontrar o controle pelo id informado."});
  }
};

exports.manager_control = manager_control;