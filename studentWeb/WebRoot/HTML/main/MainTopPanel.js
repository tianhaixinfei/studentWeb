Ext.namespace("swb.main.MainTopPanel"); 
swb.main.MainTopPanel = function(config) {
	Ext.apply(this, {
	});
	swb.main.MainTopPanel.superclass.constructor.apply(this, arguments);
	this.initMainTopPanel(this);
};

Ext.extend(swb.main.MainTopPanel, Ext.Panel, {
	initMainTopPanel:function(Top){
		Top.doLayout();    
	}
})