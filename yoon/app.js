var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, fs = require('fs')
, mysql = require('mysql')
, colors = require('colors')
, socketio = require('socket.io')
, collaboration = require('./modules/collaboration');

var app = express();
var server = null;
var io = null;

app.configure(function(){
  app.set('port', process.env.PORT || 9998);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  //애플리케이션의 라우팅(패킷의 전송 경로를 지정)을 
  //마운트(일련의 파일들을 사용자나 사용자 그룹들이 이용할 수 있도록 만드는 것)하는데 사용.
  //이것을 사용하지 않으면 첫 번째 app.get()과 app.post() 등의 호출 경로를 마운트
  app.use(app.router);  
  app.use(express.static(path.join(__dirname, 'public'))); 
});


//오류 발생시의 스택을 추적하기 위한 설정으로 dumpExceptions옵션을 활성화
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/get_file_contents', routes.get_file_contents);
app.post('/put_file_contents', routes.put_file_contents);
app.post('/jqueryFileTree', routes.jqFileTree);


app.post('/post_file_load', routes.fileLoad);

server = http.createServer(app);
io = socketio.listen(server);

server.listen(app.get('port'), function(){
	console.log("--------------------------------------------------------".grey);
	//console.log("workspace_path: " + __workspace);
	//console.log("temp_dir_path: " + __temp_dir);

	console.log();
	console.log("IDE 333:: starting...".yellow);
	console.log("server listening on port " + app.get('port'));
	console.log();
	console.log("--------------------------------------------------------".grey);
 
});

//collaboration 서버에 io객체를 전달하고 시작합니다.
collaboration.start(io);