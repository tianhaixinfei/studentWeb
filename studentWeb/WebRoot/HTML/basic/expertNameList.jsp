<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<%
String rootPath = request.getContextPath();
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>专家管理</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" > 
			<!-- 【使用缓存】 -->
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/comm.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/addStep.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/addCase.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/treegrid.css" />
		<!-- 【ExtJS主题皮肤】 -->
		<link id='theme' rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/xtheme-blues.css" />
		
		<!-- 【ExtJS 3.3.1包】START -->
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ext-all.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/locale/ext-lang-zh_CN.js" ></script>
		<!-- 【ExtJS 3.3.1包】END -->

		<!-- 【IE9兼容性方案】START -->
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ie94ext.js"></script>
		<!-- 【IE9兼容性方案】END -->
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/changeTheme.js"></script>	
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGridSorter.js"></script> 
        <script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGridColumnResizer.js"></script> 
        <script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGridNodeUI.js"></script> 
        <script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGridLoader.js"></script> 
        <script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGridColumns.js"></script> 
        <script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/treegrid/TreeGrid.js"></script> 
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/changeTheme.js"></script>
		
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/fileUploadField.js"></script>
		
		<script type="text/javascript" src="<%=rootPath%>/basic/expertNameList.js"></script>
		<script type="text/javascript">
			Ext.onReady(function(){
				var expertNameList  = new com.basic.expertNameList({
					region:'center',
					title:'用户列表'
				});
				
				var view  = new Ext.Viewport({
					layout:'fit',
					items:[expertNameList]
				})
			})
		</script>
	</head>
  <body>
  </body>
</html>
