var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, fs = require('fs')
, colors = require('colors')
, socketio = require('socket.io')
, session = require('express-session')
, wTerminal =   require('./lib/terminal')
, collaboration = require('./modules/collaboration')
,    repl        = require("repl")
,    util        = require("util")
,    _           = require("lodash")
,    streams     = require("./lib/streams")
,    spawn       = require("child_process").spawn
,    exec        = require("child_process").exec
,    cmdLine     = require("./lib/command")
,    autoClose
;

var app = express();
var server = null;
var io = null;

app.configure(function(){
  app.set('port', process.env.PORT || 9998);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  //app.use(express.logger('dev'));
  

  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(session({secret: 'ide'}));
  
  //애플리케이션의 라우팅(패킷의 전송 경로를 지정)을 
  //마운트(일련의 파일들을 사용자나 사용자 그룹들이 이용할 수 있도록 만드는 것)하는데 사용.
  //이것을 사용하지 않으면 첫 번째 app.get()과 app.post() 등의 호출 경로를 마운트
  app.use(app.router);  
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/home', express.static(path.join('/home/yoon/kjs/userimg/')));
});


//오류 발생시의 스택을 추적하기 위한 설정으로 dumpExceptions옵션을 활성화
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/editor', routes.index);
app.get('/login', routes.login);
app.get('/loadPage', routes.loadPage);
app.get('/dashboard', routes.dashboard);

app.get('/users', user.list);
app.get('/uid_check', user.idCheck);
app.get('/email_check', user.emailCheck);
app.post('/project_check', user.project_check);

app.post('/signup', user.signup);
app.post('/login', user.login);

app.post('/getSession', user.getSession);
app.post('/setSession', user.setSession);
app.post('/sessionDestroy', user.sessionDestroy);
app.post('/existPeople', user.existPeople);
app.post('/invite', user.invite);

app.post('/saveMemo', user.saveMemo);
app.post('/loadMemo', user.loadMemo);

app.get('/get_file_contents', routes.get_file_contents);
app.post('/put_file_contents', routes.put_file_contents);
app.post('/file_import', routes.file_import);
app.post('/img_import', routes.img_import);
app.post('/existUserImg', routes.existUserImg);



app.post('/createFile', routes.createFile);
app.post('/createFolder', routes.createFolder);
app.post('/existSource', routes.existSource);
app.post('/deleteF', routes.deleteF);

app.post('/jqueryFileTree', routes.jqFileTree);
app.post('/jqueryFileTreeDir', routes.jqFileTreeDir);




http = require("http");
server = http.createServer(app);
io = socketio.listen(server, { log: false });

server.listen(app.get('port'), function(){
	console.log("--------------------------------------------------------".grey);
	console.log();
	console.log("Welcome to Collabo IDE:: starting...".yellow);
	console.log("server listening on port " + app.get('port'));
	console.log();
	console.log("--------------------------------------------------------".grey);
});


//web-terminal
io.sockets.on("connection", function (socket) {

  var cwd         = "/home/yoon/kjs/",
      env         = _.clone(process.env),
      home        = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
      linebreak   = "\n", // check if we need to add \r\n for windows
      promptChar  = process.platform === "win32" ? ">" : "$",
      stdin,
      args,
      cmd,
      proc,
      dir,
      replSrv,
      user,
      username;

  function execCmd(command, shell, terminate) {
      if (env.WEBT_LOGIN && !user) {
          socket.emit("exit", "login required");
          return;
      }

      var opts = { cwd: cwd, env: env };
      if (user) {
          opts.uid = user;
      }

      if (env.WEB_SHELL || shell) {
          proc = spawn(env.WEB_SHELL || shell, null, opts);
          stdin = proc.stdin;
          stdin.write(command + linebreak);
          if (terminate) {
              stdin.end();
          }
      } else {
          proc = spawn(cmd, args, opts);
          stdin = proc.stdin;
      }

      proc.on("error", function (err) {
          if (err.code === "ENOENT") {
              err.message = cmd + ": command not found";
          }
          socket.emit("console", err.message);
      });

      proc.stdout.setEncoding("utf8");
      proc.stdout.on("data", function (data) {
          socket.emit("console", data);
      });

      proc.stderr.setEncoding("utf8");
      proc.stderr.on("data", function (data) {
          if (data.indexOf("execvp():") === 0) {
              data = cmd + ": command not found";
          }
          socket.emit("console", data);
      });

      proc.on("close", function () {
          stdin = null;
          socket.emit("exit", "");
      });
  }

  function startRepl() {
      var input   = streams.ReplStream(),
          output  = streams.ReplStream();

      input.setEncoding("utf8");
      output.setEncoding("utf8");

      stdin = input;
      output.on("data", function (data) {
          socket.emit("console", data);
      });

      replSrv = repl.start({
          prompt: "> ",
          input: input,
          output: output,
          terminal: false,
          useColors: true
      });

      replSrv.on("exit", function () {
          stdin = null;
          socket.emit("configure", {
              prompt      : cwd,
              promptChar  : promptChar
          });
          socket.emit("exit");
          replSrv = null;
      });

      socket.emit("configure", {
          prompt      : "",
          promptChar  : ">"
      });
  }

  socket.on("disconnect", function () {
  	
      if (autoClose && io.sockets.clients().length === 0) {
          server.close();
      }
  });

  socket.on("signal", function (signal) {
      var cmd;

      if (replSrv) {
          switch (signal) {
          case "SIGINT":
              cmd = ".break";
              break;
          case "SIGQUIT":
              cmd = ".exit";
              break;
          }
          stdin.write(cmd + linebreak);
      } else if (proc) {
          proc.kill(signal);
      }
  });

  socket.on("console", function (command) {
      var i, arg, basePath;

      if (stdin) {
          stdin.write(command + linebreak);
      } else {
          args    = cmdLine.parse(command);
          cmd     = args.splice(0, 1)[0];

          switch (cmd) {
          case "cd":
              arg = args[0];
              if (arg[0] === "~") {
                  basePath = home;
                  arg = arg.substring(2);
              } else {
                  basePath = cwd;
              }
              dir = path.resolve(basePath, arg);
              fs.exists(dir, function (exists) {
                  var msg;
                  if (exists) {
                      cwd = dir;
                      msg = "cwd: " + cwd;
                  } else {
                      msg = "No such file or directory";
                  }
                  socket.emit("exit", msg);
              });

              break;
          case "export":
              for (i = 0; i < args.length; i++) {
                  arg = args[i].split("=");
                  env[arg[0]] = arg[1];
              }
              socket.emit("exit");
              break;
          case "unset":
              for (i = 0; i < args.length; i++) {
                  delete env[args[i]];
              }
              socket.emit("exit");
              break;
          case "env":
//TODO: handle env command to manage environment variables
              args.length = 0;
              command = "env";
              execCmd(command);
              break;
          case "ls":
              if (env.WEB_SHELL) {
                  if (command.length === 2) {
                      command += " --color -C";
                  }
              } else {
                  if (args.length === 0) {
                      args.push("--color");
                      args.push("-C");
                  }
              }
              execCmd(command);
              break;
          case "node":
              if (args.length === 0) {
                  startRepl();
              } else {
                  execCmd(command);
              }
              break;
          case "echo":
              execCmd(command, process.platform === "win32" ? "cmd" : "bash", true);
              break;
          case "login":
          case "logout":
              if (initLogin(socket)) {
                  user = undefined;
                  username = undefined;
                  env.WEBT_LOGIN = "login";
                  socket.emit("configure", { prompt: "", promptChar: ">" });
                  socket.emit("username");
              }
              break;
          default:
              execCmd(command);
          }
      }
  });

  function begin() {
      socket.emit("configure", {
          srvOS       : process.platform,
          prompt      : cwd,
          promptChar  : promptChar
      });
      socket.emit("exit");
  }

  socket.on("username", function (input) {
      username = input;
      socket.emit("password");
  });

  socket.on("password", function (input) {
      pam.authenticate(username, input, function (err) {
          if (err) {
              console.log("Authentication failed: " + err);
              socket.emit("exit", errs.wrongCrdtls);
              socket.emit("username");
          } else {
              console.log("Authenticated: " + username);
              require("uid-number")(username, function (err, uid) {
                  if (err) {
                      console.log(err);
                      socket.emit("exit", err);
                  } else {
                      user = uid;
                      exec("echo ~" + username, function (err, stdout) {
                          if (err) {
                              console.log(err);
                              socket.emit("exit", err);
                          } else {
                              cwd = home = env.HOME = stdout.toString().trim();
                              begin();
                          }
                      });
                  }
              });
          }
      });
  });

  if (process.env.WEBT_LOGIN) {
      socket.emit("username");
  } else {
      begin();
  }
});


//wTerminal(server);
//collaboration 서버에 io객체를 전달하고 시작합니다.
collaboration.start(io);