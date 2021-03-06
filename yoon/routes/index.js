var file = require('../modules/file');
var jqueryFileTree = require('../modules/jqueryFileTree');

exports.index = function(req, res){
	res.render('index.html');
};

exports.login = function(req, res){
	res.render('login.html');
};

exports.loadPage = function(req, res){
	res.render('loadPage.html');
};

exports.dashboard = function(req, res){
	res.render('dashboard.html');
};

exports.jqFileTree = function(req, res){
	res.send(jqueryFileTree.getList(req, res));
};

exports.jqFileTreeDir = function(req, res){
	res.send(jqueryFileTree.getDirList(req, res));
};

exports.get_file_contents = function(req, res){
	var path = req.query.path;
	res.send(file.load(path));
};


exports.get_first_file_contents = function(req, res){
	var prname = req.query.pname;
	var pname = req.query.fname;
	res.send(file.firstload(prname, pname));
};


exports.put_file_contents = function(req, res){
	var contents = req.body.contents;
	var currentFile = req.body.currentFile;
	res.send(file.save(contents, currentFile));
};

exports.file_import = function(req, res){
	
	
	var fileA = new Array();

	if(req.files.files.originalFilename != null){
		var fileInfo = new Object();
		fileInfo.name = req.files.files.originalFilename;
		fileInfo.type = req.files.files.ws.type;
		fileInfo.target_path =  '/home/yoon/kjs/'+ req.session.pname+"/"+req.files.files.originalFilename;
		fileInfo.tmp_path = req.files.files.path;
		fileA.push(fileInfo);
	}else{
		for(var i = 0; i < req.files.files.length; i++){
			var fileInfo = new Object();
			fileInfo.name = req.files.files[i].originalFilename;
			fileInfo.type = req.files.files[i].ws.type;
			fileInfo.target_path =  '/home/yoon/kjs/'+req.session.pname+"/"+req.files.files[i].originalFilename;
			fileInfo.tmp_path = req.files.files[i].path;
			fileA.push(fileInfo);
		}
	}
	res.send(file.fileImport(fileA));
};

exports.createFile = function(req, res){
		res.send(file.createFile(req.body.file));
};

exports.createFolder = function(req, res){
	  res.send(file.createFolder(req.body.folder));
};

exports.existSource = function(req, res){
	res.send(file.exists(req.body.source));
};

exports.deleteF = function(req, res){
	res.send(file.deleteF(req.body.source));
};



exports.img_import = function(req, res){
	var imgA = new Array();
	var imgInfo = new Object();
	
	imgInfo.target_path = '/home/yoon/kjs/userimg/' 
														+ req.session.user + "." 
														+ req.files.files.originalFilename.split(".")[1];
	imgInfo.temp_path = req.files.files.path;
	imgA.push(imgInfo);
	
	res.send(file.imgImport(imgA));
};


exports.existUserImg = function(req, res){
	res.send(file.existImg(req.body.userimg));
};






