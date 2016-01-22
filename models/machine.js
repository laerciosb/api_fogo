// Constructor
function Machine(name, ip, mac, magic_id) {
  // always initialize all instance properties
  this.name = name;
  this.ip = ip;
  this.mac = mac;
  this.magic_id = magic_id;
  this.checked = false; // default value
}

// class methods
Machine.prototype.getName = function() {
  return this.name;
};

Machine.prototype.setName = function(name) {
  this.name = name;
};

Machine.prototype.getIP = function() {
  return this.ip;
};

Machine.prototype.setIP = function(ip) {
  this.ip = ip;
};

Machine.prototype.getMac = function() {
  return this.mac;
};

Machine.prototype.setMac = function(mac) {
  this.mac = mac;
};

Machine.prototype.getMagic_id = function() {
  return this.magic_id;
};

Machine.prototype.setMagic_id = function(magic_id) {
  this.magic_id = magic_id;
};

Machine.prototype.getChecked = function() {
  return this.checked;
};

Machine.prototype.setChecked = function(checked) {
  this.checked = checked;
};

Machine.prototype.showData = function() {
  console.log(this.name, this.ip, this.mac, this.magic_id, this.checked);
};

// export the class
module.exports = Machine;