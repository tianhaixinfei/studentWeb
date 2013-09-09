Ext.namespace('com.basic.resourcesList');

com.basic.resourcesList = Ext.extend(Ext.Panel,{
	initComponent: function() {
		//增加、修改
	    var editForm = this.editForm = new Ext.form.FormPanel({
	    	labelAlign: 'right',
	    	buttonAlign:'center',
			region: 'center',
			autoScroll:true, 
			labelWidth: 60,
			frame: true,
	    	items:[
		    	{
	    			items:[{
							layout:'form',
							items:[{
								xtype:'hidden',name:'id',id:'id'
							}]
	    				}]
	    		},
	    		{
	    			layout:'column',
					items:[
						{
							columnWidth:.5,
							layout:'form',
							items:[
								{xtype:'textfield',name:'menuname',id:'menuname',fieldLabel:'资源名称',allowBlank:false,blankText:'资源名称不能为空',anchor:'95%'},
								{xtype:'textfield',name:'c_iconcls',id:'c_iconcls',fieldLabel:'显示图片',anchor:'95%'}
							]
						},{
							columnWidth:.5,
							layout:'form',
							items:[
								{	
									layout:'form',
									items:[
					    				new Ext.form.ComboBox({
					    					fieldLabel:'是否禁用',
					    					hiddenName: 'state',
					    					name:'state',
					    					triggerAction:'all',
					    					editable:true,
					    					anchor:'95%',
					    					mode:'local',
					    					allowBlank:false,
					    					blankText:'禁用标志不能为空',
					    					valueField:'value',
					    					displayField:'text',
					    					value:'可用',
					    					store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [['可用', '可用'],['停用', '停用']]		    					
					    					})
					    				})
					    			]
				    			},
								{layout:'form',xtype:'numberfield',name:'orderno',value:'0',id:'orderno',fieldLabel:'排序编号',anchor:'95%'}
							]
						}
					]
	    		},{
    				columnWidth:1,
					layout:"form",
    				items:[
    					{xtype:'textfield',name:'c_url',id:'c_url',fieldLabel:'连接路径',anchor:'97%'}
    				]
	    		},{
	    			columnWidth:1,
					layout:"form",
    				items:[
    					{xtype:'textfield',name:'remark',id:'remark',fieldLabel:'备注信息',anchor:'97%'}
    				]
	    		}
	    	],
    		buttons: [{
		    			text:'保存',scope:this,
						handler:function(){
							var parentId = 0;
							if(treeGrid.getSelectionModel().getSelectedNode()) {
								parentId = treeGrid.getSelectionModel().getSelectedNode().attributes.id;
							}
							if(!this.editForm.getForm().isValid())
								return;
							
							this.editForm.getForm().doAction('submit', {
								url: cxt + '/basic/saveResource.do',
								method: 'post',
								waitTitle:'请等待',
								waitMsg: '正在提交...',
								scope: this,
								params: {parentid: parentId},
								success: function(form, action) {
									if(action.result.success == true) {
										Ext.MessageBox.alert('结果', '保存成功！');
										this.editForm.getForm().reset();
										this.editWin.hide();
										this.reLoadNode(this.treeGrid.getSelectionModel().getSelectedNode(), this.treeGrid.root);
									}
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', "保存失败！", function() {
										this.editForm.getForm().reset();
									});
								}
							});
						}	    		
		    		}
		    		,{
		    			text:'取消',scope:this,
		    			handler:function(){
							this.editForm.form.reset();
						    this.editWin.hide();
	    				}
		    		}
	    		]
	    }); 
		
	    //主添加、修改-窗体
	    var editWin = this.editWin = new Ext.Window({
	    	title:'资源信息',
	    	width:450,
	    	closable:false,
	    	autoHeight:true,
			closeAction:'hide',
	    	items:[editForm]
	    });
		
		var rootNode = new Ext.tree.AsyncTreeNode({text: 'Root', id:'0'});
		var loader = this.loader = new Ext.tree.TreeLoader({dataUrl: cxt + '/basic/queryResourcesList.do'});
		var treeGrid = this.treeGrid = new Ext.ux.tree.TreeGrid({
			region:'center',
			autoScroll: false,
	        enableDD: true,
	        enableSort: false,
	        root: rootNode,
	        loader: loader,
	        viewConfig: {
				forceFit: true
			},
	        columns:[
		        {header:'资源名称', dataIndex:'text', width: 200},
		        {header:'标记图片',  dataIndex:'iconCls', width: 300},
		        {header:'连接地址',  dataIndex:'c_url', width: 300},
		        {header:'排序号',  dataIndex:'orderno',width: 175},
		        {header:'是否禁用', dataIndex:'state', width: 175,
		    		renderer:function(v,m,record){
		    			var state = record.data.state;
		    			console.log(state);
						var s = "";
						if(state=='1')
							s = "启用";
						else
							s="<font color='red'>停用</font>";
		    			return s;
		    		}
				}
	        ],
	        tbar: new Ext.Toolbar({
				buttons: [
					{
						text: '新增',
						iconCls: 'add',
						scope:this,
						handler: function() {
							if(this.treeGrid.getSelectionModel().getSelectedNode()!= null && this.treeGrid.getSelectionModel().getSelectedNode().attributes.parantid != '0'){
								Ext.MessageBox.alert('结果', this.treeGrid.getSelectionModel().getSelectedNode().attributes.text+':本系统不支持添加三级菜单！');
								return;
							}else{
								editWin.show();
							}
						}
					},'-',
					{
						text: '修改'	,
						iconCls: 'update_icon',scope:this,
						handler: function() {
							editForm.form.reset();
							if(this.treeGrid.getSelectionModel().getSelectedNode()) {
								showInfo(this.treeGrid.getSelectionModel().getSelectedNode().attributes.id);
			            	}else{
			            		Ext.Msg.alert("提示","请选择修改的资源"); 
							 	 return; 
			            	}
						}
					},'-',
					{
						text: '删除'	,
						iconCls: 'delete-icon',scope:this,
						handler: function() {
							if(this.treeGrid.getSelectionModel().getSelectedNode()){ 
							 	delete_play_stop(this.treeGrid.getSelectionModel().getSelectedNode().attributes.id,"删除",this);
							 } else{
								 Ext.Msg.alert("提示","请选择删除的用户"); 
							 	 return; 
							 }
						}
					},'-',
					{
						text: '启用'	,
						iconCls: 'start_icon',scope:this,
						handler: function() {
							if(this.treeGrid.getSelectionModel().getSelectedNode()){ 
							 	delete_play_stop(this.treeGrid.getSelectionModel().getSelectedNode().attributes.id,"启用",this);
							 } else{
								 Ext.Msg.alert("提示","请选择启用的用户"); 
							 	 return; 
							 }
						}
					},'-',
					{
						text: '停用'	,
						iconCls: 'stop_icon',scope:this,
						handler: function() {
							if(this.treeGrid.getSelectionModel().getSelectedNode()){ 
							 	delete_play_stop(this.treeGrid.getSelectionModel().getSelectedNode().attributes.id,"停用",this);
							 } else{
								 Ext.Msg.alert("提示","请选择停用的用户"); 
							 	 return; 
							 }
						}
					}
				]
			})
	    });
		
		
		function showInfo(id) {
			editWin.show();
			editForm.load({
				url: cxt+'/basic/geResourcesInfoByID.do',
				params: {id:id},
				success:function(form,action){
				}
			});
		}
		
		
		function delete_play_stop(id,type,th){
			Ext.Msg.confirm("信息","确定"+type+"!",function(key){
				if(key !='yes')
					return;
				else{
				    Ext.Ajax.request({
						url:cxt +'/basic/delete_play_stopByResources.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						params:{id:id,state:type},
						success:function(ret){
							var info = Ext.util.JSON.decode(ret.responseText);
							if(info.success == true){
								Ext.Msg.alert("提示",type+"成功"); 
								th.reLoadNode(treeGrid.getSelectionModel().getSelectedNode(), treeGrid.root);
							}else{
								Ext.MessageBox.alert("信息",type+"失败");
							}
						}
					})
				}
			})
		}
		
		Ext.apply(this, {
			layout:'fit',
	        iconCls: 'tabs',  
	        autoScroll: false,  
	        closable: true,
	        items:[treeGrid]
	    });
		com.basic.resourcesList.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function() {
	},
	reLoadNode: function(node, treeRoot) {
//		if(node) {
//			var pNode = node.parentNode;
//			if(pNode) {
//				this.treeGrid.loader.load(pNode);
//				pNode.expand();
//			}
//			else {
//				this.treeGrid.loader.load(treeRoot);
//				treeRoot.expand();
//			}
//		}
//		else {
			this.treeGrid.loader.load(treeRoot);
			treeRoot.expand();
//		}
	}
})
