Ext.namespace('com.basic.deptTreePanel');

com.basic.deptTreePanel = Ext.extend(Ext.Panel,{
	initComponent: function() {
		var hiddenPkgs = [];
		var root = new Ext.tree.AsyncTreeNode({id:'0',text:'北京大学',enableDD: true,rootVisible:true})
		var loader = this.loader =  new Ext.tree.TreeLoader({url:cxt+'/dept/queryDeptTreeList.do'});
		
        this.loader.on('beforeload',function(loader, node){ 
               loader.baseParams = {id:node.attributes.deptid};
         });
         
        var tree = this.tree =  new Ext.tree.TreePanel({
        	id:'treeID',
        	split: true,
       		autoScroll:true,
			collapsed: false,
      		overflow:'auto',
      		checkModel: "single",
	  		split:true,
	  		frame:true,
	  		bodyStyle:'background:white',
	   	 	loader:loader,
        	tbar:new Ext.Toolbar({
		        	 enableOverflow: true,
		        	 items:[{
			        	xtype:'textfield',
			        	emptyText: '请输入过滤条件',
			        	frame:true,
			        	width:150,
						id:'fliterWell',
						enableKeyEvents :true,
						listeners:{
					      'keyup':{fn:function(n){
		      			  	        var text = Ext.getCmp("fliterWell").getValue();
		      			  	        
							        // 先要显示上次隐藏掉的节点
							        Ext.each(hiddenPkgs, function(n){
							           n.ui.show();
							        });
							
							        // 如果输入的数据不存在，就执行clear()
							        if(!text){
							            filter.clear();
							            return;
							        }
							        tree.expandAll();
							
							        // 根据输入制作一个正则表达式，'i'代表不区分大小写
							        var re = new RegExp(Ext.escapeRe(text), 'i');
							        filter.filterBy(function(n){
							            // 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
							            return !n.isLeaf() || re.test(n.text);
							        });
							
							        // 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉
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
			        },{
			        	iconCls:' x-btn-text x-tbar-loading',
			            handler:function(){
			            	refreshTree();
			        	}
			        }
			       ]
		        })
		});
		tree.setRootNode(root);
		root.expand(false, true);
		
		 	//【动态过滤】
	   var filter = new Ext.tree.TreeFilter(tree, {
	        clearBlank: true,
	        autoClear: true
	   });
	   
	   	Ext.apply(this, {  
            iconCls: 'tabs',  
            autoScroll: false,  
            closable: true,
            items:[tree]
        });
        
		com.basic.deptTreePanel.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function() {
	}
})
/**
 * 刷新tree
 */
function refreshTree(){
	var tree = Ext.getCmp('treeID');
	tree.root.reload();
	tree.root.collapse(true,true);
	tree.root.expand(false,true);
}

/**
 * 增加、修改局部tree节点
 * @param {} fid
 * @param {} id
 * @param {} text
 * @param {} newID
 */
function onAddNode(parentid,deptid,text,newID){
		var tree = Ext.getCmp('treeID');
		//根目录下添加节点
		if(parentid=="" && deptid==""){
			createNode(tree,"111",text,newID);
		}else if(parentid!="" && deptid==""){
		//在当前目录下添加节点
			createNode(tree,parentid,text,newID);
		}else if((parentid!="" && deptid!="")||(parentid=="" && deptid!="")){
			//修改id节点
			var treeEditor = new Ext.tree.TreeEditor(Ext.getCmp('treeID'), {
				  id : 'tree-Manage',
				  allowBlank:false, 
				  cancelOnEsc:true, 
				  completeOnEnter:true, 
				  ignoreNoChange:true, 
				  revertInvalid: false
			  });
			var selectedNode = tree.getNodeById(deptid);// 得到选中的节点
			 treeEditor.editNode = selectedNode;
			 treeEditor.startEdit(selectedNode.ui.textNode,text);
			 treeEditor.completeEdit(false);
		}
}

/**
 * 创建节点
 * @param {} tree
 * @param {} fid
 * @param {} text
 * @param {} newID
 */
function createNode(tree,parentid,text,newID){
		var parentNode =  tree.getNodeById(parentid);
		parentNode.leaf=false;
		var newNode=new Ext.tree.TreeNode({
	      leaf:true,
	      id:newID,
	      editNode:true,
	      text:text
	    })
	    parentNode.appendChild(newNode);
	    parentNode.expand();
}

/**
 * 删除节点
 * @param {} ids
 */
function nodeDelete(ids){
	var tree = Ext.getCmp('treeID');
	var idlist = ids.split(",");
	for(var i=0;i<idlist.length;i++){
		var parentNode =  tree.getNodeById(idlist[i]);
		parentNode.remove();
	}
}

