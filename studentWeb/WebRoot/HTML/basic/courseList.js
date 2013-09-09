Ext.namespace('com.basic.courseList');

com.basic.courseList = Ext.extend(Ext.Panel,{
	initComponent: function() {
		//增加、修改
	    var editForm = this.editForm =  new Ext.form.FormPanel({
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
								xtype:'hidden',name:'courseid',id:'courseid'
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
								{xtype:'textfield',name:'coursename',id:'coursename',fieldLabel:'课程名称',allowBlank:false,blankText:'课程名称不能为空',anchor:'90%'}
							]
						},{
							columnWidth:.5,
							layout:'form',
							items:[
								{xtype:'numberfield',name:'orderno',value:'0',id:'orderno',fieldLabel:'排序编号',allowBlank:false,blankText:'排序编号不能为空',anchor:'90%'}
							]
						}
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
					if(!editForm.getForm().isValid())
						return;
					this.editForm.getForm().doAction('submit', {
						url:cxt+'/basic/insertCourse.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						success:function(form, action){
							if(action.result.success == true) {
								Ext.MessageBox.alert('结果', '保存成功！');
								editForm.form.reset();
								grid.getStore().reload();
								editWin.hide();
							}else{
								Ext.MessageBox.alert("提示信息","保存失败！");
							}
						}
					})
				}	    		
    		}
    		,{
    			text:'取消',
    			handler:function(){
					editForm.form.reset();
				    editWin.hide();
				}
    		}
    		]
	    }); 
		
	    //主添加、修改-窗体
	    var editWin = new Ext.Window({
	    	title:'资源信息',
	    	width:450,
	    	modal:true,
	    	closable:false,
	    	autoHeight:true,
			closeAction:'hide',
	    	items:[editForm]
	    });
	    
	    
		
		//数据列字段
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
			sm,
			{header:'courseid',dataIndex:'courseid',hidden:true},
			{header:'课程名称', dataIndex:'coursename', sortable:true},
			{header:'排序号',  dataIndex:'orderno', sortable:true},
			{header:'备注信息', dataIndex:'remark', sortable:true}
		]);
		//为数据列：准备数据
		var ds = this.ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({url:cxt+'/basic/queryCourseList.do'}),
			reader : new Ext.data.JsonReader({
					root: 'invdata',
			        totalProperty: 'total'
				},
				[
					{name: 'courseid'},
					{name: 'coursename'},
					{name:'orderno'},
					{name:'remark'}
				]
			)
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
			bbar: new Ext.PagingToolbar({
				pageSize: 30,
				store: this.ds,
				displayInfo: true,
				displayMsg: '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg: '没有记录'
			}),
			tbar: new Ext.Toolbar({
				buttons: [
					{
						text: '新增',
						iconCls: 'add',
						handler: function() {
							editForm.form.reset();
					 		editWin.show();
						}
					},'-',
					{
						text: '修改'	,
						iconCls: 'update_icon',
						handler: function() {
							editForm.form.reset();
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择修改的角色"); 
							 	 return; 
							 } else{
							 	var rs = grid.getSelectionModel().getSelected();
								showInfo(rs.data.courseid);
							 }
						}
					},'-',
					{
						text: '删除'	,
						iconCls: 'delete-icon',
						handler: function() {
							var selectedRows = grid.getSelectionModel().getSelections();
							if(selectedRows.length==0){ 
							  	Ext.Msg.alert("提示","请选择删除的角色"); 
							 	 return; 
							 } else{
								deleteRole(selectedRows);
							 }
						}
					}
				]
			})
		});
		this.ds.load({params:{start:0,limit:30}}); //对数据进行初始化
		
		//双击修改角色
		grid.addListener('rowdblclick', function(grid, rowindex, e) {
			var record = grid.getStore().getAt(rowindex);
			showInfo(record.data.courseid);
		});
		
		
		function showInfo(courseid) {
			editForm.load({
				url: cxt+'/basic/queryCourseById.do',
				params: {courseid:courseid},
				success:function(form,action){
				}
			});
			editWin.show();
		}
		
		//删除角色
		function deleteRole(selectedRows){
			Ext.Msg.confirm("信息","确定删除!",function(key){
				if(key !='yes')
					return;
				else{
					var idStr= "";
				    var nameStr = "";
				    for(i=0;i<selectedRows.length;i++){
						idStr = idStr==""?selectedRows[i].data.courseid:idStr+","+selectedRows[i].data.courseid;
				   		nameStr = nameStr==""?selectedRows[i].data.coursename:nameStr+","+selectedRows[i].data.coursename;				    	
				    }
				    Ext.Ajax.request({
						url:cxt+'/basic/deleteCourseById.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						params:{idstr:idStr,namestr:nameStr},
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
            layout:'fit',
            items:[grid]
        });
		com.basic.courseList.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function() {
	}
})
