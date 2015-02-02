<%@ page language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class='header'>
<p class='userinfo'>
  <a href='mailto:${loginUser.email}'>${loginUser.userName}</a></p>
<p class='logout'><a href='${pageContext.servletContext.contextPath}/auth/logout.do'>로그아웃</a></p>
</div>