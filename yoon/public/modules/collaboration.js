var collaboration = {
	//업데이트 내용을 반영하는 중에는 다른 업데이트가 일어나지 않도록 하는 Flag입니다.
	updating_process_running: false,
	//여러 업데이트 내용들이 충돌하지 않고 순차적으로 반영될 수 있도록 큐를 사용합니다.
	task_queue: [],
	username: null,
	projectEach: null,
	
	init: function() {
		var self = this;
		
		
		//socket.io 연결을 통해 객체를 만듭니다.
		socket = io.connect();
		
  		this.task_queue = [];
  		this.removed_lines_uuids = [];
 		//사용자 이름을 생성합니다.
 		this.username = username;
 		
 		//작업 큐를 만들고 여기에 업데이트 내용이 쌓이게 하여 충돌 없이 하나씩 차례대로 적용되도록 합니다.
		var check_for_updates = function() {
			while(self.task_queue.length > 0 && self.updating_process_running == false) {
				var current_update = self.task_queue.shift(); 
				
				self.updating_process_running = true;
				
				self.apply_update(current_update.action, current_update.message);
			}
		};
 		
		
	
		
 		//수시로 업데이트를 수행하기 위해 타이머를 설정합니다.
 		this.timer = window.setInterval(check_for_updates, 500);

 		//채팅 메시지가 왔을 때 처리하는 부분입니다.
 		socket.on("communication_message", function (data) {
 			console.log("aa", data);
 			
 			
 			data = decodeURIComponent(data);
 			
			data = ((data.replace(/&/g, '&amp;')).replace(/\"/g, '&quot;')).replace(/\'/g, '&#39;'); 
			data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			
			var udata = data.split(":");
			var color=["#FF5E00", "#4374D9", "#2F9D27", "#F361DC", "#FFE400", "#FF007F"];
			var xx;
			
			console.log("id", udata[0]);
			if(udata[0] == 'fkawk38 '){
				console.log("fkawk38");
				xx = color[0];
			}else if(udata[0] == 'yoon12345678910 '){
				console.log("yoon12345678910");
				xx = color[1];
			}else if(udata[0] == 'wonbakery '){
				console.log("wonbakery");
				xx = color[2];
			}else{
				console.log("vv");
				xx = color[3];
			}
			
			console.log("xx", xx);
 			$(".chatText").append("<p id='ot_chat'>" + 
			"<span class ='chatBorder' style='border-left: 5px solid " + xx +"' ></span>" + 
			"<a href='#' class='authorName'>" +
				"<b>" + udata[0] + "</b></a>" +
			"<span id='chatmessage'>" + udata[1] +"</span></p>" 
 			);
 			
 			
 			$(".chatText").scrollTop($(".chatText").height());
 			
 		});
 		//에디터 내용 수정과 관련된 메시지를 처리하는 부분입니다.
		socket.on("editing_message", function (data) {
 			if(!data) {
 				return false;
 			}
 			
 			//전달받은 데이터를 JSON 객체로 만듭니다.
			var received_msg = JSON.parse(data);
			
			console.log("received_msg", received_msg);
			
			//전달 받은 메시지가 편집에 관한 메시지인지, 자신의 이름과 같지 않은 지, 그리고 자신이 편집중인 파일이 맞는 지 확인합니다.
			if(received_msg.channel == "editing" && 
			   received_msg.username != username &&
			   received_msg.filepath == filepath) {
				switch(received_msg.action){
					case "change":
						//에디터의 내용 변경인 경우에는 작업 큐에 내용을 저장합니다.
						self.task_queue.push(received_msg);
						break;
					case "cursor":
						//커서의 움직임을 작업 큐에 저장합니다.
						self.task_queue.push(received_msg);
						break;
					default:
						
				}
			}
		});
		
		//새로운 사용자가 접속할 때의 상황을 처리합니다.
		socket.on("someone_joined", function (data) {
			console.log("data??",data);
 			data = JSON.parse(data);
 			$(".member_layout").empty();
 			
 			
 			
 			for(var i=0; i<data.length; i++){
 				var username = data[i];
 				
 				var color=["#FF5E00", "#4374D9", "#2F9D27", "#F361DC", "#FFE400", "#FF007F"];
 				var xx;
 				var userimg;
 				
 				$.ajaxSetup({ async:false });
 				$.post('/existUserImg', {userimg : '/home/yoon/kjs/userimg/' + username} , function(data){
 					
 					if(data == false){
 						userimg = 'default.png';
 						
 					}else{
 						$('#userImg').attr("src", "/home/" + data.split("/")[5]);
 						
 						userimg = data.split("/")[5];
 					}
 				});
 				$.ajaxSetup({ async:true });
 				
 				if(username == 'fkawk38'){
 					xx = color[0];
 					//userimg = 'fkawk38.jpg';
 				}else if(username == 'yoon12345678910'){
 					xx = color[1];
 					//userimg = 'yoon12345678910.png';
 				}else if(username == 'wonbakery'){
 					xx = color[2];
 					//userimg = 'default.png';
 				}else{
 					xx = color[3];
 					//userimg = 'default.png';
 				}
 				
 				
 				
//수정				
 				$(".member_layout").append(
 						'<div class="member_tree_row">' + 
 						'<span id="onoff"  style= "background-color:' + xx +'"></span>' +
 						'<img id="userPhSm" src="/home/'+ userimg+'"></img>' +
 						'<span class="member_user">' + username +'</span>' +
 						
 						
/* 						'<div class="access_control">' +
 						'<div class="writebutton selectButton">RW</div>' +
 						'<div class="readbutton">R</div>' +
 						'</div>'+
 						'<div class="kickout">' +
 						'<span class="k-icon k-i-close"></span>' +
 						'</div>' +*/
 						
 						
 						'</div>');
 				
 				
 			}
				var staticNotification = $("#staticNotification").kendoNotification({
	 	      appendTo: "#notify"
	 			}).data("kendoNotification");
				
				textA = username + "&nbsp"+"joined this project!";
	 			staticNotification.show(textA);
 			
 			
 			
 			
 			/*$(".chatText").append("<p id='ot_chat'>" + 
 					"<span class ='chatBorder' style='border-left: 5px solid red';" +"></span>" + 
 					"<a href='#' class='authorName'>" +
 						"<b style='color:red'; > " + this.username + " "+ "joined this workspace!</b></a>" +
 					"</p>" 
 		 			);
*/
 		});
 		
 		//다른 사용자가 접속을 종료했을 때를 처리합니다.
 		socket.on("someone_leaved", function (data) {
 			
 			var staticNotification = $("#staticNotification").kendoNotification({
 	      appendTo: "#notify"
 			}).data("kendoNotification");
 			
 			var textA = data + "&nbsp"+ "leaved this project!";
 			staticNotification.show(textA);
 		});
		
		//접속자 목록을 새로 고칩니다.
		socket.on("refresh_userlist", function (data) {
 			data = JSON.parse(data);
 			$(".member_layout").empty();
 			
 			for(var i=0; i<data.length; i++){
 				var username = data[i];

				$(".member_layout").append(
 						'<div class="member_tree_row">' + 
 						'<span id="onoff"></span>' +
 						'<img id="userPhSm" src="stylesheets/images/psy-album.jpg"></img>' +
 						'<span class="member_user">' + username +'</span>' +
 						
 	/*					'<div class="access_control">' +
 						'<div class="writebutton selectButton">RW</div>' +
 						'<div class="readbutton">R</div>' +
 						'</div>'+
 						
 						
 						'<div class="kickout">' +
 						'<span class="k-icon k-i-close"></span>' +
 						'</div>' +*/
 						
 						
 						'</div>');
 			}
 		});
		
		//이 부분은 자신의 커서 이외에 다른 접속자의 커서를 깜빡거리게 해주기 위한 코드입니다. (코드 미러는 편집 중인 자기 자신에 대한 커서만 깜빡거리면서 보여주기 때문입니다.)
		setInterval(function() {
			$(".CodeMirror-scroll").find(".cursor").each(function (i) {
				if ($(this).css('visibility') == 'hidden') {
					$(this).css('visibility', 'visible');
				} else {
					$(this).css('visibility', 'hidden');
				}
			});
		}, 600);
		
		//채팅 창에서 엔터키를 쳤을 때 메시지를 전달하기 위한 부분입니다.
		$(".chatContainer .text-input").keypress(function(evt){
			if((evt.keyCode || evt.which) == 13 && !evt.shiftKey){
				evt.preventDefault();
				
				self.message_process($(this).val());
				$(this).val("");
			}
		});
		
		//웹브라우저를 종료하거나 새로고침할 때 에디터를 접속 종료하는 것으로 처리합니다.
		$(window).unload(function() {
 			self.leave();
 		});
	},

	//변경 사항이 발생하면 이를 전달해주기 위한 메서드입니다.
	update_change: function(data){
		var self = this;
		
		if(socket != null){
			if (socket.socket.connected) {
				//수정한 내용을 서버에 전달합니다.
				socket.emit("message", '{"channel": "editing", "action":"change", "username":"' + username + '", "filepath":"' + filepath + '", "message":' + JSON.stringify(data) + '}');
				
				clearTimeout(this.auto_save_timer);
				var action = function(){
					self.save();
				}
				this.auto_save_timer = setTimeout(action, 5000);
			}
		}
	},

	//커서의 변경 사항이 발생하면 이를 전달해주기 위한 메서드입니다.
	update_cursor: function(data) {
		var self = this;
		if(socket != null){
			if (socket.socket.connected) {
				data.username = self.username;
				
				//커서 위치 정보를 서버에 전달합니다.
				socket.emit("message", '{"channel": "editing", "action":"cursor", "username":"' + username + '", "filepath":"' + filepath + '", "message":' + JSON.stringify(data) + '}');
			}
		}
	},
	
	//다른 사람들의 변경 내용을 실제로 적용하는 부분입니다. 편집 내용과 커서 위치 2가지 각각 해당하는 메서드를 호출합니다.
	apply_update: function(action, update){
		switch(action) {
			case "change":
				this.change(update);
				break;
			case "cursor":
				this.set_cursor(update);
				break;
			default:
				console.log("invalid update");
		};
	},
	
	//변경된 사항을 실제 에디터에 반영합니다.
	change: function(message){
		var self = this;

		if (message.username != username) {
			var textStr = "";
			
			for(var i=0; i < message.text.length; i++){
				if(i != 0 && message.text[0] != "\n" ){
					textStr+="\n";
				}
				textStr += message.text[i];
			}
			
			//에디터 객체의 코드 미러의 내용을 바꿉니다. replaceRange()는 코드 미러에서 제공되는 API입니다.
			editor.codemirror.replaceRange(textStr, message.from, message.to);
			
			if(message.next){
				message.next.user = message.user;
				self.change(message.next);
			}
		}
		
		
		this.updating_process_running = false;
	},
	
	//커서의 위치를 할당하는 부분입니다.
	set_cursor: function(message) {
		console.log("커서위치 할당", message);
		
		if(message.username != username){
			//charCoords와 getScrollInfo는 코드 미러의 API입니다.
			var coords = editor.codemirror.charCoords({line:message.line, ch:message.ch});
			var scroll = editor.codemirror.getScrollInfo();
			
			//커서를 표시하기 위해 위치를 계산합니다.
			var top = parseInt(coords.top) - parseInt($(".CodeMirror-scroll").offset().top) + scroll.top;
			var left = parseInt(coords.left) - parseInt($(".CodeMirror-scroll").offset().left)  + scroll.left;
			
			var username = message.username;
			
			//이미 해당 사용자의 이름으로 된 커서가 존재하는 경우에는 위치만 갱신시켜 줍니다.
			if ($(".CodeMirror-scroll").find(".username_" + username).length > 0) {
				$(".CodeMirror-scroll").find(".username_" + username).css("top", top - 8);
				$(".CodeMirror-scroll").find(".username_" + username).css("left", left + 5);
				
				$(".CodeMirror-scroll").find(".cursor_" + username).css("top", top);
				$(".CodeMirror-scroll").find(".cursor_" + username).css("left", left);
			}
			//처음으로 등장한 사용자인 경우에는 커서를 표시하기 위한 HTML태그를 추가해주고 색상을 할당합니다.
			else {
				$(".CodeMirror-scroll").prepend("<span class='username_" + username + " username' style='top:" + (top - 8) + "px; left:" + (left + 5) + "px;'>" + username + "</span>");
				$(".CodeMirror-scroll").prepend("<span class='cursor_" + username + " cursor' style='top:" + top + "px; left:" + left + "px;'></span>");
				
				var red = Math.floor(Math.random()*206) - Math.floor(Math.random()*30);
				var green = Math.floor(Math.random()*206) - Math.floor(Math.random()*30);
				var blue = Math.floor(Math.random()*206) - Math.floor(Math.random()*30);
				
				var light_red = (red + 90 >= 255)? 255 : red + 90;
				var light_green = (red + 90 >= 255)? 255 : green + 90;
				var light_blue = (red + 90 >= 255)? 255 : blue + 90;
				
				var color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
				var light_color = '#' + light_red.toString(16) + light_green.toString(16) + light_blue.toString(16);
				
				var color1=["#FF5E00", "#4374D9", "#2F9D27", "#F361DC", "#FFE400", "#FF007F"];
 				var xx;
				
				
				if(username == 'fkawk38'){
 					xx = color1[0];
 					userimg = 'fkawk38.jpg';
 				}else if(username == 'yoon12345678910'){
 					xx = color1[1];
 					userimg = 'yoon12345678910.png';
 				}else if(username == 'wonbakery'){
 					xx = color1[2];
 					userimg = 'wonbarkery.jpg';
 				}else{
 					xx = color1[3];
 					userimg = 'default.png';
 				}
				
				
				$(".CodeMirror-scroll").find(".username_" + username).css("background-color", xx);
				$(".CodeMirror-scroll").find(".username_" + username).css("border-color", xx);
				$(".CodeMirror-scroll").find(".username_" + username).css("color", '#fff');
				$(".CodeMirror-scroll").find(".cursor_" + username).css("border-color", xx);
				
				
				
			}
		}

		this.updating_process_running = false;
	},
	
	//uuid 란 Universally Unique IDentifier입니다. 그냥 유일한 값을 생성하는 거라고 생각하시면 될 것 같습니다.
	generate_uuid: function(){
		var userid = username;

		var d = new Date();
		var timestamp = $.map([d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
		d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()], function(n, i) {
			return (n < 10) ? "0"+n : n;
		}).join("");

		return userid + "_" + timestamp;
	}, 
	
	//새로 접속할 때 호출되는 메서드입니다.
	join: function () {
		socket.emit("join", '{"channel": "workspace", "workspace": ' 
				+ '"'	+ this.projectEach + '",' + '"action":"join", "username":"' + username + '", "message":"hello"}');
	},
	
	//에디터를 떠날 때 호출되는 메서드입니다.
	leave: function () {
		socket.emit("leave", '{"channel": "workspace", "workspace":' 
			+ '"' + this.projectEach + '",' +'"action":"leave", "username":"' + username + '", "message":"goodbye"}');
	},
	
	//채팅 메시지를 출력하는 부분입니다.
	message_process : function(message){
		var self = this;
		
		if (socket.socket.connected) {
		
			//console.log(message);
			
			var encodedMsg = encodeURIComponent(message);
			
			socket.emit("message", '{"channel": "chat", "action":"send_message", "username":"' + username + '", "message":"' + encodedMsg + '"}');
		}
	}
};