<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<jsp:include page="/common/Header.jsp"/>  
</head>
<body>
<div class='container'>
<jsp:include page="/common/LoginPanel.jsp"/>  
<h1>제품 목록</h1>
<p><a href='add.do' class='btn btn-primary'>새제품</a></p>
<table class='table table-hover'>
<tr>
  <th>#</th><th>제품</th><th>수량</th><th>제조사</th>
</tr>
<c:forEach items="${products}" var="product">
<tr>
  <td>${product.no}</td>
  <td><a href='view.do?no=${product.no}'>${product.name}</a></td>
  <td>${product.quantity}</td>
  <td>${product.maker}</td>
</tr>
</c:forEach>

</table>

<div id='pagingBar'>

<c:if test="${!empty prevPageNo}">
  <a href='list.do?pageNo=${prevPageNo}' class='btn btn-default'>이전</a>
</c:if>

<span>${currPageNo}</span>

<c:if test="${!empty nextPageNo}">
  <a href='list.do?pageNo=${nextPageNo}' class='btn btn-default'>다음</a>
</c:if>

</div>
</div>
<script src='../js/jquery-1.11.1.js'></script>
<jsp:include page="/common/Footer.jsp"/> 
</body>
</html>
















