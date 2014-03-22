var latlon = require('../data/latlon');

exports.id = function(req,res){
	console.log(req.body.idname);
	console.log(latlon[req.body.idname]);
	res.json(latlon[req.body.idname]);
};