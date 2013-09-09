<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> 

<%@ include file="../../util_js.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<title>用户管理</title>
		<script type="text/javascript" src="PieceSelect_TreePanel.js"></script>
		<script type="text/javascript">
			var globalCtx = '${ctx}';
		</script>
		
		<script type="text/javascript">
			//1、页面广告效果查询
			Ext.BLANK_IMAGE_URL = '${ctx}/resources/images/default/s.gif';
			var cxt = '${ctx}';
			Ext.onReady(function() {
				var pageTab = new com.stu.util.PieceSelect_TreePanel({});
				
				var view  = new Ext.Viewport({
					title:'信息选择',
	                layout:'fit',
	                closeAction:'hide',
	                width:645,
	                height:880,
	                plain: true,
	                items:[pageTab]
	            });
			});
		</script>
	</head>
	<body>
	
	</body>
</html>