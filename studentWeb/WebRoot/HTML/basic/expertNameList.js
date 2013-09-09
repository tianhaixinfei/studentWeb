Ext.namespace("com.basic.expertNameList");

com.basic.expertNameList = Ext.extend(Ext.Panel,{
	initComponent: function() {
		
		var deptStore = new Ext.data.Store({ 
			proxy : new Ext.data.HttpProxy({url:'basic/basic!queryDeptList.do'}),
			reader : new Ext.data.JsonReader({
					root: 'data',
			        totalProperty: 'total'
				},
				[
					{rn:"rn"},
					{name : 'deptname'}
				]
			)
        });     

        
		//增加、修改
	    var editForm = new Ext.form.FormPanel({
	    	fileUpload: true,
	    	id:'editForm',
	    	labelAlign: 'right',
	    	buttonAlign:'center',
			region: 'center',
			autoScroll:true, 
			labelWidth: 60,
			frame: true,
			xtype: 'fieldset',
			reader: new Ext.data.JsonReader(
				{root:'data'},
				[
					 {name:'id',mapping:'id'},
					 {name:'expertname',mapping:'expertname'},
					 {name:'expertdept',mapping:'expertdept'},
					 {name:'specialty',mapping:'specialty'},
					 {name:'job',mapping:'job'},
					 {name:'state',mapping:'state'},
					 {name:'remark',mapping:'remark'},
					 {name:'ordernum',mapping:'ordernum'}
				 ]
			),
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
							columnWidth:.33,
							layout:'form',
							items:[
								{xtype:'textfield',name:'expertname',id:'expertname',fieldLabel:'用户名称',allowBlank:false,blankText:'用户名称不能为空',anchor:'95%'},
								{	
									layout:'form',
									items:[
					    				new Ext.form.ComboBox({
									        valueField:'sn',
									        forceSelection:true,
					    					fieldLabel:'专家单位',
					    					name:'expertdept',
					    					id:'expertdept',
					    					triggerAction:'all',
					    					editable:true,
					    					anchor:'95%',
					    					mode:'remote',
					    					allowBlank:false,
					    					blankText:'请选择单位',
					    					valueField:'rn',
					    					displayField:'deptname',
					    					store :deptStore
					    				})
					    			]
				    			}
							]
						},{
							columnWidth:.33,
							layout:'form',
							items:[
							    {xtype:'textfield',name:'job',id:'job',fieldLabel:'工作职称',msgTarget:'title',anchor:'95%'},
								{xtype:'textfield',name:'specialty',id:'specialty',fieldLabel:'专业名称',anchor:'95%'}
							]
						},{
							columnWidth:.33,
							layout:'form',
							items:[
								{xtype:'numberfield',name:'ordernum',id:'ordernum',fieldLabel:'排序编号',anchor:'95%'},
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
					    					store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [['1', '可用'],['0', '不可用']]		    					
					    					})
					    				})
					    			]
				    			}
							]
						}
					]
	    		},
    			{
	    			columnWidth:1,
					layout:"form",
    				items:[
    					{xtype:'textfield',name:'remark',id:'remark',allowNegative:false,fieldLabel:'备注信息',anchor:'97%'}
    				]
	    		}
	    	],
    		buttons: [{
		    			text:'保存',
						handler:function(){
							if(!editForm.getForm().isValid())
								return;
							
							editForm.getForm().submit({
								url:'basic/basic!insertExpertName.do',
								method:'post',
								params:{
									robj:Ext.encode(editForm.getForm().getValues())
								},
								success:function(result,action){
										Ext.MessageBox.alert('结果', '保存成功！');
										editForm.form.reset();
										grid.getStore().reload();
										editWin.hide();
								},
								failure : function() {
									Ext.MessageBox.alert('结果', '保存失败');
								}
							});
						}
		    		},{
		    			text:'取消',
		    			handler:function(){
		    				editWin.hide();
		    			}
		    		}
		    	]
	    }); 
		
		  //主添加、修改-窗体
	    var editWin = new Ext.Window({
	    	title:'用户信息',
	    	width:650,
	    	closable:true,
	    	autoHeight:true,
			closeAction:'hide',
	    	items:[editForm]
	    });
		
		//数据列字段
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
			sm,
			{header:'id',dataIndex:'id',hidden:true},
			{header:'专家名称', dataIndex:'expertname', sortable:true},
			{header:'单位名称',  dataIndex:'expertdept', sortable:true},
			{header:'专业名称',  dataIndex:'specialty', sortable:true},
			{header:'专家职位',  dataIndex:'job', sortable:true},
			{header:'备注信息',  dataIndex:'remark', sortable:true},
			{header:'是否禁用', dataIndex:'state', sortable:true,
	    		renderer:function(v,m,record){
	    			var state = record.data.state;
					var s = "";
					if(state=='1')
						s = "启用";
					else
						s="<font color='red'>停用</font>";
	    			return s;
	    		}
			},
			{header:'排序号', dataIndex:'ordernum', hidden:true}
		]);
		//为数据列：准备数据
		var ds = this.ds = new Ext.data.Store({
			baseParams:{
				robj:Ext.encode({id:""})
			},
			proxy : new Ext.data.HttpProxy({url:'basic/basic!queryExpertNameList.do'}),
			reader : new Ext.data.JsonReader({
						root: 'data',
				        totalProperty: 'total'
				},
				[
					{name: 'id'},
					{name: 'expertname'},
					{name:'expertdept'},
					{name:'specialty'},
					{name:'job'},
					{name:'remark'},
					{name:'state'},
					{name:'ordernum'}
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
						text: '新增',
						iconCls: 'add-icon',
						handler: function() {
							editWin.show();
							editForm.getForm().setValues({id: ''})
							editForm.getForm().reset();
						}
					},'-',
					{
						text: '修改'	,
						iconCls: 'edit-icon',
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
						text: '启用'	,
						iconCls: 'basic-play',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择启用的用户"); 
							 	 return; 
							 } else{
								delete_play_stop(selectedRows,"启用");
							 }
						}
					},'-',
					{
						text: '停用'	,
						iconCls: 'basic-stop',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择停用的用户"); 
							 	 return; 
							 } else{
								delete_play_stop(selectedRows,"停用");
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
				url: 'basic/basic!geExpertInfoByID.do',
				params: {robj:Ext.encode({id:id})},
				success:function(from,action){
				}
			});
			editWin.show();
		}
		
		//删除、启用、停用
		function delete_play_stop(selectedRows,type){
			Ext.Msg.confirm("信息","确定"+type+"!",function(key){
				if(key !='yes')
					return;
				else{
					var idStr= "";
				    var nameStr = "";
				    for(i=0;i<selectedRows.length;i++){
				    	  var state = selectedRows[i].data.state;
						  if(state=='1' && type=='启用'){
						  	 var expertname = selectedRows[i].data.expertname;
						  	 Ext.MessageBox.alert("信息",expertname+" 已经启用！");
						  	 return;
						  }
						 else if(state=='0' && type=='停用'){
						 	 var expertname = selectedRows[i].data.expertname;
						  	 Ext.MessageBox.alert("信息",expertname+" 已经停用！");
						  	 return;
						 }
						  idStr = idStr==""?selectedRows[i].data.id:idStr+","+selectedRows[i].data.id;
						  nameStr = nameStr==""?selectedRows[i].data.expertname:nameStr+","+selectedRows[i].data.expertname;
				    }
				    Ext.Ajax.request({
						url:'basic/basic!delete_play_stopExpertName.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						params:{
							robj:Ext.encode({idStr:idStr,nameStr:nameStr,type:type})
						},
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
            items:[grid]
        });
        
		com.basic.expertNameList.superclass.initComponent.apply(this, arguments);
	}
})