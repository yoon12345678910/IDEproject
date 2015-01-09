var file = require('../modules/file');
var jqueryFileTree = require('../modules/jqueryFileTree');

exports.index = function(req, res){
	res.render('index.html');
};

exports.jqFileTree = function(req, res){
	res.send(jqueryFileTree.getDirList(req, res));
};

exports.get_file_contents = function(req, res){
	var path = req.query.path;
	console.log("경로", path);
	res.send(file.load(path));
};

exports.put_file_contents = function(req, res){
	var contents = req.body.contents;
	res.send(file.save(contents));
};