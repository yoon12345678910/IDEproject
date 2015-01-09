
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
		socket.set('workspace', msg.workspace);
		
		this.users.push(msg.username);
		index = this.users.length - 1;
		
		socket.broadcast.to(msg.workspace).emit("someone_joined", JSON.stringify(this.users));
		socket.emit("someone_joined", JSON.stringify(this.users));
	},
	
	//사용자의 접속 종료를 처리합니다.
	leave: function (socket, msg) {
		socket.leave(msg.workspace);
		
		this.users.removeByValue(msg.username);
		socket.broadcast.to(msg.workspace).emit("someone_leaved", msg.username);
		socket.broadcast.to(msg.workspace).emit("refresh_userlist", JSON.stringify(this.users));
	},
	
	//사용자의 채팅 메시지를 처리합니다.
	msg: function (io, socket, msg) {
		var chatting_message = msg.username + " : " + msg.message;
			
		socket.broadcast.to(msg.workspace).emit("communication_message", chatting_message);
		socket.emit("communication_message", chatting_message);
	},
	
	//사용자의 편집 내용을 처리합니다.
	editing: function (socket, msg) {
		socket.broadcast.to(msg.workspace).emit("editing_message", JSON.stringify(msg));
	}
};
