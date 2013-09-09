<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> 

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<%@ include file="../../util_js.jsp" %>
			<!-- 【使用缓存】 -->
		<script type="text/javascript" src="${ctx}/HTML/util/PieceSelect_TreePanel.js"></script>
		<script type="text/javascript" src="${ctx}/HTML/basic/courseList.js"></script>
		
		<script type="text/javascript">
			var cxt = "${ctx}";
		</script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var roleList  = new com.basic.courseList({
					region:'center'
				});
				var view  = new Ext.Viewport({
					layout:'fit',
					items:[roleList]
				})
			})
		</script>
	</head>
  <body>
  </body>
</html>
