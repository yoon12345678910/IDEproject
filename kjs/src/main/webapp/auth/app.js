$(function(){
  $('.footer').load('../common/footer.html');
  
  $('#btnLogin').click(function(event){
	  document.cookie = $('#uid').val();
	  
    $.post('../json/auth/login.do'
        , {
          uid : $('#uid').val(),
          pwd : $('#pwd').val(),
          save : $('#save').is(':checked')
        }
        , function(data){
          if (data.status == 'success') {
            location.href = '../product/app.html';
          } else {
            alert('로그인 아이디 또는 암호가 맞지 않습니다.');
            $('#pwd').val('');
          }
        }
        , 'json');
  });
});



























