<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/common/Header.jsp"/> 
<style>
.prod-pho {
  border: 1px solid gray;
  width: 200px;
  height: 200px;
}
</style> 
</head>
<body>
<div class='container'>
<jsp:include page="/common/LoginPanel.jsp"/>  
<h1>제품 정보</h1>
<form class='form-horizontal' role='form' action='update.do' method='post'>
<div class='form-group'>
  <label for='no' class='col-sm-2 control-label'>번호</label>
  <div class='col-sm-10'>
    <input type='text' class='form-control' readonly 
        id='no' name='no' value='${product.no}'>
  </div>
</div>
<div class='form-group'>
  <label for='name' class='col-sm-2 control-label'>제품</label>
  <div class='col-sm-10'>
    <input type='text' class='form-control' 
        id='name' name='name' value='${product.name}'>
  </div>
</div>
<div class='form-group'>
  <label for='qty' class='col-sm-2 control-label'>수량</label>
  <div class='col-sm-10'>
    <input type='text' class='form-control' 
        id='qty' name='quantity' value='${product.quantity}'>
  </div>
</div>
<div class='form-group'><%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
  <label for='mkno' class='col-sm-2 control-label'>제조사</label>
  <div class='col-sm-10'>
   <select id='mkno' name='makerNo' class='form-control'>
      <option value="0">제조사를 선택하세요</option>
      <c:forEach items="${makers}" var="maker">
        <option value="${maker.no}">${maker.name}</option>
      </c:forEach>    
    </select>
  </div>
</div>
<div class='form-group'>
  <label for='madeDate' class='col-sm-2 control-label'>제조일</label>
  <div class='col-sm-10'>
    <input type="date" class='form-control' 
        id='madeDate' name='madeDate' 
        value="<fmt:formatDate 
                value="${product.madeDate}" 
                pattern="yyyy-MM-dd"/>">
  </div>
</div>
<div class='form-group'>
  <label for='photosDiv' class='col-sm-2 control-label'>사진</label>
  <div class='col-sm-10' id='photosDiv'>
  <c:forEach items="${photos}" var="photo">
    <img class='prod-pho' 
      src='${pageContext.servletContext.contextPath}/fileupload/${photo.url}'>
  </c:forEach>
  </div>
</div>
<div class='form-group'>
  <div class='col-sm-offset-2 col-sm-10'>
    <button id='btnUpdate' type='submit' class='btn btn-primary'>변경</button>
    <button id='btnDelete' type='button' class='btn btn-primary'>삭제</button>
    <button id='btnCancel' type='button' class='btn btn-primary'>취소</button>
  </div>
</div>
</form>
</div>
<script src='../js/jquery-1.11.1.js'></script>
<script>
  $(function(){
	  $('#mkno').val(${product.makerNo});
  });

  $('#btnCancel').click(function(){
    location.href = 'list.do';
  });
  $('#btnDelete').click(function(){
    if (window.confirm('삭제하시겠습니까?')) {
      location.href = 'delete.do?no=${product.no}'
    }
  });
  $('#btnUpdate').click(function(){
    if ( $('#name').val().length == 0) {
      alert('제품명은 필수 입력 항목입니다.');
      return false;
    }
    if ( $('#qty').val().length == 0) {
      alert('수량은 필수 입력 항목입니다.');
      return false;
    }
    if ( $('#mkno').val() == '0') {
      alert('제조사를 선택하세요');
      return false;
    }
  });
</script>
<jsp:include page="/common/Footer.jsp"/> 
</body>
</html>















