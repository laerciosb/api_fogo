var Control = require('../models/control');
var shortid = require('shortid');
var request = require("request");
var machines = require('../controllers/fogo_machines').machines;
var controls = [];
var manager_control = [];

exports.index = function(req, res, next) {
  var fogo_controllers = {fogo_controllers: controls};
  res.json(fogo_controllers);
  // res.sendFile('/tests/get_controllers.json', {'root': '../api_fogo/public'});
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
    var manager = new Control(mac, magic_id);
    manager_control.push(manager);
    res.json(control);
  }
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

exports.machines = function(req, res, next) {
  var magic_id = req.params.id;

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      response = manager_control[i];
    }
  }
  
  res.json(manager_control);
};

exports.new_machine = function(req, res, next) {
  var magic_id = req.params.id;
  var machines = req.body.fogo_machines;
  var response;

  var objects = [];
  for (var i in machines) {
    if (machines[i].checked) {
      objects.push(machines[i]);
    }
  }

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      manager_control[i].fogo_machines = objects;
      response = manager_control[i];
    }
  }

  res.json(response);
};

exports.run_ptp = function(req, res, next){
  var magic_id = req.params.id;
  var status = req.params.status;
  var url = {url: "false"};

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      for (var j in manager_control[i].fogo_machines){
        var ip = manager_control[i].fogo_machines[j].ip;
        url = "http://" + ip + ":5000/run_ptp/" + status;
        //Load the request module and send information to fogo machines.
        request({
          uri: url,
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            console.log({error: error});
          }
        });
        // // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].fogo_machines[j]));
      }
    }
  }

  res.json({url: url});
};

exports.increase_buffer = function(req, res, next){
  var magic_id = req.params.id;
  var status = req.params.status;
  var url = {url: "false"};

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      for (var j in manager_control[i].fogo_machines){
        var ip = manager_control[i].fogo_machines[j].ip;
        url = "http://" + ip + ":5000/increase_buffer/" + status;
        //Load the request module and send information to fogo machines.
        request({
          uri: url,
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            console.log({error: error});
          }
        });
        // // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].fogo_machines[j]));
      }
    }
  }

  res.json({url: url});
};

exports.run_decoder = function(req, res, next){
  var magic_id = req.params.id;
  var status = req.params.status;
  var url = {url: "false"};

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      for (var j in manager_control[i].fogo_machines){
        var ip = manager_control[i].fogo_machines[j].ip;
        url = "http://" + ip + ":5000/run_decoder/" + status;
        //Load the request module and send information to fogo machines.
        request({
          uri: url,
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            console.log({error: error});
          }
        });
        // // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].fogo_machines[j]));
      }
    }
  }

  res.json({url: url});
};

exports.sender = function(req, res, next){
  var magic_id = req.params.id;
  var status = req.params.status;
  var address = req.body.address;
  var json = {address: address};
  var url = {url: "false"};

  for (var i in manager_control) {
    if (manager_control[i].magic_id == magic_id) {
      for (var j in manager_control[i].fogo_machines){
        var ip = manager_control[i].fogo_machines[j].ip;
        url = "http://" + ip + ":5000/sender/" + status;
        //Load the request module and send information to fogo machines.
        request({
          uri: url,
          method: "GET",
          headers: {
            'Content-type' : 'application/json'
          }
        }, function(error, response, body) {
          if(error){
            console.log({error: error});
          }
        });
        // // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].fogo_machines[j]));
      }
    }
  }
  res.json({url: url});
};