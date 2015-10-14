var editor = {
		
	codemirror: null,
	num : null ,
	currentFile: null,
	currentProjecct : null,
	currentRoom: null,
	//에디터를 초기화할 때 호출되는 메서드입니다.
	init: function () {
		var self = this;
		
		this.currentRoom = this.currentFile.substring(this.currentFile.lastIndexOf("/")+1, this.currentFile.length);
	
		//코드 미러를 이용하여 에디터를 생성하는 부분입니다.
		this.codemirror = CodeMirror.fromTextArea(document.getElementById("code_" + this.num), {
			lineNumbers: true,
			lineWrapping: true,
			autoCloseTags: true,
			tabMode: 'indent',
			theme : 'twilight',
			extraKeys: {
				"Ctrl-S": function(cm) {self.save();}, "Ctrl-Space": "autocomplete"
			},
			mode: {name: "htmlmixed", globalVars: true},
			value: document.documentElement.innerHTML
		});
		
		//코드 미러 에디터의 변경사항이 발생할 때 호출되는 콜백 함수를 지정하는 부분입니다.
		this.codemirror.on('change', function(i, e) {
			if(collaboration.updating_process_running == false){
				//에디터의 변경사항을 전달하도록 조치 합니다. collaboration 객체의 update_change()를 이용합니다.
		
				self.updatePreview();
				collaboration.update_change(e);
			}
		});
		
		//사용자들간의 커서 움직임을 공유하기 위해 커서 움직임이 발생할 때 호출되는 콜백 함수를 지정하는 부분입니다.
		this.codemirror.on('cursorActivity', function(i, e) {
			//collaboration 객체의 update_cursor()를 이용하여 커서의 위치를 전달합니다.
			collaboration.update_cursor({
				line: self.codemirror.getCursor().line,
				ch: self.codemirror.getCursor().ch
			});
		});
	},
	
	updatePreview: function(){
	  var previewFrame = document.getElementById('preview');
	  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
	  
	  //previewFrame.contentWindow.location.reload();
	  preview.open();
	  preview.write(this.codemirror.getValue());
	  preview.close();
	},
	
	updateRoom: function(fname){
		var self = this;
/*		self.codemirror.setValue(data);
		self.codemirror.focus();*/
		this.currentRoom = fname;
		collaboration.update_room(fname);
	},
	
	
	//처음 파일 읽을 때.
	firstload: function (){
		var self = this;
		
		$.get('/get_first_file_contents',{pname : this.currentProject, fname : this.currentFile}, function (data) {
			//코드미러의 내용을 받아온 파일 내용으로 채웁니다.
			self.codemirror.setValue(data);
			self.codemirror.focus();
		});
	},
	//파일을 읽을 때 호출되는 메서드입니다.
	load: function () {
		var self = this;
		
		//get_file_contents라는 URI를 통해 파일 내용을 받아옵니다. 성공적으로 전송받으면 아래처럼 지정한 콜백함수를 실행합니다.
		$.get('/get_file_contents', function (data) {
			//코드미러의 내용을 받아온 파일 내용으로 채웁니다.
			self.codemirror.setValue(data);
			self.codemirror.focus();
		});
	},
	
	//파일을 저장할 때 호출되는 메서드입니다.
	save: function () {
		console.log("Log-save", this.currentFile);
		//작성한 내용을 저장하기 위해 코드미러의 내용을 가져와서 메시지를 만듭니다.
		var postdata = {
			contents: this.codemirror.getValue(),
			currentFile: this.currentFile
		};
		
		var staticNotification = $("#staticNotification").kendoNotification({
      appendTo: "#notify"
		}).data("kendoNotification");
/*		
		//put_file_contents라는 URI를 통해 파일 내용을 전달합니다. 서버는 이를 받아 저장할 것입니다.
		$.post('/put_file_contents', postdata, function (data) {
			staticNotification.show("File saved!!!...");
		});*/
	}
};