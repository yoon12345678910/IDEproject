<%@page import="java.io.PrintWriter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="/common/Header.jsp"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>오류</title>
</head>
<body>

<div class='container'>
<p>잠시 후 다시 시도하세요.</p>
<pre> <!-- 출력 콘텐츠에 라인 갱신 코드를 인정한다. -->
<%
Exception e = (Exception)request.getAttribute("error");
e.printStackTrace(new PrintWriter(out));
%>

</pre>
</div>

<jsp:include page="/common/Footer.jsp"/> 
</body>
</html>














