
//Array 객체에 기본 메서드로 removeByValue라는 이름의 메서드를 확장하였습니다. 이 메서드는 전달받은 값을 이용하여 배열 중 해당 원소를 삭제합니다.
Array.prototype.removeByValue = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}
module.exports = {
	//사용자 목록을 저장하기 위한 값입니다.
	users: new Array(),
	color: new Array(),
	currentRoom : new Object(),
	currentFile : new Object(),
	
	start: function (io) {
		var self = this;

		io.set('log level', 0);
		io.sockets.on('connection', function (socket) {

			//새로운 사용자 접속에 대해 처리합니다.
			socket.on('join', function (raw_msg) {
				
				
				var msg_obj = JSON.parse(raw_msg);
				var channel = "";
				
				if(msg_obj["channel"] != undefined) {
					channel = msg_obj["channel"];
				}
				
				self.join(socket, msg_obj);
		/*		console.log("socket4", io.sockets.manager.rooms);
		 * console.log("socket", io.sockets.manager.rooms);
				console.log("socket5", io.sockets.manager.roomClients[socket.id]);
				console.log("socket7", io.sockets.clients('bit63'));
				console.log("socket9", io.sockets.clients("bit63"));*/
			});
			
			socket.on('roomjoin', function (data){
				self.roomjoin(socket, data);
			});
					
			
			//메시지에 대해 처리하는 부분입니다. 채팅인 경우, 편집 내용인 경우에 대해 구분하여 처리합니다.
			socket.on('message', function (raw_msg) {
				var msg_obj = JSON.parse(raw_msg);
				var channel = "";
				
	
				if(msg_obj["channel"] != undefined) {
					channel = msg_obj["channel"];
				}
				
				if (channel == "chat") {
					self.msg(io, socket, msg_obj);
				}
				else if (channel == "editing") {
					self.editing(socket, msg_obj);
				}
			});
			
			//접속을 종료할 대에 대해 처리합니다.
			socket.on('leave', function (raw_msg) {
				var msg_obj = JSON.parse(raw_msg);
				var channel = "";
				if(msg_obj["channel"] != undefined) {
					channel = msg_obj["channel"];
				}
				
				self.leave(socket, msg_obj);
			});
		}); 
	},
	
	//사용자의 접속을 처리합니다.
	join: function (socket, msg) {
		
	
		socket.join(msg.workspace);
		this.currentRoom[socket.id] = msg.workspace;
		
		
		socket.join(msg.CollaboFileName);
		this.currentFile[socket.id] = msg.CollaboFileName;
		//socket.set('workspace', msg.workspace);
		
		
		//this.currentRoom[socket.id] = msg.workspace;
		if(this.users.indexOf(msg.username) == -1){
			this.users.push(msg.username);
			this.color.push("#" + Math.round( Math.random() * 0xFFFFFF ).toString(16));

			
			index = this.users.length - 1;
			//console.log("JSON.stringify(this.users)", JSON.stringify(this.users));
			//console.log("this.users", this.users);
			socket.broadcast.to(msg.workspace).emit("someone_joined", '{"username":"' + this.users + '","color":"' + this.color+ '"}');
			socket.emit("someone_joined", '{"username":"' + this.users + '","color":"' + this.color + '"}');
		}
		
/*		console.log("-----------------------------");
		console.log("join-currentRoom", this.currentRoom);
		console.log("join에서 this.users", this.users);*/
	},
	
	roomjoin: function (socket, data){
		var str = JSON.parse(data);
    socket.leave(this.currentFile[socket.id]);
    
		socket.join(str.message);
		this.currentFile[socket.id] = str.message;
	},
	
	//사용자의 접속 종료를 처리합니다.
	leave: function (socket, msg) {
		this.color.removeByValue(this.color[this.users.indexOf(msg.username)]);
		this.users.removeByValue(msg.username);
		socket.leave(socket.id);
		socket.broadcast.to(msg.workspace).emit("someone_leaved", msg.username);
		socket.broadcast.to(msg.workspace).emit("refresh_userlist", '{"username":"' + this.users + '","color":"' + this.color + '"}');
	},
	
	//사용자의 채팅 메시지를 처리합니다.
	msg: function (io, socket, msg) {
		var chatting_message = msg.username + " : " + msg.message;
		//console.log("msg", this.currentRoom);
		socket.broadcast.to(this.currentRoom[socket.id]).emit("communication_message", '{"chatting_message":"' + chatting_message + '","color":"' + this.color[this.users.indexOf(msg.username)] + '"}');
		socket.emit("communication_message", '{"chatting_message":"' + chatting_message + '","color":"' + this.color[this.users.indexOf(msg.username)] + '"}');
	},
	
	//사용자의 편집 내용을 처리합니다.
	editing: function (socket, msg) {
		//console.log("editing", msg);
		socket.broadcast.to(this.currentFile[socket.id]).emit("editing_message", JSON.stringify(msg));
	},
	
/*	aa: function(io, socket){
		
		console.log("room", this.currentRoom[socket.id]);
	}*/
	
};