<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
    <!-- 【ExtJS CSS】 -->
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/ext_icon.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/resources/jslib/ext/ux/treegrid/treegrid.css" />
	 
	<!-- 【ExtJS 3.3.1包】 -->
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ext-all.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/super.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/TabCloseMenu.js"></script>
	
	<!-- 【tree Grid】 -->
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGrid.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGridColumnResizer.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGridColumns.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGridLoader.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGridNodeUI.js"></script>
	<script type="text/javascript" src="${ctx}/resources/jslib/ext/ux/treegrid/TreeGridSorter.js"></script>
	
	<script type="text/javascript" src="${ctx}/HTML/util/vlidateUtil.js"></script>
	<script type="text/javascript">
		var cxt = "${ctx}";
	</script>
