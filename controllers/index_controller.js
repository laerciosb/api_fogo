
exports.index = function(req, res, next){
  res.sendFile('/README.md', {'root': '../api_fogo'});
};