var Machine = require('../models/machine');
var shortid = require('shortid');
var machines = [];

exports.index = function(req, res, next) {
  // var fogo_machines = {fogo_machines: machines};
  // res.json(fogo_machines);
  res.sendFile('/tests/get_machines.json', {'root': '../api_fogo/public'});
};

exports.create = function(req, res, next) {
  var name = req.body.name;
  var ip = req.body.ip;
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  // var machine = {name: name, ip: ip, mac: mac, magic_id: magic_id, checked: false};
  var machine = false;
  for(var i in machines){
    if(machines[i].mac == mac){
      machine = machines[i];
    }
  }
  if(machine){
    res.json(machine);
  } else {
    var machine = new Machine(name, ip, mac, magic_id);
    machine.showData();
    machines.push(machine);
    res.json(machine);
  }
};

exports.show = function(req, res, next) {
  var magic_id = req.params.id;
  var machine = false;
  for(var i in machines){
    if(machines[i].magic_id == magic_id){
      machine = machines[i];
    }
  }
  if(machine){
    res.json(machine);
  } else {
    res.json({response: "Não foi possível encontrar o PC-Fogo pelo id informado."});
  }
};

exports.edit = function(req, res, next) {
  var magic_id = req.params.id;
  var mac = req.body.mac;
  var new_name = req.body.new_name;
  var new_ip = req.body.new_ip;
  var new_mac = req.body.new_mac;
  var machine = false;
  for(var i in machines){
    if(machines[i].magic_id == magic_id && machines[i].mac == mac){
      machines[i].name = new_name;
      machines[i].ip = new_ip;
      machines[i].mac = new_mac;
      machine = machines[i];
    }
  }
  if(machine){
    res.json(machine);
  } else {
    res.json({response: "Não foi possível encontrar o PC-Fogo pelo id informado."});
  }
};

exports.delete = function(req, res, next) {
  var magic_id = req.params.id;
  var machine = false;
  for(var i in machines){
    if(machines[i].magic_id == magic_id){
      machine = machines.splice(i,1);
    }
  }
  if(machine){
    res.json(machine);
  } else {
    res.json({response: "Não foi possível encontrar o PC-Fogo pelo id informado."});
  }
};

exports.machines = machines;