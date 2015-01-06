var editor = {
	codemirror: null,
	
	init: function () {
		var self = this;
		
		this.codemirror = CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			lineWrapping: true,
			extraKeys: {
				"Ctrl-S": function(cm) {
					self.save();
				
			}
		});
		
		this.codemirror.on('change', function(i, e) {
			if(collaboration.updating_process_running == false){
				collaboration.update_change(e);
			}
		});
		
		this.codemirror.on('cursorActivity', function(i, e) {
			collaboration.update_cursor({
				line: self.codemirror.getCursor().line,
				ch: self.codemirror.getCursor().ch
			});
		});
		
		$("#input input").keypress(function(evt){
			if((evt.keyCode || evt.which) == 13){
				evt.preventDefault();
				
				collaboration.message_process($(this).val());
				$(this).val("");
			}
		});
		
		
	},
	
	load: function () {
		var self = this;
		
		$.get('/get_file_contents', function (data) {
			self.codemirror.setValue(data);
			self.codemirror.focus();
		});
	},
	
	save: function () {
		var postdata = {
			contents: this.codemirror.getValue()
		};
		
		$.post('/put_file_contents', postdata, function (data) {
			$("#messages").append("<div class='alarm'>File saved!</div>");
		});
	}
};
