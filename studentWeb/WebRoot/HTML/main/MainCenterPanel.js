Ext.namespace("swb.main.MainCenterPanel"); 
swb.main.MainCenterPanel = function(config) {
	Ext.apply(this, {
		panelCache:{},
		items: []
	});
	swb.main.MainCenterPanel.superclass.constructor.apply(this, arguments);
};

Ext.extend(swb.main.MainCenterPanel, Ext.TabPanel, {
	
	loadTab : function (nodeAttr) {
		var tabP = this;
		var n = this.get(nodeAttr.id);
		if(n){
			this.setActiveTab(n);
		}
		else if(nodeAttr.c_url) {
			var url = tabP.cxt+nodeAttr.c_url;
			var itemPanel = new Ext.Panel({
				id: nodeAttr.id,
				title: nodeAttr.text,
				closable: true,
				iconCls : nodeAttr.iconCls,
				layout: 'fit',
				html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' +url+'"></iframe>'
			});
			tabP.add(itemPanel).show();
		}
	},
	
	initload:function(nodeAttr){
		var tabP = this;
		if(nodeAttr) {
			var itemPanel = new Ext.Panel({
				id: '111',
				title: '首页',
				closable: true,
				iconCls : nodeAttr.iconCls,
				layout: 'fit',
				html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' +nodeAttr+'"></iframe>'
			});
			tabP.add(itemPanel).show();
			tabP.setActiveTab(itemPanel);
		}
	}
})

