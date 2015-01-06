var http = require('http');
var mysql = require('mysql');
var express = require('express');
var fs = require('fs');
var path = require('path');


var client = mysql.createConnection({
	host : 'localhost',
	user : 'study',
	password : 'study',
	database : 'studydb'
});

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	fs.readFile('main.html', function(error, data) {
		response.send(data.toString());
	});
});

app.get('/index', function(request, response) {
	fs.readFile('index.html', function(error, data) {
		response.send(data.toString());
	});
});


app.get('/id', function(request, response) {
	client.query('SELECT UID, PWD FROM TEST WHERE UID=? AND PWD=? ', 
			[ request.param('uid'), request.param('pwd') ],
			
			function(error, result) {
				console.log(result);
				
				if (result.length) {
					
					console.log('아이디 있음ㅎㅎ');
					
					fs.readFile('test02.html', function(error, data) {
						response.send(data.toString());
					});
					
				} else {
					console.log('아이디 없음gg');
					
					response.send({
						"result" : "아이디 또는 비밀번호 불일치"
					});
				}
			});
});


app.get('/register', function(request, response) {
	client.query('INSERT INTO TEST(UID, PWD, EMAIL) VALUES (?, ?, ?)', 
			[ request.param('uid'), request.param('pwd'), request.param('email')],
			
			function(error, result) {
				console.log(result);
				
				if (result.length) {
					
				} else {
					fs.readFile('main.html', function(error, data) {
						response.send(data.toString());
					});
					
				}
			});
});


app.get('/uid_a', function(request, response) {
	client.query('SELECT UID FROM TEST WHERE UID=?', 
			[ request.param('uid')],
			
			function(error, result) {
				console.log(result);
				
				if (result.length) {
					
					console.log('아이디 있음');
					
					response.send({
						"result" : "no"
					});
					
				} else {
					console.log('아이디 없음');
					
					response.send({
						"result" : "yes"
					});
				}
			});
});


app.get('/email_a', function(request, response) {
	client.query('SELECT EMAIL FROM TEST WHERE EMAIL=?', 
			[ request.param('email')],
			
			function(error, result) {
				console.log(result);
				
				if (result.length) {
					
					console.log('이멜 있음');
					
					response.send({
						"result" : "no"
					});
					
				} else {
					console.log('이멜 없음');
					
					response.send({
						"result" : "yes"
					});
				}
			});
});





// 완성된 소스에 문제가 있는데 클라이언트로부0p[터 request가 6번 이상 오게되면
// 서버에서 무시해버리는 현상 발생. 무한 request 방지를 위한거 같음.
// 우리는 실시간으로 단어가 올때마다 체크해야하기 때문에 6번은 너무 적고
// 그 제한횟수를 풀어줄 필요가 있는데 그걸 푸는 코드가 아래의 코드라고 구글 형님이 알랴줌.
http.globalAgent.maxSockets = 100;
// 서버 생성
http.createServer(app).listen(9998, function() {
	 console.log("Express server listening on port :9998");
});