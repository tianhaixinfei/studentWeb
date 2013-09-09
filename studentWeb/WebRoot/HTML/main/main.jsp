<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<%@ taglib uri="http://www.super.com.cn" prefix="super"%>
<%
String loguser = (String)request.getSession().getAttribute("loginUserName");
String userId = (String)request.getSession().getAttribute("userId");
if(loguser == null || loguser.equals("")) {
	String ctx = request.getContextPath();
	response.sendRedirect(ctx+"/login.jsp");
	return;
}
%>
<!DOCTYPE html>
<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>北京大学网上作业管理系统</title>
    <meta name="title" content="北京大学网上作业管理系统"/>
    <meta name="application-name" content="北京大学网上作业管理系统" />
    <%@ include file="../../util_js.jsp" %>
	<link rel="Shortcut Icon" href="${ctx}/resources/images/logo.ico" />
	
	<!-- 【自定义JS】 -->
	<script type="text/javascript" src="${ctx}/HTML/main/index.js"></script>
	<script type="text/javascript" src="${ctx}/HTML/main/MainTopPanel.js"></script>
	<script type="text/javascript" src="${ctx}/HTML/main/MainSouthPanel.js"></script>
	<script type="text/javascript" src="${ctx}/HTML/main/MenuTree.js"></script>
	<script type="text/javascript" src="${ctx}/HTML/main/MainCenterPanel.js"></script>
	<script type="text/javascript" src="${ctx}/HTML/main/main.js"></script>
	<style type="text/css">
		.banner {
			font-family: "宋体";
			font-size: 12px;
			color:EAAA85;
		}
	</style>
	<script type="text/javascript">
		var micolor = 'color:blue';
		var cxt = "${ctx}";
		var userId = '<%=userId %>'
	</script>
  </head>
  
  <body onLoad="aClock()">
	 <div id="previewDiv"></div>
  	 <super:div type="north"></super:div>
  </body>
  <script type="text/javascript">
 	 function aClock(){
		 var now=new Date();
		 var hour=now.getHours();
		 var mins=now.getMinutes();
		 var sec=now.getSeconds();
		 var timeStr=""+hour;
		 timeStr+=((mins<10)?":0":":")+mins;
		 timeStr+=((sec<10)?":0":":")+sec;
		 timeStr+=(hour>=12)?" PM.":" AM.";
		 document.getElementById('rTime').innerHTML  = timeStr;
		 clockId=setTimeout("aClock()",1000);
	 }
 	 
 	 document.getElementById('loguser').innerHTML  = '<%=loguser %>';
 	 
 	var w = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
 	var z = w[new Date().getDay()];
 	document.getElementById('weekDays').innerHTML  = z;
  </script>
</html>
