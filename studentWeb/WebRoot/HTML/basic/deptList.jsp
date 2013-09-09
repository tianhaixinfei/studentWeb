<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /> 

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<%@ include file="../../util_js.jsp" %>
		
		<script type="text/javascript" src="${ctx}/HTML/basic/treeList.js"></script>
		<script type="text/javascript" src="${ctx}/HTML/basic/deptNameList.js"></script>
		<script type="text/javascript">
			var cxt = "${ctx}";
		</script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var deptTreePanel = new com.basic.deptTreePanel({
					region:'west',
					layout:'fit',
					collapsible: true,
					split: true,
					collapseMode: 'mini',
					width: 200,
					title:'组织结构数'
				});
				var deptList  = new com.basic.deptList({
					region:'center'
				});
				
				deptTreePanel.tree.on('click', function(obj) {
					deptList.loadData(obj);
				});
				
				var view  = new Ext.Viewport({
					layout:'border',
					items:[deptTreePanel,deptList]
				})
			})
		</script>
	</head>
  <body>
  </body>
</html>
