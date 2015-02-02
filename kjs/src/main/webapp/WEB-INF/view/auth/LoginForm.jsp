<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/common/Header.jsp"/>  
</head>
<body>
<div class='container'>
<h1>로그인</h1>
<form class='form-horizontal' role='form' 
  action='login.do' method='post'>
<div class='form-group'>
  <label for='uid' class='col-sm-2 control-label'>아이디</label>
  <div class='col-sm-10'>
    <input type='text' class='form-control' 
        id='uid' name='uid' placeholder='아이디' value='${uid}'>
  </div>
</div>
<div class='form-group'>
  <label for='pwd' class='col-sm-2 control-label'>암호</label>
  <div class='col-sm-10'>
    <input type='password' class='form-control' 
        id='pwd' name='pwd' placeholder='암호'>
  </div>
</div>
<div class="form-group">
  <div class="col-sm-offset-2 col-sm-10">
		<div class='checkbox'>
	    <label>
		    <input type='checkbox' id='save' name='save'> 아이디 저장
		  </label>
		</div>
  </div>
</div>
<div class='form-group'>
  <div class='col-sm-offset-2 col-sm-10'>
    <button id='btnAdd' type='submit' class='btn btn-primary'>로그인</button>
  </div>
</div>
</form>
</div>
<script src='../js/jquery-1.11.1.js'></script>
<jsp:include page="/common/Footer.jsp"/> 
</body>
</html>


