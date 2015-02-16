var prom;
var uid;
var rule='<hr>';
var ip = "http://192.168.0.7";
var window = $("#create_project_window");
var projectName;
var pid;
var date;
var auth;
$(function(){
	
	
	$.ajaxSetup({ async:false });
	$.post('/getSession', 
			function(data){
		console.log("넘어온 데이터 "+ data.result);
		
		uid = data.result.user;
		$.ajaxSetup({ async:true });
		
		$('#username').html(uid);
		
		$.post('/existUserImg', {userimg : '/home/yoon/kjs/userimg/' + uid} , function(data){
			
			if(data == false){
				$('#uuu').attr("src", "/home/" + "default.png");
				$('#imgDelete').attr('disabled','disabled');
			}else{
				$('#uuu').attr("src", "/home/" + data.split("/")[5]);
				$('#imgDelete').removeAttr('disabled');
			}
		});
		
		loadProjectList(uid);
		
	});
});
	
	$('#imgChange').on('click', function(){
			window = $("#img_change_window").kendoWindow({
			    width: "500px",
			    height: "0px",
			    actions: ["Close"],
			    title: "image change",
			    close: function() {
			     }
			}).data("kendoWindow").center().open();
	});

	$('#imgDelete').on('click', function(){
			window = $("#img_delete_window").kendoWindow({
			    width: "500px",
			    height: "0px",
			    actions: ["Close"],
			    title: "image delete",
			    close: function() {
			     }
			}).data("kendoWindow").center().open();
	});	
	
	$('#img_delete_btn').on('click', function(){
		var img_delete_file;
		 $.ajaxSetup({ async:false });
		 $.post('/existUserImg', {userimg : '/home/yoon/kjs/userimg/' + uid} , function(data){
					img_delete_file = data.split("/")[5];
		 });
		 $.ajaxSetup({ async:true });
		 
		 $.post('/deleteF', {  source : '/home/yoon/kjs/userimg/' + img_delete_file}  , function(data){
			 $('#uuu').attr("src", "/home/" + "default.png");
			 $('#imgDelete').attr('disabled','disabled');
			 window = $("#img_delete_window").kendoWindow({}).data("kendoWindow").close();
		 }); 
		 
	});

	$(document).on('click', '.projectRow', function() {
		
 		$('#masterUser').html($(this).attr('uid'));
 		$('#createDay').html($(this).attr('pdate'));
		
	
		prom = $(this).text();
		projectName= $(this)[0].innerText.split(" ")[0];
		pid = $(this).attr('pid');
		auth = $(this).attr('auth');
		date = $(this).attr('pdate');
		
		$('#innerTitle').html('<div id="titleRow"><span class="user_span" pid="'+pid+'" uid="'+uid+'" >'
				+uid+ "/"+ '</span>' + projectName +'</div>');
		
		if($(this).hasClass('selected')){
		}else {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		
		$('#center_project_main').css('visibility', 'hidden');
		$('#init_main_content').css('visibility', 'hidden');
	
		$('#projectTitle').css("display", "");
		$('#projectInfo').css("display", "");
		
		
		console.log("aaaa", $('#editor'));
		//$('#editor')[0].value('dddd&lt;strong&gt;aaaa&lt;/strong&gt;');
		//$('#editor').val("AA");
/*		 $.post('/loadMemo'  
		      , {  
		      	pid : $(this).attr('pid')
		      } 
		      , function(result){  
		      	$('#editor').html("AA");
		        		console.log("test", result.result[0].PMEMO);
		      } 
		      , 'json');*/
		

	});
	
	$('#memoSave').click(function(){
		console.log("aaaa", $('#editor'));
		console.log("bbb", $('#editor')[0].value);
	});
	
	
	var window = $("#delete_project_window");
	
	$('#deleteBtn').click(function() {
	$('#delete_text').html("Are you sure you want to delete" +"&nbsp;'" + projectName + "'"+"?");
	console.log("tt", pid);
	console.log("projectName", projectName);
	
			window = $("#delete_project_window").kendoWindow({
			    width: "500px",
			    height: "0px",
			    actions: ["Close"],
			    title: "DELETE PROJECT",
			    close: function() {
			     }
			}).data("kendoWindow").center().open();

});
	
	$('#delete_project_btn').click(function() {
		 $.post('/deleteF', {  source : '/home/yoon/kjs/' + projectName}  , function(data){
			}); 
		 $.post(ip+':8080/kjs/json/collabo/deleteCollabo.do' 
		      , {  
		        dPid : pid,       
		        dUid : uid
		      } 
		      , function(result){  
		        if (result.status == "success") {
		        	 location.href = '/dashboard';
		        } else {
		        }
		      } 
		      , 'json'  );
		 
		 window = $("#delete_project_window").kendoWindow({}).data("kendoWindow").close();
		 
	});
	
	
	$('#create_project_btn').click(function() {
		 date = new Date();
		 var str = date.getFullYear()+'-';
		 if (date.getMonth() < 9) str += '0';
		    str += (date.getMonth() + 1) + '-';
		    
	    if (date.getDate() < 10) str += '0';
		    str += date.getDate();
		    
				 $.post('/createFolder'  
				      , {  
				      	folder : "/home/yoon/kjs/" + $('#create_input').val()
				      } 
				      , function(result){  
				        if (result.status == "success") {
				        	loadProjectList(uid);
				        } else {
				        	
				        }
				      } 
				      , 'json'  );
		    
		
		 $.post(ip+':8080/kjs/json/project/addProject.do'  
		      , {  
		        pname : $('#create_input').val(),       
		        pdate : str,
		        uid : uid
		      } 
		      , function(result){  
		        if (result.status == "success") {
		        	loadProjectList(uid);
		        	var pid = result.pid;
		        } else {
		        }
		      } 
		      , 'json'  );
		 $('#create_input').val('');
		 window = $("#create_project_window").kendoWindow({}).data("kendoWindow").close();
		
		 
	});



$('#createBtn').click(
		function() {
				window = $("#create_project_window").kendoWindow({
				    width: "500px",
				    height: "0px",
				    actions: ["Close"],
				    title: "CREATE NEW WORKSPACE",
				    close: function() {
				     }
				}).data("kendoWindow").center().open();
				
		});


		$('#create_input').keyup(function(){
				if($('#create_input').val().length == 0){
					
					$('#create_text').html("Name cannot bpppe empty.");
					$('#create_text').css('color', 'red');
					$('#create_project_btn').attr('disabled','disabled');
					
				}else{
							$.post("/project_check",{
								pname : $('#create_input').val()
								},function(data){
									if(data.result == '무'){
										$('#create_text').css('color', 'green');
										$('#create_text').html("OK!");
										$('#create_project_btn').removeAttr('disabled');
									} else{
										$('#create_text').css('color', 'red');
										$('#create_text').html("already exists.");
										$('#create_project_btn').attr('disabled','disabled');
									}
								})
						      
				      }
			
		});


  function loadProjectList(uid) {
  	$.getJSON(ip+':8080/kjs/json/collabo/listCollabo.do?uid=' + uid, 
  	    function(data){
  		console.log("ddd", data);
  			console.log('data = ' + data.memberNo);
  	      var collabos = data.collabos;
  	      require(['stylesheets/js/text!stylesheets/js/templates/product-table.html'], function(html){
  	        var template = Handlebars.compile(html);
  	        $('#projectList').html(template(data));
  	      });
  	    });
  };
  	$('#logout').on('click', function(){
  		$.post('/sessionDestroy', function(data){
  			if(data.result == 'sessionInit'){
  				location.href = '/login';
  			}
  		});
  	});
  	
  	$('#homeBtn').on('click',function(){
  		location.href = '/dashboard';
  		
  	});
  	
  	$('#startBtn').on('click', function(){
  		
  		$.post('/setSession', {
  			pname : projectName,
  			pid : pid,
  			auth :auth,
  			date :date
  			
  		},function(data){
  			
  			if(data.result == '성공'){
  				location.href = '/loadPage';
  			}
  		});
  	});
  	
  	
  	$('#img_change_btn').click(function() {
  		
  		var formData = new FormData();
  	     $.each($("input[name=files]")[0].files, function(i, file) {
  	    	 formData.append("files", file);
  	      });  
  	     
  	   	$.ajaxSetup({ async:false });
  	    $.ajax({
  	        url: '/img_import',
  	        type: "post",
  	        dataType: "text",
  	        data: formData,
  	        processData: false,
  	        contentType: false,
  	        success: function(result, textStatus, jqXHR) {
  	        		$('#uuu').attr("src", "/home/" + result.split("/")[5]);
  	        		$('#imgDelete').removeAttr('disabled');
  	          	 window = $("#img_change_window").kendoWindow({}).data("kendoWindow").close();
  	         }, 
  	        error: function(jqXHR, textStatus, errorThrown) {
  	         }
  	    	});
  	  	$.ajaxSetup({ async:true  });
  	});
  	
  	
  	
  	
  	
  	
