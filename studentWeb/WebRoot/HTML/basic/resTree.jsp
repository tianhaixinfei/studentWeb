<%@ page language="java" pageEncoding="UTF-8" contentType="text/html"%>
<%
String rootPath = request.getContextPath();
String loguserID = (String)request.getSession().getAttribute("userid");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<title>选择资源</title>
		<base href="<%=basePath%>">
		<!-- 【使用缓存】 -->
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/comm.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/addStep.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/addCase.css" />
		<link rel="stylesheet" type="text/css" href="<%=rootPath%>/resources/css/busis/treegrid.css" />
		
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
        <script type="text/javascript" src="<%=rootPath%>/busi/scheme/Util.js"></script>  
	</head>
	<body>
	</body>
	<script language="javascript">

	
	Ext.onReady(function(){
	   var checkedParentIds = [];
	   Ext.BLANK_IMAGE_URL = '<%=rootPath%>/resources/images/default/s.gif';
       Ext.QuickTips.init();
       var nodename="";
       var resid="";
       var hiddenPkgs = [];
       var pnodetext="";
       var root = new Ext.tree.AsyncTreeNode({
			id:'0',
			text:'选择资源',
			enableDD: true
		})
       var loader =   new Ext.tree.TreeLoader({url:'basic/basic!queryResourcesListTree.do'});
       loader.on('beforeload',function(loader, node){ 
             loader.baseParams.robj = Ext.encode({resShowType:'checkbox',roleid:window.parent.rolePro.roleid});
       });
         
       var tree = new Ext.tree.TreePanel({
       		autoScroll:true,
      		overflow:'auto',
      		checkModel: "single",
	  		height:400,
	  		frame:true,
	  		bodyStyle:'background:white',
	   	 	loader:loader,
	   	 	tbar:new Ext.Toolbar({
		        	 enableOverflow: true,
		        	 items:[{
			        	xtype:'textfield',
			        	emptyText: '请输入过滤条件',
			        	frame:true,
			        	width:100,
						id:'fliterWell',
						enableKeyEvents :true,
						listeners:{
					      'keyup':{fn:function(n){
		      			  	        var text = Ext.getCmp("fliterWell").getValue();
							        Ext.each(hiddenPkgs, function(n){
							           n.ui.show();
							        });
							        if(!text){
							            filter.clear();
							            return;
							        }
							        tree.expandAll();
							        var re = new RegExp(Ext.escapeRe(text), 'i');
							        filter.filterBy(function(n){
							            return !n.isLeaf() || re.test(n.text);
							        });
							        hiddenPkgs = [];
							        tree.root.cascade(function(n) {
							            if(!n.isLeaf() && n.ui.ctNode.offsetHeight < 3){
							                n.ui.hide();
							                hiddenPkgs.push(n);
							            }
							        });
		      			    }
		  			      }
					    }
			        },'-',{
			        	labelAlign: 'center',
			        	text:'确定提交',
			        	iconCls:'add-icon',
			        	handler:function(node,checked){
			        		var obj = onItemClick();
			        		window.parent.subRes_Role(obj);
			        	}
			        }
			       ]
		        })

		});
		
		tree.setRootNode(root);
		root.expand(true, false);//自动展开
		
		//选中孩子
	    var childHasChecked = function(node){
	        var childNodes = node.childNodes;
	        if(childNodes || childNodes.length>0){
	        for(var i=0;i<childNodes.length;i++){
	            if(childNodes[i].getUI().checkbox.checked)
	                return true;
	            }
	        }
	        return false;
	    } 
	   
	     //级联选中父节点
	    var parentCheck = function(node ,checked){
	        var checkbox = node.getUI().checkbox;
	        if(typeof checkbox == 'undefined')
	            return false;
	        if(!(checked ^ checkbox.checked))
	            return false;
	        if(!checked && childHasChecked(node))
	            return false;
	        checkbox.checked = checked;
	        node.attributes.checked = checked;
	        node.getOwnerTree().fireEvent('check', node, checked);
 
        	var parentNode = node.parentNode;
	        if(parentNode !== null){
	            parentCheck(parentNode,checked);
	        }
	    }
		//增加checkchange监听
	   tree.on('checkchange', function(node, checked) {
	            var parentNode = node.parentNode;
	            if(parentNode !== null) {   
	                   parentCheck(parentNode,checked);   
	            }
	           node.expand();
	           node.attributes.checked = checked;     
	           node.eachChild(function(child) {     
		           child.ui.toggleCheck(checked);     
		           child.attributes.checked = checked;     
		           child.fireEvent('checkchange', child, checked);
	           });     
	    }, tree);
	    
	    //获取新增复选框树的值
	    function onItemClick(){
	    	
	        var checkedNodes = tree.getChecked();//tree必须事先创建好.这里要标识识获取那个treepanel的 id
	        var checkedIds = [];
	        for(var i=0;i<checkedNodes.length;i++){
	             checkedIds.push(checkedNodes[i].id);
	        }
	        return checkedIds.join(',');
	    }; 
	    
			
		//【动态过滤】
	   var filter = new Ext.tree.TreeFilter(tree, {
	        clearBlank: true,
	        autoClear: true
	   });
		
		var view  = new Ext.Viewport({
			layout:'fit',
			items:[tree]
		})
	});
</script>
</html>
			        	