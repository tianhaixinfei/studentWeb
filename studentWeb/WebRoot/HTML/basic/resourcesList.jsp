<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> 

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<%@ include file="../../util_js.jsp" %>
		<script type="text/javascript" src="${ctx}/HTML/basic/resourcesList.js"></script>
		<script type="text/javascript">
			var cxt = "${ctx}";
		</script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var resourcesList  = new com.basic.resourcesList({
					region:'center'
				});
				var view  = new Ext.Viewport({
					layout:'fit',
					items:[resourcesList]
				})
			})
		</script>
	</head>
  <body>
  </body>
</html>
