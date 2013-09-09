Ext.onReady(function() {
	//初始化Ext.QuickTips，以使得tip提示可用
	Ext.QuickTips.init();
	
	//初始化主题
	var default_theme;
	Ext.Ajax.request({
		method:'post',
		url:this.cxt+'/basic/queryUserTheme.do',
		success:function(ret){
			var retText = Ext.decode(ret.responseText);
			default_theme = retText.themename;
			Ext.util.CSS.swapStyleSheet("theme", "../../resources/"+retText.showCss);
			Ext.util.CSS.swapStyleSheet("icon", "../../resources/css/ext_icon.css");
		},failure : function(response) {
			Ext.Msg.alert('提示', '获取数据失败');
		}
	})
    
	/**
	 * 一、切换系统主题样式
	 */
	//显示切换按钮
	var themeButton = new Ext.Button({
		text : '主题',
		iconCls : 'themeIcon',
		iconAlign : 'left',
		scale : 'medium',
		width : 50,
		tooltip : '<span style="font-size:12px">切换系统主题样式</span>',
		pressed : true,
		arrowAlign : 'right',
		renderTo : 'themeDiv',
		handler : function() {
			themeWindowInit();
		}
	});
		
	//主题结构组织树
	var root = new Ext.tree.TreeNode({
		text : '根节点',
		id : '00'
	});
	var node01 = new Ext.tree.TreeNode({
		text : '蓝色妖姬',
		theme : 'default',
		id : '01'
	});
	var node02 = new Ext.tree.TreeNode({
		text : '黑色经典',
		theme : 'ext-all-xtheme-black',
		id : '02'
	});
	var node03 = new Ext.tree.TreeNode({
		text : '浅白模板',
		theme : 'ext-all-xtheme-blue',
		id : '03'
	});
	var node04 = new Ext.tree.TreeNode({
		text : '褐色模板',
		theme : 'ext-all-xtheme-brown',
		id : '04'
	});
	var node05 = new Ext.tree.TreeNode({
		text : '浅褐模板',
		theme : 'ext-all-xtheme-brown02',
		id : '05'
	});
	var node06 = new Ext.tree.TreeNode({
		text : '灰色模板',
		theme : 'ext-all-xtheme-gray',
		id : '06'
	});
	var node07 = new Ext.tree.TreeNode({
		text : '绿色模板',
		theme : 'ext-all-xtheme-green',
		id : '07'
	});
	var node08 = new Ext.tree.TreeNode({
		text : '粉红化身',
		theme : 'ext-all-xtheme-pink',
		id : '08'
	});
	var node09 = new Ext.tree.TreeNode({
		text : '紫色模板',
		theme : 'ext-all-xtheme-purple',
		id : '09'
	});
	var node10 = new Ext.tree.TreeNode({
		text : '红色模板',
		theme : 'ext-all-xtheme-red03',
		id : '10'
	});
	root.appendChild(node01);
	root.appendChild(node02);
	root.appendChild(node03);
	root.appendChild(node04);
	root.appendChild(node05);
	root.appendChild(node06);
	root.appendChild(node07);
	root.appendChild(node08);
	root.appendChild(node09);
	root.appendChild(node10);
	var themeTree = new Ext.tree.TreePanel({
		autoHeight : false,
		autoWidth : false,
		autoScroll : false,
		animate : false,
		rootVisible : false,
		border : false,
		containerScroll : true,
		root : root
	});
	themeTree.on('click', function(node) {
		var theme = node.attributes.theme;
		var o = document.getElementById('previewDiv');
		o.innerHTML = '<img src="../../resources/images/theme/' + theme+'.jpg" />';
	});

	var themenav = new Ext.Panel({
		title : '<span class="commoncss">主题列表</span>',
		region : 'west',
		split : true,
		width : 120,
		minSize : 120,
		maxSize : 150,
		collapsible : true,
		margins : '3 0 3 3',
		items:[themeTree],
		bbar : [{
			text : '保存',
			iconCls : 'acceptIcon',
			handler : function() {
				var o = themeTree.getSelectionModel().getSelectedNode();
				if(o==null){
					o.attributes.theme = "default";
					o.text = "蓝色妖姬";
				}
				saveUserTheme(o);
			}
		}, '->', {
			text : '关闭',
			iconCls : 'deleteIcon',
			handler : function() {
				themeWindow.hide();
			}
		}]
	});

	
	var previewPanel = new Ext.Panel({
		region : 'center',
		title : '<span class="commoncss">主题预览</span>',
		margins : '3 3 3 0',
		activeTab : 0,
		defaults : {
			autoScroll : true
		},
		contentEl : 'previewDiv'
	});
	
	//主题窗口初始化
	function themeWindowInit() {
		var o = document.getElementById('previewDiv');
		o.innerHTML = '<img src="../../resources/images/theme/' + default_theme+ '.jpg" />';
		themeWindow.show();
	}
	
	//主题：主状态
	var themeWindow = new Ext.Window({
		title : '<span class="commoncss">主题设置</span>',
		closable : true,
		width : 500,
		height : 350,
		closeAction : 'hide',
		iconCls : 'theme2Icon',
		collapsible : false,
		titleCollapse : false,
		border : true,
		maximizable : false,
		resizable : false,
		modal : true,
		animCollapse : true,
		animateTarget : Ext.getBody(),
		plain : true,
		layout : 'border',
		items : [themenav, previewPanel]
	});
	
	//保存用户自定义主题
	function saveUserTheme(o) {
		Ext.Ajax.request({
			url : cxt+'/user/savaUserTheme.do',
			method: 'post',
			params:{themename:o.attributes.theme},
			success : function(response) {
				showWaitMsg('正在为您应用主题...');
				location.reload();
				themeWindow.hide();
			},
			failure : function(response) {
				Ext.Msg.alert('提示', '数据保存失败');
			}
		});
	}	
		
		//注册
    var userEditForm = this.userEditForm = new Ext.form.FormPanel({
    	labelAlign: 'right',
    	buttonAlign:'center',
    	width:350,
    	height:240,
		labelWidth: 60,
		frame: true,
    	items:[
	       	info,
    	    {xtype:'textfield',name:'uname',emptyText: '必填项',height:25,fieldLabel:'用户名称',allowBlank:false,blankText:'用户名称不能为空',anchor:'90%'},
    	    {
				xtype:'textfield',name:'ucode',height:25,emptyText: '必填项',fieldLabel:'登入名称',allowBlank:false,blankText:'登入名称不能为空',
				anchor:'90%',validator: vlidateUcode,invalidText:'用户名已经注册'
			},
			{xtype:'numberfield',name:'stunumber',emptyText: '必填项',height:25,fieldLabel:'学生学号',allowBlank:false,blankText:'学生学号不能为空',anchor:'90%'},
			{xtype:'numberfield',name:'age',height:25,fieldLabel:'用户年龄',anchor:'90%'},
			{
				layout:'form',
				items:[
    				new Ext.form.ComboBox({
    					fieldLabel:'用户性别',
						name: 'sex',
						hiddenName: 'sex',
						anchor:'90%',
						height:25,
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
			{
				layout:'form',
				items:[
    				new Ext.form.ComboBox({
    					fieldLabel:'主页样式',
						name: 'themeName',
						hiddenName: 'themeName',
						anchor:'90%',
						height:25,
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
			},
			{xtype:'numberfield',name:'qq',height:25,emptyText: '必填项',fieldLabel:'用 户QQ',allowBlank:false,blankText:'用 户QQ不能为空',anchor:'90%'},
			{xtype:'numberfield',name:'tel',height:25,fieldLabel:'移动电话',allowNegative:false,allowDecimals:false,anchor:'90%'},
			{xtype:'textfield',name:'mail',emptyText: '必填项',height:26,fieldLabel:'邮箱地址',vtype:'email',allowBlank:false,blankText:'邮箱地址不能为空',anchor:'90%'},
			{
				layout:'form',
				items:[
   					new Ext.form.ComboBox({
						fieldLabel: '所属院系',
						name: 'parentDeptId',
						hiddenName: 'parentDeptId',
						anchor : '90%',
						emptyText: '首先选择我...',
						triggerAction: 'all', 
						editable: false,
						allowBlank:false,
						blankText:'院系不能为空',
						mode: 'local',
						valueField: 'deptid',
						displayField: 'deptname',
						store:prentDeptStore,
    					listeners : {
    						beforeselect: function( combo , record , index  ){
    							registerForm.getForm().findField('deptId').setValue();
    							registerForm.getForm().findField('subDeptId').setValue();
    							var deptid = record.data.deptid;
								deptStore.load({params: {parentid: deptid, limit: 100}});
							}
						}
					})
    			]
			},
			{
				layout:'form',
				items:[
   					new Ext.form.ComboBox({
						fieldLabel: '所属专业',
						name: 'deptId',
						hiddenName: 'deptId',
						anchor : '90%',
						emptyText: '其次选择我...',
						triggerAction: 'all', 
						editable: false,
						allowBlank:false,
						blankText:'专业不能为空',
						mode: 'local',
						valueField: 'deptid',
						displayField: 'deptname',
						store:deptStore,
    					listeners : {
    						beforeselect: function( combo , record , index  ){
    							var deptid = record.data.deptid;
    							registerForm.getForm().findField('subDeptId').setValue();
    							subdeptStore.load({params: {parentid: deptid, limit: 100}});
							}
						}
					})
    			]
			},
			{
				layout:'form',
				items:[
   					new Ext.form.ComboBox({
						fieldLabel: '所属年级',
						name: 'subDeptId',
						hiddenName: 'subDeptId',
						emptyText: '最后选择我...',
						anchor : '90%',
						allowBlank:false,
						blankText:'年级不能为空',
						triggerAction: 'all', 
						editable: false,
						mode: 'local',
						valueField: 'deptid',
						displayField: 'deptname',
						store:subdeptStore
					})
    			]
			}
    	],
		buttons: [
	         {
    			text:'提交',scope:this,
				handler:function(){
					if(!registerForm.getForm().isValid())
						return;
					registerForm.getForm().doAction('submit', {
						url:cxt+'/user/registerUser.do',
						method:'post',
						waitTitle:'提示',
						waitMsg:'正在提交...',
						success: function(form, action) {
							if(action.result.success == true) {
								Ext.MessageBox.alert('结果', '注册成功！');
								registerForm.getForm().reset();
								registerWin.hide();          
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
    			text:'重置',scope:this,
				handler:function(){
					registerForm.getForm().reset();
				}	    		
    		 },
    		 {
    			text:'取消',scope:this,
    			handler:function(){
    				registerWin.hide();
				}
    		 }
		]
    }); 
		
     //主添加、修改-窗体
    var userEditWin = this.userEditWin = new Ext.Window({
    	title:'修改学生信息注册',
    	width:700,
    	height:480,
    	layout:'border',
    	closable:true,
    	modal:true,
		closeAction:'hide',
    	items:[registerPanel,registerForm]
    });
    
	/**
	 * 二、首选项设置
	 */
	var mainMenu = new Ext.menu.Menu({
		id : 'mainMenu',
		items : [
			{
				text : '密码修改',
				iconCls : 'keyIcon',
				handler : function() {
					updateUserInit();
				}
			}, 
			{
				text : '信息修改',
				iconCls : 'userIcon',
				handler : function() {
					
				}
			},
			{
				text : '系统锁定',
				iconCls : 'lockIcon',
				handler : function() {
					lockWindow.show();
					setCookie("super.lockflag", '1', 240);
				}
			}
		]
	});

	var configButton = new Ext.Button({
		text : '首选项',
		iconCls : 'config2Icon',
		iconAlign : 'left',
		scale : 'medium',
		width : 50,
		tooltip : '<span style="font-size:12px">首选项设置</span>',
		pressed : true,
		renderTo : 'configDiv',
		menu : mainMenu
	});

	
	//密码修改
	var userFormPanel = new Ext.form.FormPanel({
		defaultType : 'textfield',
		labelAlign : 'right',
		labelWidth : 70,
		frame : false,
		bodyStyle : 'padding:5 5 0',
		items : [
	        {
				fieldLabel : '登录帐户',
				name : 'ucode',
				id : 'ucode',
				allowBlank : false,
				readOnly : true,
				fieldClass : 'x-custom-field-disabled',
				anchor : '99%'
			}, {
				fieldLabel : '真实姓名',
				name : 'uname',
				id : 'uname',
				allowBlank : false,
				readOnly : true,
				fieldClass : 'x-custom-field-disabled',
				anchor : '99%'
			}, {
				fieldLabel : '当前密码',
				name : 'upass',
				id : 'upass',
				inputType : 'password',
				labelStyle : micolor,
				maxLength : 50,
				allowBlank : false,
				anchor : '99%'
			}, {
				fieldLabel : '新设密码',
				name : 'newpass',
				id : 'newpass',
				inputType : 'password',
				labelStyle : micolor,
				maxLength : 50,
				allowBlank : false,
				anchor : '99%'
			}, {
				fieldLabel : '确认新密码',
				name : 'newpass1',
				id : 'newpass1',
				inputType : 'password',
				labelStyle : micolor,
				maxLength : 50,
				allowBlank : false,
				anchor : '99%'
			}, {
				id : 'id',
				name : 'id',
				hidden : true
			}]
		});

	//加载当前登录用户信息
	function updateUserInit() {
		userFormPanel.form.reset();
		userWindow.show();
		userWindow.on('show', function() {
			setTimeout(function() {
				userFormPanel.load({
						waitTitle : '提示',
						waitMsg : '正在读取用户信息,请稍候...',
						params: {id:userId},
						url : this.cxt+'/user/getUserInfoByID.do',
						success : function(form, action) {
						},
						failure : function(form, action) {
							Ext.Msg.alert('提示','数据读取失败:'+ action.failureType);
						}
					});
			}, 5);
		});
	}	
	
	//密码修改主题框***
	var userWindow = new Ext.Window({
		layout : 'fit',
		width : 300,
		height : 205,
		resizable : false,
		draggable : true,
		closeAction : 'hide',
		modal : true,
		title : '<span class="commoncss">密码修改</span>',
		iconCls : 'keyIcon',
		titleCollapse : true,
		maximizable : false,
		buttonAlign : 'center',
		border : false,
		animCollapse : true,
		animateTarget : Ext.getBody(),
		constrain : true,
		listeners : {
			'show' : function(obj) {
				Ext.getCmp('upass').focus(true,200);
			}
		},
		items : [userFormPanel],
		buttons : [
			{
				text : '保存',
				handler : function() {
					updateUser();
				}
			}, {
				text : '关闭',
				handler : function() {
					userWindow.hide();
				}
			}
		]
	});
	
	//提交密码修改信息
	function updateUser() {
		if (!userFormPanel.form.isValid()) {
			return;
		}
		newpass = Ext.getCmp('newpass').getValue();
		newpass1 = Ext.getCmp('newpass1').getValue();
		if (newpass != newpass1) {
			Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
			Ext.getCmp('newpass').setValue('');
			Ext.getCmp('newpass1').setValue('');
			return;
		}
		userFormPanel.form.submit({
			url : cxt+'/user/updateUserPassword.do',
			waitTitle : '提示',
			method : 'POST',
			waitMsg : '正在处理数据,请稍候...',
			success : function(form, action) {
				Ext.MessageBox.alert('提示', '密码修改成功', function() {
					userWindow.hide();
				});
			},
			failure : function(form, action) {
				var success = action.result.success;
				if (success == false) {
					Ext.MessageBox.alert('提示', '您输入的当前密码验证失败,请重新输入',
							function() {
								Ext.getCmp('upass').setValue('');
								Ext.getCmp('upass').focus();
							});
				} else {
					Ext.MessageBox.alert('提示', '密码修改失败');
				}
			}
		});
	}

	//系统锁定=面板
	var lockForm = new Ext.form.FormPanel({
		labelWidth : 60,
		defaultType : 'textfield',
		labelAlign : 'right',
		bodyStyle : 'padding:10 5 5 5',
		layout : 'form',
		items : [{
			fieldLabel : '帐户密码',
			name : 'password',
			inputType : 'password',
			id : 'password_lock',
			labelStyle : micolor,
			allowBlank : false,
			maxLength : 50,
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == Ext.EventObject.ENTER) {
						unlockSystem();
					}
				}
			},
			anchor : '100%'
		}, {
			xtype : 'panel',
			border : false,
			html : '<div style="font-size:12px;margin-left:10px">(提示:系统已成功锁定,解锁请输入登录帐户密码)</div>'
		}]
	});
	
	//系统锁定主体框****
	var lockWindow = new Ext.Window({
			title : '<span class="commoncss">系统锁定</span>',
			iconCls : 'lockIcon',
			layout : 'fit',
			width : 320,
			height : 130,
			closeAction : 'hide',
			collapsible : false,
			closable : false,
			maximizable : false,
			border : false,
			modal : true,
			animateTarget : Ext.getBody(),
			items : [lockForm],
			listeners : {
				'show' : function(obj) {
					lockForm.form.reset();
					lockForm.findById('password_lock').focus(true, 50);
				}
			},
			buttons : [
					{
						text : '解锁',
						iconCls : 'keyIcon',
						handler : function() {
							unlockSystem();
						}
					},
					{
						text : '重新登录',
						iconCls : 'tbar_synchronizeIcon',
						handler : function() {
							setCookie("super.lockflag", '0', 240);
							window.location.href = cxt+'/login.jsp';
						}
					}]
		});
	
	//提交解锁密码		
	function unlockSystem() {
//			 showWaitMsg();
			if (!lockForm.form.isValid())
				return;
			Ext.Ajax.request({
				url : this.cxt+'/basic/validateUPass.do',
				params : {
					upass:lockForm.findById('password_lock').getValue()
				},
				method:'post',
				success : function(response, opts) {
					var result = Ext.decode(response.responseText);
					if (result.success == true) {
						lockWindow.hide();
						setCookie("super.lockflag", '0', 240);
					} else {
						Ext.Msg.alert('提示', '密码错误,请重新输入', function() {
							lockForm.form.reset();
							lockForm.findById('password_lock').focus();
						});
					}
				},
				failure : function(response, opts) {
				}
			});
		}
	if (getCookie("super.lockflag") == '1') {
		lockWindow.show();
	}
	
	/**
	 * 三、系统退出
	 */
	var closeButton = new Ext.Button({
		iconCls : 'cancel_48Icon',
		iconAlign : 'left',
		scale : 'medium',
		width : 30,
		tooltip : '<span style="font-size:12px">切换用户,安全退出系统</span>',
		pressed : true,
		arrowAlign : 'right',
		renderTo : 'closeDiv',
		handler : function() {
			window.location.href = cxt+'/login.jsp';
		}
	});
});

/**
 * 11、显示系统时钟
 */
function showTime() {
//	var date = new Date();
//	var h = date.getHours();
//	h = h < 10 ? '0' + h : h;
//	var m = date.getMinutes();
//	m = m < 10 ? '0' + m : m;
//	var s = date.getSeconds();
//	s = s < 10 ? '0' + s : s;
//	var showTime = h + ":" + m + ":" + s;
//	document.getElementById('rTime').innerHTML = h + ":" + m + ":" + s;
}

window.onload = function() {
	 var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	 var ssdate=new Date();  
	 document.getElementById('weekDays').innerHTML  = ssdate.getDay();
}