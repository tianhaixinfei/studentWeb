Ext.namespace('com.basic.userList');
com.basic.userList = Ext.extend(Ext.Panel,{
	userid:null,
	initComponent: function() {
		
		Ext.QuickTips.init();
    	Ext.form.Field.prototype.msgTarget = 'side';
    
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
					    	columnWidth:.33,layout:'form',
							items:[
								{xtype:'textfield',name:'uname',id:'uname',fieldLabel:'用户名称',allowBlank:false,blankText:'用户名称不能为空',anchor:'90%'},
								{
									xtype:'textfield',
									name:'ucode',
									id:'ucode',
									fieldLabel:'登入名称',
									allowBlank:false,
									blankText:'登入名称不能为空',
									anchor:'90%',
						            validator: vlidateUcode,
						            invalidText:'用户名已经注册'
								},
								{xtype:'numberfield',name:'age',id:'age',fieldLabel:'用户年龄',anchor:'90%'},
								{
									layout:'form',
									items:[
					    				new Ext.form.ComboBox({
					    					fieldLabel:'主页样式',
											name: 'themeName',
											hiddenName: 'themeName',
											anchor:'90%',
											triggerAction: 'all', 
											editable: false,
											mode: 'local',
											allowBlank : false,
											valueField: 'value',
											displayField: 'text',
											value:'default',
					    					store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [
													['default', '默认'],
													['ext-all-xtheme-black', '黑色'],
													['ext-all-xtheme-blue', '银白'],
													['ext-all-xtheme-brown', '浅红'],
													['ext-all-xtheme-brown02', '粉黄'],
													['ext-all-xtheme-green', '绿色'],
													['ext-all-xtheme-purple', '紫色'],
													['ext-all-xtheme-red03', '红色']
												]		    					
					    					})
					    				})
					    			]
								}
							] 
				      },
				      {
				    	 columnWidth:.33,layout:'form',
						 items:[
							{xtype:'numberfield',name:'qq',id:'qq',fieldLabel:'用户QQ',anchor:'95%'},
							{xtype:'numberfield',name:'tel',id:'tel',fieldLabel:'移动电话',allowNegative:false,allowDecimals:false,anchor:'95%'},
							{xtype:'textfield',name:'mail',id:'mail',fieldLabel:'邮箱地址',vtype:'email',anchor:'95%'},
							{layout:'form',xtype:'textfield',name:'findbackPassInfo',id:'findbackPassInfo',fieldLabel:'密码提示',anchor:'95%'}
						 ]
				      },
				      {
				    	  columnWidth:.33,layout:'form',
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
								value:'未审核',
		    					store : new Ext.data.SimpleStore({
									fields: ['value', 'text'],
									data: [['停用', '停用'],['已审核', '已审核'],['未审核', '未审核']]		    					
		    					})
		    				}),
				    	     {
				    	    	 layout:'form',
									items:[
					    				new Ext.form.ComboBox({
					    					fieldLabel:'用户性别',
											name: 'sex',
											hiddenName: 'sex',
											anchor:'95%',
											triggerAction: 'all', 
											editable: false,
											mode: 'local',
											allowBlank : false,
											valueField: 'value',
											displayField: 'text',
											value:'男',
					    					store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [['男', '男'],['女', '女']]		    					
					    					})
					    				})
					    			]
				    	     },
				    	     {layout:'form',xtype:'numberfield',name:'orderno',id:'orderno',value:'0',fieldLabel:'排序编号',anchor:'95%'},
				    	     {
				    	    	 layout:'form',
									items:[
					    				new Ext.form.ComboBox({
					    					fieldLabel:'用户类别',
											name: 'type',
											hiddenName: 'type',
											anchor:'95%',
											triggerAction: 'all', 
											editable: false,
											mode: 'local',
											allowBlank : false,
											valueField: 'value',
											displayField: 'text',
											value:'老师',
					    					store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [['学生', '学生'],['老师', '老师']]		    					
					    					})
					    				})
					    			]
				    	     }
		    	          ]
				      }
			        ]
				}
	    	],
    		buttons: [{
		    			text:'保存',scope:this,
						handler:function(){
							if(!this.editForm.getForm().isValid())
								return;
							
							this.editForm.getForm().doAction('submit', {
								url: cxt + '/user/saveUser.do',
								method: 'post',
								waitTitle:'请等待',
								waitMsg: '正在提交...',
								scope: this,
								success: function(form, action) {
									if(action.result.success == true) {
										Ext.MessageBox.alert('结果', '保存成功！');
										this.editForm.getForm().reset();
										this.editWin.hide();
										 this.ds.reload();
									}
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', "保存失败！", function() {
										editForm.getForm().reset();
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
		
	    //验证用户validate
	    var glForm = new Ext.form.FormPanel({
	    	fileUpload: true,
	    	id:'glForm',
	    	labelAlign: 'right',
	    	buttonAlign:'center',
			region: 'center',
			autoScroll:true, 
			labelWidth: 60,
			frame: true,
			items:[
		    	{xtype:'textfield',inputType:'password',name:'upass',id:'upass',fieldLabel:'管理密码',allowBlank:false,blankText:'管理密码不能为空',msgTarget:'title',anchor:'95%'}
		    ],
		    buttons: [{
		    	text:'确定',
				handler:function(){
					if(!glForm.getForm().isValid())
							return;
					Ext.Ajax.request({
						url : this.cxt+'/user/validateUPass.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在验证...',
						params : {
							upass:lockForm.findById('upass').getValue()
						},
						success:function(ret){
							var info = Ext.util.JSON.decode(ret.responseText);
							if(info.success == true){
								glPass.hide();
							}else{
								Ext.MessageBox.alert("信息","验证失败");
							}
						}
					})
				}
		    }]
	    });
	    
	     //主添加、修改-窗体
	    var glPass = this.glPass= new Ext.Window({
	    	title:'验证管理密码',
	    	width:250,
	    	iconCls:'basic_gl_key',
	    	modal:true,
	    	closable:false,
	    	autoHeight:true,
	    	items:[glForm]
	    });
	    
	    //主添加、修改-窗体
	    var editWin = this.editWin = new Ext.Window({
	    	title:'用户信息',
	    	width:650,
	    	closable:true,
	    	modal:true,
	    	autoHeight:true,
			closeAction:'hide',
	    	items:[editForm]
	    });
		
		//查询：面板
		var searchForm = new Ext.FormPanel({
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
							columnWidth:.25,layout:'form',
							items:[
								{xtype:'textfield',name:'uname',fieldLabel:'用户名称',anchor:"95%"}
							]
					    },
					    {
					  		columnWidth:.25,layout:'form',
							items:[
								{xtype:'textfield',name:'ucode',fieldLabel:'登入名称',anchor:'95%'}
							]
					    },
					    {
					  		columnWidth:.25,layout:'form',
							items:[
								{xtype:'numberfield',name:'age',fieldLabel:'用户年龄',anchor:'95%'}
							]
				 	    },
					    {
							columnWidth: .25, layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '是否禁用',
									name: 'state',
									hiddenName: 'state',
									anchor : '95%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									displayField: 'text',
									value:'',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['', '全部'],['停用', '停用'],['已审核', '已审核'],['未审核', '未审核']]
									})
								})
							]
						}
			       ]
				},
				{
					layout: 'column',
					items: [
						{
							columnWidth: .25, layout: 'form',
							items: [
								new Ext.form.ComboBox({
									fieldLabel: '用户性别',
									name: 'sex',
									hiddenName: 'sex',
									anchor : '95%',
									triggerAction: 'all', 
									editable: false,
									mode: 'local',
									valueField: 'value',
									displayField: 'text',
									value:'',
									store: new Ext.data.SimpleStore({
										fields: ['value', 'text'],
										data: [['', '全部'],['男', '男'],['女', '女']]		   
									})
								})
							]					
						},
						{
							columnWidth:.25,layout:'form',
							items:[
								{xtype:'numberfield',name:'tel',fieldLabel:'固定电话',anchor:'95%'}
							]
						},{
							columnWidth:.25,layout:'form',
							items:[
								{xtype:'numberfield',name:'qq',fieldLabel:'用户QQ',anchor:'95%'}
							]						
						},
						{
							columnWidth:.25,layout:'form',
							items:[
								{xtype:'textfield',name:'mail',fieldLabel:'联系邮箱',anchor:'95%'}
							]
						}
					]
				}
			],
			buttons: [
				new Ext.Button({
					text: '查询',
					width: 70,
					handler: function() {
						ds.baseParams= searchForm.getForm().getValues();
						ds.load({params: {start:0, limit:20}});
					}
				}),
				new Ext.Button({
					text: '清空',width: 70,scope:this,
					handler: function() {
						searchForm.form.reset();
					}
				})
			]
		});
		
		
	    
		
		//数据列字段
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
			sm,
			{header:'id',dataIndex:'id',hidden:true},
			{header:'用户名称', dataIndex:'uname', sortable:true},
			{header:'登入名称',  dataIndex:'ucode', sortable:true},
			{header:'用户性别',  dataIndex:'sex', sortable:true},
			{header:'用户年龄',  dataIndex:'age', sortable:true},
			{header:'用户邮箱',  dataIndex:'mail', sortable:true},
			{header:'联系电话',  dataIndex:'tel', sortable:true},
			{header:'用户QQ', dataIndex:'qq', sortable:true},
			{header:'主页样式',  dataIndex:'themeName'},
			{header:'是否禁用', dataIndex:'state', sortable:true,
	    		renderer:function(v,m,record){
	    			var state = record.data.state;
					var s = "";
					if(state == '未审核')
						s="<font color='007100'>未审核</font>";
					else if(state == '停用')
						s="<font color='red'>停用</font>";
					else
						s = state;
	    			return s;
	    		}
			},
			{header:'用户类型',  dataIndex:'type'},
			{header:'排序号',  dataIndex:'orderno',sortable:true,
				renderer:function(v,m,record){
	    			var orderno = record.data.orderno;
	    			return Math.round(orderno*100)/100;
	    		}
			}
		]);
		//为数据列：准备数据
		var ds = this.ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({url:this.cxt+'/user/queryUserList.do'}),
			reader : new Ext.data.JsonReader({
						root: 'invdata',
				        totalProperty: 'total'
				},
				[
					{name: 'id'},
					{name: 'uname'},
					{name:'ucode'},
					{name:'sex'},
					{name:'age'},
					{name:'mail'},
					{name:'tel'},
					{name:'qq'},
					{name:'themeName'},
					{name:'state'},
					{name:'type'},
					{name:'orderno'}
				]
			)
		});
		
		var pagebar=new Ext.PagingToolbar({
            pageSize: 20,
			store: this.ds,
			displayInfo: true,
			displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
			emptyMsg: '没有记录'
        });

                        
		//数据列表：整合
		var grid = this.grid = new Ext.grid.GridPanel({
			region:'center',
			ds: this.ds,
			cm: cm,
			sm: sm,
			viewConfig: {
				forceFit: true
			},
			bbar: pagebar,
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
						iconCls: 'add',
						handler: function() {
							editWin.show();
							editForm.getForm().setValues({id: ''})
							editForm.getForm().reset();
						}
					},'-',
					{
						text: '修改'	,
						iconCls: 'update_icon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择修改的行"); 
							 	 return; 
							 } else{
							 	var rs = grid.getSelectionModel().getSelected();
								showInfo(rs.data.id);
							 }
						}
					},'-',
					{
						text: '删除'	,
						iconCls: 'delete-icon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择删除的用户"); 
							 	 return; 
							 } else{
							 	
								delete_play_stop(selectedRows,"删除");
							 }
						}
					},'-',
					{
						text: '启用or审核'	,
						iconCls: 'start_icon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择启用的用户"); 
							 	 return; 
							 } else{
								delete_play_stop(selectedRows,"审核");
							 }
						}
					},'-',
					{
						text: '停用'	,
						iconCls: 'stop_icon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择停用的用户"); 
							 	 return; 
							 } else{
								delete_play_stop(selectedRows,"停用");
							 }
						}
					},'-',
					{
						text: '初始化密码',
						iconCls: 'folder_wrenchIcon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择初始化用户"); 
							 	 return; 
							 } else{
								 delete_play_stop(selectedRows,"初始化");
							 }
						}
					},'-',
					{
						text: '角色配置',
						iconCls: 'roleset_icon',scope:this,
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选配置用户"); 
							 	 return; 
							 } else if(selectedRows.length==1){
							 	var rs = grid.getSelectionModel().getSelected();
							 	this.userid = rs.data.id;
								new com.basic.userRole({pthis:this});
							 } else{
								Ext.Msg.confirm("提示","选择多个用户进行配置，他们之前角色将被清空，是否确定？",function(key){
							 		if(key !='yes')
										    return;
									else{
										this.userid = '';
										for (var i = 0;i < selectedRows.length;i++){
											if(this.userid=='')
												this.userid = selectedRows[i].data.id;											
											else
												this.userid += ","+selectedRows[i].data.id;
										}
										new com.basic.userRole({pthis:this});
									}
							 	})
							 }
						}
					}
				]
			})
		});
		this.ds.load({params:{start:0,limit:20}}); //对数据进行初始化
		
		//列表双击事件
		grid.addListener('rowdblclick', function(grid, rowindex, e) {
			var record = grid.getStore().getAt(rowindex);
			showInfo(record.data.id);
		});
		
	    //查看详细信息，及修改
		function showInfo(id) {
			editForm.load({
				url: this.cxt+'/user/getUserInfoByID.do',
				params: {id:id},
				success:function(from,action){
				}
			});
			editWin.show();
		}
		
		//删除、启用、停用
		function delete_play_stop(selectedRows,handleType){
			Ext.Msg.confirm("信息","确定"+handleType+"!",function(key){
				if(key !='yes')
					return;
				else{
					var idStr= "";
				    var nameStr = "";
				    for(var i=0;i<selectedRows.length;i++){
				    	  var state = selectedRows[i].data.state;
						  if(handleType=='审核' && state=='已审核'){
						  	 var uname = selectedRows[i].data.uname;
						  	 Ext.MessageBox.alert("信息",uname+" 已经启用！");
						  	 return;
						  }
						 else if(handleType=='停用'  && (state=='停用' || state=='未审核')){
						 	 var uname = selectedRows[i].data.uname;
						  	 Ext.MessageBox.alert("信息",uname+" 已经停用或未审核！");
						  	 return;
						 }
						  idStr = idStr==""?selectedRows[i].data.id:idStr+","+selectedRows[i].data.id;
						  nameStr = nameStr==""?selectedRows[i].data.uname:nameStr+","+selectedRows[i].data.uname;
				    }
				    Ext.Ajax.request({
						url:this.cxt+'/user/delete_play_stopUser.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						params:{idstr:idStr,namestr:nameStr,handletype:handleType},
						success:function(ret){
							var info = Ext.util.JSON.decode(ret.responseText);
							if(info.success == true){
								Ext.MessageBox.alert("信息",info.retinfo);
								grid.getStore().reload();
							}else{
								Ext.MessageBox.alert("信息","操作失败");
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
            layout:'border',
            items:[grid,searchForm]
        });
        
		com.basic.userList.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function() {
	},
	showGlPass: function(data) {
//		this.glPass.show();
	}
})

var bool = false;
function vlidateUcode(val,aaa){
	var userid = Ext.getCmp("id").value;
	Ext.Ajax.request({
		url: cxt + '/user/valiUserCode.do',
		method: 'post',
		waitTitle:'请等待',
		async : true,
		waitMsg: '正在提交...',
		params:{ucode:val,userid:userid},
		success: function(ret) {
			var info = Ext.util.JSON.decode(ret.responseText);
			if(info.success == 'true')
				setValue(false);
			else
				setValue(true);
		}
	})
	function setValue(retBool){
		bool = retBool;
	}
	return bool;
}
