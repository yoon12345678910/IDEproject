
var fs = require('fs');

module.exports = {
	//파일을 불러오는 부분입니다.

		load: function (filename) {
		var data;
		var ff;
		if(!filename){
			ff = "/home/yoon/myFirstProject/NewFile.html";
			data = fs.readFileSync(ff);
		}else{
			ff = "/" + filename;	
			data = fs.readFileSync(ff);
		}
		
		return data;
	},

	
	firstload: function (pname, fname) {
		if(!fname){
			ff = "/home/yoon/myFirstProject/NewFile.html";
			data = fs.readFileSync(ff);
		}else{
			ff = "/home/yoon/kjs/" + pname+ "/" + fname.substring(fname.lastIndexOf("/")+1, fname.length);
			data = fs.readFileSync(ff);
		}
		return data;
	},
	
	//파일을 저장하는 부분입니다.
	save: function (contents, currentFile) {
		//console.log("contents", contents);
		//console.log("currentFile", currentFile);
		fs.writeFile(currentFile, contents, function (err) {
			if (err) {
				throw err;
			}
		});
	},
	
	//파일을 생성합니다.
	createFile: function(file){
		var data = fs.existsSync(file);
		if(data == true){
			var test = fs.lstatSync(file);
			if(!test.isFile()){
				data = fs.openSync(file ,'w', 0666);
				return true;
			}else{
				return false;
			}
		}else{
			data = fs.openSync(file ,'w', 0666);
			return true;
		}
	},
	
	createFolder : function(source){
		var data = fs.existsSync(source);
		if(data == true){
			var test = fs.lstatSync(source);
			if(!test.isDirectory()){
				data = fs.mkdirSync(source);
				return true;
			}else{
				return false;
			}
		}else{
			data = fs.mkdirSync(source);
			return true;
		}
	},
	
	deleteF : function(source){
		var data = fs.existsSync(source);
		if(data == true){
			var test = fs.lstatSync(source);
			if(test.isDirectory()){
				fs.rmdirSync(source);

				return "dDir";
			}else{
				fs.unlinkSync(source);
				return "dFile";
			}
		}else{
			return "notexist";
		}
	},
	
	exists: function(source){
		
		var data = fs.existsSync(source);
		if(data == true){
			var test = fs.lstatSync(source);
			if(test.isDirectory()){
				return "dir";
			}else{
				return "file";
			}
		}else{
			return "notexist";
		}
	},
	
	fileImport: function(file){
console.log("aa",file);
		for(var i = 0; i < file.length; i++){
	/*		console.log("file[i].target_path", file[i].target_path);
			console.log("file[i].tmp_path", file[i].tmp_path);*/
					var ws =  fs.createWriteStream(file[i].target_path);
					var stream = fs.createReadStream(file[i].tmp_path);
		
					stream.on('error', function(err) {
						console.log("error", err);
					});
					
					stream.on('close', function() {
					});
					
					stream.pipe(ws);
		}
		return true;
	},
	
	imgImport: function(imgInfo){
					var ws =  fs.createWriteStream(imgInfo[0].target_path);
					var stream = fs.createReadStream(imgInfo[0].temp_path);
		
					stream.on('error', function(err) {
						console.log("error", err);
					});
					
					stream.on('close', function() {
					});
					
					stream.pipe(ws);
		return imgInfo[0].target_path;
	},
	
	
	existImg:function(img){
		
		//console.log("aa", img + ".png");
		var data = fs.existsSync(img  + ".png");
		if (data == true){
			return img  + ".png";
		}
		
		var data = fs.existsSync(img  + ".jpg");
		if (data == true){
			return img  + ".jpg";
		}
		
		return false;
		
		
	}
	
	
};