
/*
 * GET users listing.
 */

var mysql = require('mysql');

var client = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'kjs',
	password : 'kjs',
	database : 'kjsdb'
});

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.idCheck = function(req, res){
	client.query('SELECT UID FROM USERS WHERE UID=?', 
			[req.query.id],
			
			function(error, result) {
				if (result.length) {
					console.log('아이디 있음ㅠㅠ');
					res.send({
						"result" : "유"
					});
					
				} else {
					console.log('아이디 없음^^');
					res.send({
						"result" : "무"
					});
				}
			});
};

exports.emailCheck = function(req, res){
	client.query('SELECT UID FROM USERS WHERE EMAIL=?', 
			[ req.query.email],
			
			function(error, result) {
				if (result.length) {
					console.log('이메일 있음ㅠㅠ');
					res.send({
						"result" : "유"
					});
					
				} else {
					console.log('이메일 없음^^');
					res.send({
						"result" : "무"
					});
				}
			});
};

exports.signup = function(req, res){
	client.query('INSERT USERS(UID, PWD, EMAIL) value(?, ?, ?)', 
			[req.body.id, req.body.pwd, req.body.email],
		
			function(error, result) {
					if (result) {
						console.log('회원가입 성공');
						res.send({
							"result" : "회원가입 성공"
						});
						
					}else{
						console.log("err", error);
					}
			});
};

exports.login = function(req, res){
	 res.setHeader("Access-Control-Allow-Origin", "*");
	console.log("req.body.uid", req.body.uid);
	client.query('SELECT UID, PWD FROM USERS WHERE UID=? && PWD =?', 
			[req.body.uid, req.body.pwd],
		
			function(error, result) {
					if (result.length > 0 ) {
						
					  req.session.user = req.body.uid;
						res.send({
							"result" : "성공"
						});
						
					}else{
						
						res.send({
							"result" : "실패"
						});
					}
			});
};

exports.getSession = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	if(req.session.user){
		
		res.send({
			"result" : req.session
		});
	}else{
		res.send({
			"result" : "세션없음"
		});
	}
};

exports.sessionDestroy = function(req, res){
	req.session.destroy();
	
	res.send({
		"result" : "sessionInit"
	});
	
};



exports.existPeople = function(req, res){
	console.log("req.body.existPeople", req.body.existPeople);
	
	
	client.query('SELECT UID FROM USERS WHERE UID=?', 
			[req.body.existPeople],
			function(error, result) {
		if (result.length) {
			console.log('아이디 있음ㅠㅠ');
			res.send({
				"result" : "유"
			});
			
		} else {
			console.log('아이디 없음^^');
			res.send({
				"result" : "무"
			});
		}
	});
			
}

exports.project_check = function(req, res){
	client.query('SELECT PNAME FROM PROJECTS WHERE PNAME=?', 
			[req.body.pname],
			function(error, result) {
				if (result.length) {
					console.log('프로젝트 있음ㅠㅠ');
					res.send({
						"result" : "유"
					});
					
				} else {
					console.log('프로젝트 없음^^');
					res.send({
						"result" : "무"
					});
				}
	});
	
	
}

exports.setSession = function(req, res){
	req.session.pname = req.body.pname;
	req.session.pid = req.body.pid;
	req.session.auth = req.body.auth;
	req.session.pdate = req.body.date;
	
	res.send({
		"result" : "성공"
	});
	
}


exports.invite = function(req, res){
	console.log("aa",  req.body.uid);
	console.log("bb",  req.body.pid);
	console.log("cc",  req.body.auth);
	
	
	client.query('INSERT COLLABO(UID, PID, AUTH) value(?, ?, ?)', 
			[req.body.uid, req.body.pid, req.body.auth],
		
			function(error, result) {
					if (result) {
						res.send({
							"result" : "성공"
						});
						
					}else{
						console.log("err", error);
					}
			});
}












