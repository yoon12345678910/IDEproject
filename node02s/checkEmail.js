var http = require('http');
var url = require('url');
var qs = require('querystring');

var httpServer = http.createServer(function(req, resp){
	var obj = url.parse(req.url, true);
	if(obj.pathname == '/checkEmail'){
		resp.writeHead(200, 'OK', {
		'Content-Type': 'text/html;charset=UTF-8'
			});
		
		resp.write('<html><head><title>test01</title></head>');
		resp.write('<body><h1>첫번째 테스트</h1></body>');
	}
	resp.end();
});
httpServer.listen(9999,'127.0.0.1');







