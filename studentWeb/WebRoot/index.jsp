<%@ page language="java"  pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
System.out.println(basePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>北京大学网上作业管理系统</title>
    <meta name="title" content="北京大学网上作业管理系统"/>
    <meta name="application-name" content="北京大学网上作业管理系统" />
	<link rel="Shortcut Icon" href="images/favicon.ico" />
		
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript">
	    var cxt = '<%=basePath %>';
		window.location.href = cxt+"login.jsp";
	</script>
  </head>
  
  <body>
  </body>
</html>
