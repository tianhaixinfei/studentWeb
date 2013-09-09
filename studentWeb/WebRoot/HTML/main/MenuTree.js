Ext.namespace("swb.main.MenuTree");
/**
 * 构造函数
 * swb.main.MenuTree 
 * @param {} config
 */
swb.main.MenuTree = function(config){
	Ext.apply(this, {
		items: []
	});
	swb.main.MenuTree.superclass.constructor.apply(this, arguments);
};

/**
 * 继承Panel
 * @class swb.main.MenuTree
 * @extends Ext.Panel
 */
Ext.extend(swb.main.MenuTree,Ext.Panel,{

	//加载tree数据
	loadTree:function(instanceTree, b, c){
		Ext.Ajax.request({
			method: 'post',
			url: cxt+'/basic/queryModuleList.do',
			params: '',
		   	success:function(ret){
		    	var obj=Ext.util.JSON.decode(ret.responseText);
		    	createLeftOpPanel(obj);
		    	instanceTree.doLayout();
		   	}
		});
		
		/**
		 * 创建左侧树结构
		 */
		function createLeftOpPanel(obj) {
			for(var i = 0; i < obj.length; i++) {
				var menuTree = createMenuTree(obj[i].id, obj[i].menuname);
				instanceTree.add({
	    			title : obj[i].menuname,
					iconCls : obj[i].c_iconcls,
					layout : "fit",
					items: [menuTree],
					listeners:{  
					  'activate':function(obj){  
					    	pName = obj.title;
					   }
					}
	    		});
			}
		};
		
		function createMenuTree(menuId, menuName) {
			var menuRoot = new Ext.tree.AsyncTreeNode({
				id : menuId,
				text: menuName
			});
			var loader =   new Ext.tree.TreeLoader({url:this.cxt+'/basic/queryTreeList.do'});
			
	        loader.on('beforeload',function(loader, menuRoot){ 
	             loader.baseParams = {id:menuId,menuname:menuName};
	        });
			var menuTree = new Ext.tree.TreePanel({
				rootVisible:false,
				bodyStyle: "background-color:#FDFDFD; border-width: 0px 0px 0px 0px;",
				loader:loader
			});                                
			
			menuTree.setRootNode(menuRoot);
			
			menuTree.addListener("click", function(node, event) {
				instanceTree.fireEvent('menuClick', node.attributes);
			});
			
			return menuTree;
		};
	}
});