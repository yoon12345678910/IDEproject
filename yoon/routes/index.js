/**
 * author: sung-tae ryu
 * email: xenoz0718@gmail.com
 * node.js book example, Freelec
 **/
var file = require('../modules/file');
var jqueryFileTree = require('../modules/jqueryFileTree');


exports.index = function(req, res){
	res.render('index.html');
};

exports.jqFileTree = function(req, res){
	res.send(jqueryFileTree.getDirList(req, res));
	//console.log("****************************************req",req);
};

exports.fileLoad = function(req, res){
	console.log("여기??????", req.body.cf);
	res.send(file.load(req.body.cf));
	
}


exports.get_file_contents = function(req, res){
	//var path = req.query.path;
	res.send(file.load());
};

exports.put_file_contents = function(req, res){
	var contents = req.body.contents;
	res.send(file.save(contents));
};