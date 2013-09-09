Ext.namespace('com.basic.userRole');

com.basic.userRole = Ext.extend(Ext.Panel,{
	pthis:null,
	initComponent: function() {
		var userid = this.pthis.userid;
		var w = parseInt(document.body.clientWidth*0.3);
	    var h = parseInt(document.body.clientHeight*0.7);
		//获取所有的RoleName
		var allRoleGrid_ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({url:cxt+'/basic/queryRoleList.do'}),
			remoteSort: true,
			reader: new Ext.data.JsonReader(
				{
					root: 'invdata',
			        totalProperty: 'total'
				},
				[
					{name: 'id'},
					{name: 'rolename'}
				]
			)
		});
		
		//角色CM
		var allRoleGrid_cm =  new Ext.grid.ColumnModel([
			{header:'角色名称', dataIndex:'rolename', menuDisabled:true, sortable:true},
			{header:'id', dataIndex:'id',hidden:true}
		]);
		
		//组合角色面板
		var allRoleGrid = new Ext.grid.GridPanel({
			region: 'center',
			ds: allRoleGrid_ds,
			cm: allRoleGrid_cm,
			viewConfig: {
				forceFit: true
			}
		});
		allRoleGrid_ds.load({params:{start:0,limit:20}}); //对数据进行初始化
		
		//已经选择的角色列表
		var role_result_store = new Ext.data.Store({
			baseParams:{userid:userid},
			proxy : new Ext.data.HttpProxy({url:cxt+'/basic/querySelectRoleListByUserId.do'}),
			remoteSort: true,
			reader: new Ext.data.JsonReader(
				{
					root: 'invdata',
			        totalProperty: 'total'
				},
				[
					{name: 'roleid'},
					{name: 'rolename'}
				]
			)
		});
		
		//已经选择角色CM
		var role_result_cm = new Ext.grid.ColumnModel([
			{header:'已选择', dataIndex:'rolename', menuDisabled:true, sortable:true, width: 70},
			{header:'roleid', dataIndex:'roleid',hidden:true}
		]);
		
		//已经选择角色Grid
		var role_result_grid = new Ext.grid.GridPanel({
			region: 'center',
		    ds: role_result_store,
			cm: role_result_cm,
			viewConfig: {
				forceFit: true
			}
		});
		role_result_store.load({params:{start:0,limit:20}}); //对数据进行初始化
		
		
		//添加 - 列表双击事件
		allRoleGrid.addListener('rowdblclick', function(allRoleGrid, rowindex, e) {
			addremove();
		});
		
		//删除-列表双击事件
		role_result_grid.addListener('rowdblclick', function(role_result_grid, rowindex, e) {
			var record =role_result_grid.getSelectionModel().getSelected();
			role_result_store.remove(record);
		});
		
		var userRolePane = new Ext.Panel({
			region: 'center',
			layout:'table',
			layoutConfig: {columns:5},
			bodyStyle: "background-color:#FDFDFD; border-width: 0px 0px 0px 0px;",
			items:[
				{
			        colspan:2,
			        width:(w-50)/2-10,
			        height: h,
			        layout:'border',
			        items:[allRoleGrid]
			    },
			     {
			    	width:50,
			    	height: h,
			    	layout:'fit',
			        layout: {type:'vbox',padding:'5',pack:'center',align:'center'},
		            defaults:{margins:'0 0 5 0'},
					items: [
						new Ext.Button({
							text: ' >> ',
							handler: function () {
								addremove();
							}
						}),
						new Ext.Button({
							text: ' << ',
							handler: function () {
								var record =role_result_grid.getSelectionModel().getSelected();
								role_result_store.remove(record);
							}
						})
					]
			    },
			    {
			        colspan:2,
			        width:(w-50)/2,
			        height: h,
			        layout:'border',
			        items:[role_result_grid]
			    }
			]
		});
	
		
		
	 var userRoleWin = new Ext.Window({
			title: '编辑用户角色',
			layout:'fit',
			width:w,
			height:h,
			closeAction:'hide',
			plain: true,
			frame: true,
			buttonAlign:'center',
			layout: 'border',
			items: [userRolePane],
			buttons:[
				{
					text: '保存'	,
					handler: function() {
						var roleResult = "";
						role_result_store.each(function(rec){
					    	roleResult = roleResult==""?rec.data.roleid:roleResult+","+rec.data.roleid;
					   	});
						Ext.Ajax.request({
							method: 'post',
							url: cxt+'/basic/insertUser_Role.do',
							params: {userid:userid, roleids: roleResult},
							success:function(resp){
								var obj=Ext.util.JSON.decode(resp.responseText);
								if(obj.success == true) {
									Ext.MessageBox.alert('提示', '保存成功！');
								}
								else {
									Ext.MessageBox.alert('出错了', '保存失败!' );
								}
							}
						});
					}
				},
				{
					text: '取消'	,scope:this,
					handler: function() {
						userRoleWin.hide();
					}
				}
			]
		}).show();
		//角色增加和删除
		function addremove (){
			if(allRoleGrid.getSelectionModel().hasSelection()) {
					var record = allRoleGrid.getSelectionModel().getSelected();
					var defaultData = {
					    roleid: record.id, 
						rolename:record.data.rolename
					};
					var r = new role_result_store.recordType(defaultData, record.id); // 创建 新记录
					var bool = false;
					role_result_store.each(function(rec){
				    	if(rec.data.roleid==record.id)
				    		bool = true;
				   	});
					if(bool==false){
						role_result_store.insert(0, r); // 向store中插入一条 新记录(另请参见 add)
					}else{
						Ext.MessageBox.alert('提醒', '此角色已存在!');
					}
				}
		}
		com.basic.userRole.superclass.initComponent.apply(this, arguments);
	},
	initMethod: function() {
	}
})

