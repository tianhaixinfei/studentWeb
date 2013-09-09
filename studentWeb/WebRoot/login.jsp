<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
String rootPath = request.getContextPath();
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String userId = (String)request.getSession().getAttribute("userId");
%>
<html>
  <head>
     <title>北京大学网上作业管理系统</title>
    <meta name="title" content="北京大学网上作业管理系统"/>
    <meta name="application-name" content="北京大学网上作业管理系统" />
	<link rel="Shortcut Icon" href="images/logo.ico" />
		
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/ext_icon.css" />
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ext-all.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/super.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/TabCloseMenu.js"></script>
	<script type="text/javascript" src="${ctx}/login.js"></script>
	
	<script type="text/javascript">
		var cxt = "${ctx}";
		var userId = '<%=userId %>'
	</script>
  </head>
  
  <body>
    <div id="hello-win">
		<div id="hello-tabs">
			<img border="0" width="450" height="70" src="${ctx}/resources/images/login/2.gif" />
		</div>
	</div>
	<div id="aboutDiv" class="x-hidden" style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
		ssssssssss
	</div>
	<div id="infoDiv" class="x-hidden" style='color: black; padding-left: 10px; padding-top: 10px; font-size: 12px'>
		ccccccccccc
	</div>
  </body>
</html>
