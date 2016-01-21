var shortid = require('shortid');
var machines = [];

exports.index = function(req, res, next) {
  var fogo_machines = {fogo_machines: machines};
  res.json(fogo_machines);
  // res.sendFile('/tests/get_machines.json', {'root': '../api_fogo/public'});
};

exports.create = function(req, res, next) {
  var name = req.body.name;
  var ip = req.body.ip;
  var mac = req.body.mac;
  var magic_id = shortid.generate();
  var machine = {name: name, ip: ip, mac: mac, magic_id: magic_id, checked: false};
  machines.push(machine);
  res.json(machine);
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

exports.machines = machines;