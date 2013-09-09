Ext.namespace("swb.main.MainSouthPanel"); 
swb.main.MainSouthPanel = function(config) {
	Ext.apply(this, {
	});
	swb.main.MainSouthPanel.superclass.constructor.apply(this, arguments);
	this.initMainTopPanel(this);
};

Ext.extend(swb.main.MainSouthPanel, Ext.Panel, {
	initMainTopPanel:function(Top){
		var times = showTime();
		var topInfo = {
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
	                flex:.2
	            },
	            '-',
	            {
	            	xtype:'label',
	            	width: 180,
			        html:'优酷CRM管理系统3.0'
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
		};
		Top.add(items);
		Top.doLayout();    
	}
})