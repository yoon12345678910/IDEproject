var prom;
var uid;
var rule='<hr>';
var ip = "http://192.168.0.160";

var pid;
$(function(){
	
	
	$.ajaxSetup({ async:false });
	$.post('/getSession', 
			function(data){
		console.log("넘어온 데이터 "+ data.result);
		
		uid = data.result.user;
		$.ajaxSetup({ async:true });
		
		$('#username').html(uid);
		
		loadProjectList(uid);
		
	});
	
	
	$(document).on('click', '.projectRow', function() {
	
		prom = $(this).text();
		var projectName= $(this)[0].innerText.split(" ")[0];
		pid = $(this).attr('pid');
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
	});
	
	$('.delete').click(function() {
		var deleterPid = $('.user_span').attr('pid');
		var deleterUid = $('.user_span').attr('uid');
		console.log(deleterPid+ "duid");
		console.log(deleterUid+ "dpid");
		 $.post(ip+':8080/kjs/json/collabo/deleteCollabo.do' /* URL */
			      , { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
			        dPid : deleterPid,       
			        dUid : deleterUid
			      } 
			      , function(result){ /* 서버로부터 응답을 받았을 때 호출될 메서드*/
			        if (result.status == "success") {
			        	alert("콜라보 삭제 성공");
			        	loadProjectList(uid);
			        } else {
			          alert("등록 실패!");
			        }
			      } 
			      , 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리*/)
			      
		});
		

	
});
$('#createBtn').click(
		function() {
			 var date = new Date();
			 var str = date.getFullYear()+'-';
			 if (date.getMonth() < 9) str += '0';
			    str += (date.getMonth() + 1) + '-';
			    
		    if (date.getDate() < 10) str += '0';
			    str += date.getDate();
			    
			prom = prompt('프로젝트명 입력.');
			if(prom==''){
				alert('프로젝트명을 입력해주세요');
			}else{
			  $.post(ip+':8080/kjs/json/project/addProject.do' /* URL */
				      , { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
				        pname : prom,       
				        pdate : str,
				        uid : uid
				      } 
				      , function(result){ /* 서버로부터 응답을 받았을 때 호출될 메서드*/
				        if (result.status == "success") {
				        	alert("등록 성공");
				        	loadProjectList(uid);
				        	var pid = result.pid;
				        } else {
				          alert("등록 실패!");
				        }
				      } 
				      , 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리*/)
			}
				      
			
			
			
			
		});
  function loadProjectList(uid) {
  	console.log("aa",uid);
  	
  	console.log("bb", ip);
  	$.getJSON(ip+':8080/kjs/json/collabo/listCollabo.do?uid=' + uid, 
  	    function(data){
  		console.log("dd", data);
  			console.log('data = ' + data.memberNo);
  	      var collabos = data.collabos;
  	      console.log("cc", collabos);
  	      require(['stylesheets/js/text!stylesheets/js/templates/product-table.html'], function(html){
  	        var template = Handlebars.compile(html);
  	        $('#projectList').html(template(data));
  	      });
  	    });
  	
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
  	
  	
  /*	$('.sidebar-menu-ul').append($('<div>').append(
			$('<li>').attr('class', 'pro').attr('id', prom)
					.addClass(prom).html(prom).append($('<div>').attr('class','users').html('멤버 X명 존재함.'))
												 .append($('<div>').attr('class','arrow'));*/
//	$('<li>').append($('<div>').attr('class','arrow'));
  	};
		
		
		
		

//$(document).ready(function(){});
