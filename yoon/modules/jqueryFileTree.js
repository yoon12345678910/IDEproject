var fs = require('fs');

var _getDirList = function(request, response) {
	var dir = request.body.dir;
	//console.log("dir",dir);
	
	var r = '<ul class="jqueryFileTree" style="display: none;">';
   	try {
       	r = '<ul class="jqueryFileTree" style="display: none;">' 
       	;
		var files = fs.readdirSync(dir);
		//console.log("files",files); 
		
		files.forEach(function(f){
			//console.log("f", f);
			var ff = dir + f;
			//console.log("ff", ff);
			
			var stats = fs.statSync(ff)
			//console.log("stats",stats);			
            if (stats.isDirectory()) { 
                r += '<li class="directory collapsed"><a href="#" rel="' + ff  + '/">' + f + '</a></li>';
            } else {
            	var e = f.split('.')[1];
             	r += '<li class="file ext_' + e + '"><a href="#" rel='+ ff + '>' + f + '</a></li>';
            }
		});
		r += '</ul>';
	} catch(e) {
		r += 'Could not load directory: ' + dir;
		r += '</ul>';
	}
	response.send(r)
}

module.exports.getDirList = _getDirList;