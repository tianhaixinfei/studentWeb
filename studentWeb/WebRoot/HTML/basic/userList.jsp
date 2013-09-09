<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> 

<%@ include file="../../util_js.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<title>用户管理</title>
		<script type="text/javascript" src="${ctx}/HTML/basic/user_role.js"></script>
		<script type="text/javascript" src="${ctx}/HTML/basic/userNameList.js"></script>
		<script type="text/javascript">
			var cxt = "${ctx}";
		</script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var userList  = new com.basic.userList({
					region:'center',
					cxt:cxt
				});
				userList.showGlPass();
				
				var view  = new Ext.Viewport({
					layout:'fit',
					items:[userList]
				})
			})
		</script>
	</head>
  <body>
  </body>
</html>
