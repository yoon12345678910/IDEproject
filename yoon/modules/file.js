
var fs = require('fs');

module.exports = {
	//파일을 불러오는 부분입니다.
	load: function (filename) {
		var ff;
		if(!filename){
			ff = "/workspace/untitled.js";
		}else{
			ff = "/" + filename;	
		}
		var data = fs.readFileSync(process.cwd() + ff);
		return data;
	},
	
	//파일을 저장하는 부분입니다.
	save: function (contents) {
		fs.writeFile(process.cwd() + "/workspace/untitled.js", contents, function (err) {
			if (err) {
				throw err;
			}
		});
	}
};