<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<%String rootPath = request.getContextPath();%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<title>作业预览</title>
		<base href="<%=basePath%>">
		 <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />  
		<!-- 【使用缓存】 -->
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/ext-all.css" />
		<!-- 【ExtJS主题皮肤】 -->
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/xtheme-blues.css" />
		<!-- 【ExtJS 3.3.1包】START -->
		
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/comm.css" />
		
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ext-all.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/locale/ext-lang-zh_CN.js" ></script>
		<!-- 【ExtJS 3.3.1包】END -->

		<!-- 【IE9兼容性方案】START -->
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ie94ext.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/ext/ux/changeTheme.js"></script>	
		<!-- 【IE9兼容性方案】END -->
		<script type="text/javascript" src="<%=rootPath%>/resources/jslib/pdfViewer/js/flexpaper_flash.js"></script>
		<style>
			#phones {
			    background-color: #fff;
			   /* text-shadow: #fff 0 1px 0;*/
			}
			
			#phones ul {
			    position: relative;
			    display: block;
			    height: auto;
			    font-size: 85%;
			}
			
			#phones ul li img {
			    margin-bottom: 1px;
			    border:1px solid black;
			    -moz-box-shadow:8px 8px 8px #CCCCCC;
				-webkit-box-shadow:8px 8px 8px #CCCCCC;
				filter: progid:DXImageTransform.Microsoft.Shadow(Strength=8, Direction=135, Color="#aaaaaa");
			}
			
			#phones ul li {
			    float: left;
			    padding: 15px 25px;
			    margin: 5px;
			/*    margin: 10px 0 0 25px;*/
			    text-align: center;
			    line-height: 1.25em;
			    color: #333;
			    font-family: "Helvetica Neue",sans-serif;
			    height: 113px;
			    width: 112px;
			    overflow: hidden;
			    border-top: 1px solid transparent;
			    cursor: pointer;
			}
			
			#phones ul li.phone-hover {
			    background-color: ;
			    -moz-background-clip:border;
			    -moz-border-radius: 8px;
			   	-webkit-border-radius: 8px;
				-moz-background-inline-policy:continuous;
				-moz-background-origin:padding;
				background:#eee url(/DEP/resources/images/default/grid/row-over.gif) repeat-x scroll left top;
			}
			
			/*
			#phones ul li.x-view-selected {
			    background-color: rgba(100, 100, 100, .15);
			    -moz-border-radius: 8px;
			    -webkit-border-radius: 8px;
			    border-top: 1px solid rgba(0, 0, 0, .15);
			}
			*/
			#phones ul li.x-view-selected {
			    	-moz-background-clip:border;
					-moz-background-inline-policy:continuous;
					-moz-background-origin:padding;
					-moz-border-radius: 8px;
			   	    -webkit-border-radius: 8px;
			   	    background:#EFF5FB url(/DEP/busi/commTool/sample-over.gif) repeat scroll center bottom;
					/*background:#EFF5FB url(/DEP/resources/images/comm/selected.gif) no-repeat scroll right bottom;*/
			}
			#phones ul li img {
			/*    display: block;*/
			}
			
			#phones li strong {
			    color: #000;
			    display: block;
			}
			
			#phones li span {
			    color: #999;
			}
			
		</style>
	</head>
	<body>
	
	</body>
	<script language="javascript">
	Ext.onReady(function() {
		Ext.BLANK_IMAGE_URL = '<%=rootPath%>/resources/images/default/s.gif';
		Ext.QuickTips.init();
    var store = new Ext.data.ArrayStore({
        proxy   : new Ext.data.MemoryProxy(),
        fields  : ['hasEmail', 'hasCamera', 'id', 'name', 'price', 'fileName', 'camera', 'color', 'type', 'reviews', 'screen-size']
    });
    
    store.loadData([
        [true,  false, 1,  "石油化工分析",                              70,  "20018863-1_l.jpg", 2,   "Pink",             "Slider",             359, 2.400000],
        [true,  true,  2,  "石油化工分析",        180, "20469572-1_l.jpg", 3.2, "Future black",     "Candy bar",          11,  0.000000],
        [true,  true,  3,  "石油炼制工艺",                        155, "20479116-1_l.jpg", 2,   "Black",            "Candy bar",          113, 0.000000],
        [true,  true,  4,  "石油化工分析",           499, "21008400-1_l.jpg", 5,   "Black",            "Slider",             320, 3.500000],
        [true,  false, 5,  "石油化工分析",                      65,  "9168230-1_l.jpg",   0.3, "Silver",           "Folder type phone",  5,   2.200000],
        [true,  true,  6,  "S",                       180, "1.jpg", 8,   "Black",            "Candy bar",          79,  0.000000],
        [true,  true,  7,  "石油化工分析",      135, "2.jpg", 2,   "Frost",            "Candy bar",          320, 2.640000],
        [true,  true,  8,  "石油化工分析",           70,  "3.jpg", 2,   "Urban gray",       "Slider",             1,   0.000000],
        [true,  true,  9,  "石油化工分析",           170, "4.jpg", 2,   "blue", "Candy bar",          319, 2.360000],
        [true,  true,  10, "石油化工分析",           274, "5.jpg", 3.2, "Luxury silver",    "Slider",             5,   0.000000],
        [false, false, 11, "石油化工分析",                170, "6.jpg", 2,   "Blue",             "Candy bar",          344, 2.000000],
        [false, true,  12, "石油化工分析",                     50,  "7.jpg", 2,   "Black",            "Candy bar",          38,  0.000000]
    ]);
    
    var dataview = new Ext.DataView({
        store: store,
        tpl  : new Ext.XTemplate(
            '<ul>',
                '<tpl for=".">',
                    '<li class="phone" style="border:4px double black;-moz-background-clip:border;-moz-border-radius: 8px;-webkit-border-radius: 8px;">',
                        '<img width="50" height="64" src="/DEP/resources/images/comm/books/{fileName}" />',
                        '<strong>{name}</strong>',
                        '<span>作者：{color} <a style="color:red;font-size:8pt" href="javascript:void(0);" onclick="showBook();return false;">阅读</a></span>',
                    '</li>',
                '</tpl>',
            '</ul>'
        ),
        id: 'phones',
        itemSelector: 'li.phone',
        overClass   : 'phone-hover',
        style:'background:white',
        singleSelect: true,
        multiSelect : true,
        autoScroll  : true
    });
    
    var tbar = new Ext.Toolbar({
        items  : ['图书名称:', {
        	xtype:'textfield',
        	emptyText:'过滤筛选图书',
        	width:100
        }]
    });
    
    var panel = new Ext.Panel({
        title: '丛书列表',
        layout: 'fit',
        items : dataview,
        height: 615,
        width : 800,
        tbar  : tbar
    });
    
    new Ext.Viewport({
	    layout: 'fit',
	    items: [panel]
	});
});

function showBook() {
	var root = new Ext.tree.AsyncTreeNode({
		text: '根节点',
		expanded: true
	});
	new Ext.Window({
		width:document.body.clientWidth*0.8,
		height:document.body.clientHeight*0.8,
		layout:'border',
		//maximized:true,
		maximizable:true,
		items:[{
			xtype:'panel',
			region:'west',
			width:200,
			split:true,
			layout:'fit',
			items:[{
				xtype:'treepanel',
				bodyStyle : 'background-color:#FFFFFF',
				frame:true,
				animate:false,
				autoScroll:true,
				useArrows:true,
				loader:new Ext.tree.TreeLoader({url:'/DEP/busi/commTool/book.json'}),
				cmargins:'0 0 0 0',
				margins:'0 0 0 0',
				lines :false,
				root: root,
				rootVisible: false
			}]
		},{
			xtype:'panel',
			region:'center',
			layout:'fit',
			html:'<div id="viewerPlaceHolder" style="width:100%;height:100%"></div>'
		}]
	}).show();
	showPDF("/DEP/busi/commTool/1.swf");
}

function showPDF(v){
	var psfViewer = new FlexPaperViewer(	
			 'FlexPaperViewer',
			 'viewerPlaceHolder', 
			 { 
			 config : {
			 SwfFile : v,
			 Scale : 0.6, 
			 ZoomTransition : 'easeOut',
			 ZoomTime : 0.5,
			 ZoomInterval : 0.2,
			 FitPageOnLoad : false,
			 FitWidthOnLoad : false,
			 PrintEnabled : true,
			 FullScreenAsMaxWindow : false,
			 ProgressiveLoading : true,
			 MinZoomSize : 0.2,
			 MaxZoomSize : 5,
			 SearchMatchAll : false,
			 InitViewMode : 'Portrait',
			 
			 ViewModeToolsVisible : true,
			 ZoomToolsVisible : true,
			 NavToolsVisible : true,
			 CursorToolsVisible : true,
			 SearchToolsVisible : true,
					
			 localeChain: 'zh_CN'
	 }});
}
</script>
</html>
