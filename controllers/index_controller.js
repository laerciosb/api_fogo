var request = require("request");
var manager_control = require('../controllers/fogo_controllers').manager_control;

exports.increase_buffer = function(req, res, next){
  var id = req.params.id;
  for (var i in manager_control) {
    if (manager_control[i].magic_id == id) {
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
            console.log({error: error});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "increase_buffer_ok"});
};

exports.run_decoder = function(req, res, next){
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
            console.log({error: error});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "run_decoder_ok"});
};

exports.sender = function(req, res, next){
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
            console.log({error: error});
          }
        });
        // console.log("device[" + j + "]: " + JSON.stringify(manager_control[i].machines[j]));
      }
    }
  }

  res.json({response: "sender_ok"});
};