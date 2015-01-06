
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, fs = require('fs')
, mysql = require('mysql')
, socketio = require('socket.io')
, collaboration = require('./modules/collaboration');

var app = express();
var server = null;
var io = null;

app.configure(function(){
  app.set('port', process.env.PORT || 9998);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var client = mysql.createConnection({
	host : 'localhost',
	user : 'study',
	password : 'study',
	database : 'studydb'
});


app.get('/', function(request, response) {
	fs.readFile('main.html', function(error, data) {
		response.send(data.toString());
	});
});

/*app.get('/index', function(request, response) {
	fs.readFile('index.html', function(error, data) {
		response.send(data.toString());
	});
});
*/

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



/*app.get('/', routes.index);*/
app.get('/users', user.list);
app.get('/get_file_contents', routes.get_file_contents);
app.post('/put_file_contents', routes.put_file_contents);


//socket.io와 express를 설정하고 실행합니다.
server = http.createServer(app);
io = socketio.listen(server);


// 완성된 소스에 문제가 있는데 클라이언트로부0p[터 request가 6번 이상 오게되면
// 서버에서 무시해버리는 현상 발생. 무한 request 방지를 위한거 같음.
// 우리는 실시간으로 단어가 올때마다 체크해야하기 때문에 6번은 너무 적고
// 그 제한횟수를 풀어줄 필요가 있는데 그걸 푸는 코드가 아래의 코드라고 구글 형님이 알랴줌.
// 서버 생성
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//collaboration 서버에 io객체를 전달하고 시작합니다.
collaboration.start(io);