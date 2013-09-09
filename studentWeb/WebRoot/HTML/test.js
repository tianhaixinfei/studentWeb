Ext.onReady(function() {
    Ext.QuickTips.init();
    var tree = new Ext.ux.tree.TreeGrid({
    	title: 'TreeGrid实例',//
    	renderTo: Ext.getBody(),
        dataUrl: 'SUPJS/treegrid-data.json',
        columns:[
        {
            header: '资源名称',
            dataIndex: 'name'
        },{
            header: '资源描述',
            dataIndex: 'duration',
            align: 'center',
            sortType: 'asFloat',
            tpl: new Ext.XTemplate('{duration:this.formatHours}', {
                formatHours: function(v) {
                	alert(v);
                     return v;
                }
            })
        },{
            header: '资源类型',
            dataIndex: 'iconCls'
        }]
    });
});