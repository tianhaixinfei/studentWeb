  Ext.onReady(function(){
    //leftMenu
	var leftMenu = new swb.main.MenuTree({
		title: '导航',
		iconCls:'book_previous',
		region: 'west',
		split : true,
		border : false,
		collapseMode:'mini',//在分割线处出现按钮
        collapsible : true,
		collapsed : false,
		width : 180,
		minSize : 10,
		maxSize : 300,
		layout : 'accordion',
		layoutConfig:{
        }
	});
	
	leftMenu.on('menuClick', function(nodeAttr) {
		mainCenterPanel.loadTab(nodeAttr);
	});
	leftMenu.loadTree(leftMenu);
	
	//main
	var mainCenterPanel = new swb.main.MainCenterPanel({
		region: 'center',
		id: 'mainCenterPanel',
		cxt:cxt,
		enableTabScroll:true,
		defaults: {autoScroll:true},
		plugins: new Ext.ux.TabCloseMenu()
	});
	//mainCenterPanel.initload(cxt+"/HTML/basic/roleList.jsp");
	mainCenterPanel.initload(cxt+"/HTML/basic/deptList.jsp");
	 
	//top
	var mainTopPanel = new swb.main.MainTopPanel({
		 region:'north',
         contentEl:'north', 
         height:60,
		 border:false
	});
	
	this.btoolBar = new Ext.Toolbar({
			region: 'south',
			height: 27,
			layout: 'hbox',
			layoutConfig: {
	            padding:'0',
	            align:'center'
	        },
	        defaults:{margins:'0 0 0 0'},
			items:[
			    '-',
			    {
	                xtype:'spacer',
	                flex:.3
	            },
	            '-',
	            {
	            	xtype:'label',
	            	width: 180,
			        html:'&nbsp;&nbsp;北京大学网上作业管理系统1.0'
	            },
	            '-',
	            {
	            	id : 'SysInfor',
	            	width: 180,
	            	xtype:'label'
	            },
	            {
	                xtype:'spacer',
	                flex:.2
	            }
			]
		});
	
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
	        mainTopPanel,this.btoolBar,leftMenu,mainCenterPanel
        ]
    });
});
