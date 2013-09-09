/**
 * 资源数据选择
 */
Ext.namespace('com.stu.util.PieceSelect_TreePanel');
com.stu.util.PieceSelect_TreePanel = Ext.extend(Ext.Panel,{
	pthis:null,
	initComponent: function() {
		var roleid = this.pthis.roleId;
		var root = new Ext.tree.AsyncTreeNode({
			id:'0',
			text:'选择资源',
			enableDD: true
	    })
	   var loader =   new Ext.tree.TreeLoader({url: cxt+'/basic/queryResourcesListByRoleId.do'});
       loader.on('beforeload',function(loader, node){ 
             loader.baseParams = {roleid:roleid};
       });
       
		//左侧待选数据
		 var left_tree = this.left_tree = new Ext.tree.TreePanel({
	        animate:true,
	        colspan:2,
	        width:200,
	        frame:true,
	        height: 300,
	        autoScroll: true,
	        bodyStyle: "background-color:#ffffff",
	        enableDD:false,
	        containerScroll: false,
	        rootVisible: false,
	        loader:loader
	    });
	    
	    left_tree.setRootNode(root);
	    
	    left_tree.on('checkchange', function(node, checked) { 
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
		}, left_tree);
         
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
		Ext.apply(this, {  
           iconCls: 'tabs',  
           autoScroll: true, 
           layout: 'form',
           items:[left_tree]
       }); 
		com.stu.util.PieceSelect_TreePanel.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function(baseParam) {
	},
    getPlaceSelectTreePanelValues:function(){
    	//获取所有节点的ID，并将其返回。
    	var checkedNode = this.left_tree.getChecked();
    	this.SumValue = '';
    	for(var i = 0 ; i < checkedNode.length;i++){
			this.SumValue += (i==0)?checkedNode[i].id:","+checkedNode[i].id;
		}
		return this.SumValue;//返回所有选择的
	}
})

