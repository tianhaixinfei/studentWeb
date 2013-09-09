Ext.namespace('com.basic.deptList');

com.basic.deptList = Ext.extend(Ext.Panel,{
	initComponent: function() {
		
		// 当前审批节点store
		var prentDeptStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({url:cxt+'/dept/queryDeptList.do'}),
			reader: new Ext.data.JsonReader({
				totalProperty: 'total',
				root: 'invdata',
				fields: [
					{name: 'deptid'},
					{name: 'deptname'}
				]
			})
		});
		
		//增加、修改
		 var editForm = this.editForm = new Ext.form.FormPanel({
	    	id:'editForm',
	    	frame:true,
	    	labelAlign:'right',
	    	labelWidth:60,
	    	region:'center',
	    	buttonAlign:'center',
			collapseMode:'mini',
	    	items:[
	    		{
	    			items:[{
							layout:'form',
							items:[{
								xtype:'hidden',name:'deptid'
							}]
	    				}]
	    		},
	    		{
	    			layout:"column",
		    		items:[
		    			{
			    			columnWidth:.33,layout:'form',
			    			items:[
		    					new Ext.form.ComboBox({
									fieldLabel: '层次级别',
									name: 'deptleve',
									hiddenName: 'deptleve',
									anchor : '90%',
									emptyText: '首先选择我...',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									displayField: 'text',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['院系', '院系'],['专业', '专业'],['年级', '年级']]
									}),
			    					listeners : {
			    						beforeselect: function( combo , record , index  ){
			    							editForm.form.reset();
			    							var deptleve = record.data.value;
			    							if(deptleve == '院系'){
			    								editForm.getForm().findField('parentid').setValue("北京大学"); 
			    								prentDeptStore.removeAll();
			    							}else if(deptleve == '专业'){
			    								prentDeptStore.load({params: {deptleve: '院系', limit: 100}});
			    							}else if(deptleve == '年级'){
			    								prentDeptStore.load({params: {deptleve: '专业', limit: 100}});
			    							}
										}
									}
								})
			    			]
			    		},{
		    				columnWidth:.33,layout:'form',
			    			items:[{
			    				xtype:'textfield',name:'deptname',fieldLabel:'单位名称',allowBlank:false,blankText:'单位名称不能为空',anchor:'90%'
			    			}]
			    		},{
			    			columnWidth:.33,layout:'form',
			    			items:[
								new Ext.form.ComboBox({
									fieldLabel: '是否禁用',
									name: 'start_stop',
									hiddenName: 'start_stop',
									anchor : '90%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									displayField: 'text',
									value:'停用',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['停用', '停用'],['启用', '启用']]
									})
								})
			    			]
			    		}
		    		 ]
	    		},
	    		{
	    			layout:"column",
		    		items:[
		    			{
			    			columnWidth:.33,layout:'form',
			    			items:[
								new Ext.form.ComboBox({
									fieldLabel: '上级单位',
									name: 'parentid',
									hiddenName: 'parentid',
									emptyText: '请先选择层级级别...',
									triggerAction: 'all', 
									forceSelection: true,
									editable: true,
									hideTrigger: false,
									anchor : '90%',
									mode: 'local',
									valueField: 'deptid',
									displayField: 'deptname',
									store: prentDeptStore
								})
			    			]
			    		},{
			    			columnWidth:.33,layout:'form',
			    			items:[{
			    				xtype:'numberfield',name:'orderno',value:0,fieldLabel:'排序编号',anchor:'90%'
			    			}]
			    		}
		    		 ]
	    		}
    		], 
    		buttons: [
				{
	    			text:'保存',scope:this,
					handler:function(){
						if(!editForm.getForm().isValid())
							return;
						editForm.getForm().doAction('submit', {
							url:cxt+'/dept/insertDept.do',
							method:'post',
							waitTitle:'提示',
							waitMsg:'正在提交...',
							success: function(form, action) {
								if(action.result.success == true) {
									Ext.MessageBox.alert('结果', '保存成功！');
									onAddNode(action.result.parentid,editForm.getForm().findField("deptid").value,action.result.deptname,action.result.deptid);
									editForm.getForm().reset();
									grid.getStore().reload();
									editWin.hide();          
								}
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', "保存失败！", function() {
									Ext.MessageBox.alert("提示信息","保存失败！");
								});
							}
						})
					}	    		
	    		},
    			{
	    			text:'取消',scope:this,
	    			handler:function(){
	    				this.editForm.form.reset();
						this.editWin.hide();
    				}
	    		}
    		]
	    }); 
	    
     var searchForm = this.searchForm = new Ext.FormPanel({
			region:'north',
			frame: true,
			collapsible : true,
			collapsed: true,
			autoHeight:true,
			collapseMode:'mini',
			split: true,
			labelAlign: 'right',
			items: [
				{
					layout:"column",
					items: [
						{
							columnWidth:.20,layout:'form',
							items:[
								{xtype:'textfield',name:'deptname',fieldLabel:'单位名称',anchor:"95%"}
							]
					    },
					    {
			    			columnWidth:.25,layout:'form',
			    			items:[
		    					new Ext.form.ComboBox({
									fieldLabel: '层次级别',
									name: 'deptleve',
									hiddenName: 'deptleve',
									anchor : '90%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									value:'',
									displayField: 'text',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['', '全部'],['院系', '院系'],['专业', '专业'],['年级', '年级']]
									})
								})
			    			]
			    		},
					    {
							columnWidth: .25, layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '是否禁用',
									name: 'start_stop',
									hiddenName: 'start_stop',
									anchor : '80%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									value:'',
									displayField: 'text',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['', '全部'],['启用', '启用'],['停用', '停用']]
									})
								})
							]
						},
						{
							layout:'form',
							items:[
								{xtype:'hidden',id:'searchid',name:'searchid'}
							]
						},
						{
							columnWidth: .1,buttonAlign:'right',
							items:[
							    {
							    	xtype:'button',text: '查询',width: 70,scope:this,
				 					handler: function() {
				 						this.ds.baseParams = this.searchForm.getForm().getValues();
				 						this.ds.load({params: {start:0, limit:20}});
				 					}
							    }   
					        ]
						},
						{
							columnWidth: .2,
							items:[
							    {
							    	xtype:'button',
			 						text: '清空',
			 						width: 70,
			 						handler: function() {
			 							var id = Ext.getDom("searchid").value;
			 							this.searchForm.form.reset();
			 							Ext.getDom("searchid").value=id;
			 						}
							    }   
					        ]
						}
			       ]
				}
			]
		});
	   
	  //数据列字段
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
			sm,
			{header:'deptid',dataIndex:'deptid',hidden:true},
			{header:'单位名称', dataIndex:'deptname', sortable:true},
			{header:'是否禁用', dataIndex:'start_stop', sortable:true},
			{header:'层次级别',dataIndex:'deptleve',sortable:true},
			{header:'排序号', dataIndex:'orderno'}
		]);
		
		var ds = this.ds = new Ext.data.Store({
			baseParams:{parentid:"0"},
			proxy : new Ext.data.HttpProxy({url:cxt+'/dept/queryDeptList.do'}),
			reader : new Ext.data.JsonReader({
						root: 'invdata',
				        totalProperty: 'total'
				},
				[
					{name: 'deptid'},
					{name: 'deptname'},
					{name: 'deptleve'},
					{name:'start_stop'},
					{name:'orderno'}
				]
			)
		});
		
		//数据列表：整合
		var grid = this.grid = new Ext.grid.GridPanel({
			region:'center',
			ds: ds,
			cm: cm,
			sm: sm,
			viewConfig: {
				forceFit: true
			},
			bbar: new Ext.PagingToolbar({
				pageSize: 20,
				store: this.ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录'
			}),
			tbar: new Ext.Toolbar({
				buttons: [
					{
						text: '查询'	,
						iconCls: 'search_icon',
						handler: function() {
							if(searchForm.collapsed)
								searchForm.expand();
							else
								searchForm.collapse();
						}
					},'-',
					{
						text: '新增',
						iconCls: 'add',scope:this,
						handler: function() {
							this.editWin.show();
							editForm.getForm().findField('deptleve').enable(true);
							editForm.getForm().findField('parentid').enable(true);
						}
					},'-',
					{
						text: '修改'	,scope:this,
						iconCls: 'update_icon',
						handler: function() {
							var selectedRows = this.grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择修改的行"); 
							 	 return; 
							 } else{
							 	var rs = this.grid.getSelectionModel().getSelected();
								showInfo(rs.data.deptid);
							 }
						}
					},'-',
					{
						text: '删除'	,
						iconCls: 'delete-icon',scope:this,
						handler: function() {
							var selectedRows = this.grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择删除的行"); 
							 	 return; 
							 } else{
								this.delete_play_stopValidate(selectedRows,"删除");
							 }
						}
					},'-',
					{
						text: '启用'	,
						iconCls: 'start_icon',scope:this,
						handler: function() {
							var selectedRows = this.grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择启用的行"); 
							 	 return; 
							 } else{
								this.delete_play_stopValidate(selectedRows,"启用");
							 }
						}
					},'-',
					{
						text: '停用'	,
						iconCls: 'stop_icon',scope:this,
						handler: function() {
							var selectedRows = this.grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择停用的行"); 
							 	 return; 
							 } else{
								this.delete_play_stopValidate(selectedRows,"停用");
							 }
						}
					}
				]
			})
		});
		this.ds.load({params:{start:0,limit:20}}); //对数据进行初始化
		
		this.grid.addListener('rowdblclick', function(grid, rowindex, e) {
			var record = grid.getStore().getAt(rowindex);
			showInfo(record.data.deptid);
		});
		
		function showInfo(deptid) {
			editForm.load({
				url: cxt+'/dept/queryDeptById.do',
				params: {deptid:deptid},
				success:function(form,action){
				}
			});
			editWin.show();
			editForm.getForm().findField('deptleve').disable(true);
			editForm.getForm().findField('parentid').disable(true);
		}

	   var editWin =  this.editWin = new Ext.Window({
	    	title:'单位信息',
	    	width:650,
	    	modal:true,
	    	closable:false,
	    	autoHeight:true,
	    	items:[editForm]
	    });
		
		Ext.apply(this, {
			layout:'fit',
            iconCls: 'tabs',  
            autoScroll: false,  
            closable: true,
            layout:'border',
            items:[grid,searchForm]
        });
		com.basic.deptList.superclass.initComponent.apply(this, arguments);
	},
	loadData: function(data) {
		this.ds.load({params:{start:0,limit:20,parentid:data.id}}); 
	},
	delete_play_stopValidate:function(selectedRows,type){
		var th = this;
	    var idStr= "";
	    var nameStr = "";
	    for(i=0;i<selectedRows.length;i++){
			  idStr = idStr==""?selectedRows[i].data.deptid:idStr+","+selectedRows[i].data.deptid;
			  nameStr = nameStr==""?selectedRows[i].data.deptname:nameStr+","+selectedRows[i].data.deptname;
	    }
	    Ext.Ajax.request({
			url:cxt+ '/dept/delete_play_stopDeptById.do',
			method:'post',
			waitTitle:'提示',
			waitMsg:'正在提交...',
			params:{idstr:idStr,type:type},
			success:function(ret){
				var info = Ext.util.JSON.decode(ret.responseText);
				if(info.success == true){
					if(type=='删除')
						nodeDelete(idStr);
					th.grid.getStore().reload();
				}else{
					Ext.MessageBox.alert("信息","操作失败");
				}
			}
		})
	}
})
