// Constructor
function Control(mac, magic_id) {
  // always initialize all instance properties
  this.mac = mac;
  this.magic_id = magic_id;
}

// class methods
Control.prototype.getMac = function() {
  return this.mac;
};

Control.prototype.setMac = function(mac) {
  this.mac = mac;
};

Control.prototype.getMagic_id = function() {
  return this.magic_id;
};

Control.prototype.setMagic_id = function(magic_id) {
  this.magic_id = magic_id;
};

Control.prototype.showData = function() {
  console.log(this.mac, this.magic_id);
};

// export the class
module.exports = Control;