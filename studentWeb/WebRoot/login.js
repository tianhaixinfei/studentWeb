/**
 * 登陆页面
 * 
 * @author HanXiansheng
 * @since 2012-06-28
 */
Ext.onReady(function() {
	
	Ext.QuickTips.init();
	
	 var loginForm = this.loginForm = new Ext.form.FormPanel({
			title : "身份认证",
			id : 'loginForm',
			frame: true,
			width : 330,
			bodyStyle : 'padding:20 0 0 30',
			labelWidth : 40,
			labelSeparator : '：',
			layout: 'column',
			items:[
				{
					columnWidth: .6,layout: 'form',
					items : [
						{
							xtype : 'textfield',
							fieldLabel : '帐&nbsp;号',
							name : 'ucode',
							id : 'ucode',
							value:'admin',
							anchor : '90%',
							cls : 'login_user',
							blankText : '帐号不能为空,请输入!',
							maxLength : 30,
							maxLengthText : '账号的最大长度为30个字符',
							allowBlank : false,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
//										Ext.getCmp('password').focus();
										login();
									}
								}
							}
						},
						{
							xtype : 'textfield',
							fieldLabel : '密&nbsp;码',
							name : 'upass',
							id : 'upass',
							cls : 'login_key',
							inputType : 'password',
							blankText : '密码不能为空,请输入!',
							maxLength : 20,
							anchor : '90%',
							value:'1',
							maxLengthText : '密码的最大长度为20个字符',
							allowBlank : false,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										login();
									}
								}
							}
						},
						{
							layout: 'column',
							items: [
								{
									columnWidth: .45, layout: 'form',
									items: [
								     	new Ext.form.ComboBox({
											fieldLabel:'职&nbsp;称',
											name:'type',
											triggerAction:'all',
											editable:false,
											mode:'local',
											anchor : '100%',
											hiddenName: 'type',
											value:'老师',
											valueField:'value',
											displayField:'text',
											store : new Ext.data.SimpleStore({
												fields: ['value', 'text'],
												data: [['学生', '学生'],['老师', '老师']]						    					
											}),
											listeners : {
												specialkey : function(field, e) {
													if (e.getKey() == Ext.EventObject.ENTER) {
														login();
													}
												}
											}
										})
									]
								},
								{
									columnWidth: .55,layout: 'form',labelWidth : 47,
									items:[
										{
											xtype:'textfield',
											allowBlank:false,
											blankText:'请填写验证码',
						                    fieldLabel: '&nbsp;验证码',
						                    name: 'valicode',
						                    anchor:'84%',
						                    listeners : {
												specialkey : function(field, e) {
													if (e.getKey() == Ext.EventObject.ENTER) {
														login()();
													}
												}
											}
										}
									]
								}
							]
						}
					]
				},
				{
					columnWidth: .4,
					items:[
						{
							xtype: 'panel',
		                    height: 100,
		                    html: '<div style="margin:0px 0px 0px 4px"><a href="#"><img alt="如果看不清楚请单击图片更换图片。" onclick="this.src=\'captcha.jsp?d=\'+new Date();" id="code" height="70" width="140" src="'+this.cxt+'/captcha.jsp?d=' + new Date() + '" border="0"></a></div>',
		                    border: false
						}
					]
				}
			]
	 })
	
	var panel = new Ext.Panel({
		el : 'hello-tabs',
		autoTabs : true,
		layout: 'form',
		deferredRender : false,
		border : false,
		items : {
			xtype : 'tabpanel',
			id : 'loginTabs',
			activeTab : 0,
			height : 300,
			border : false,
			listeners : {
				'show' : function(obj) {
					loginForm.form.reset();
					loginForm.findById('ucode').focus(true, 50);
				}
			},
			items : [
				loginForm, 
				{
					title : '信息公告',
					contentEl : 'infoDiv',
					defaults : {
						width : 230
					}
				}, 
				{
					title : '关于',
					contentEl : 'aboutDiv',
					defaults : {
						width : 230
					}
				}
			]
		}
	});

	// 清除按钮上下文菜单
	var mainMenu = new Ext.menu.Menu({
		id : 'mainMenu',
		items : [{
			text : '清除记忆',
			iconCls : 'status_awayIcon',
			handler : function() {
				clearCookie('login.ucode');
				var ucode = Ext.getCmp('loginForm').findById('ucode');
				Ext.getCmp('loginForm').form.reset();
				ucode.setValue('');
				ucode.focus();
			}
		}, {
			text : '切换到全屏模式',
			iconCls : 'imageIcon',
			handler : function() {
				window.location.href = './HTML/fullScreen.htm';
			}
		}]
	});

	var aa = [
    	'<h1 align="center">用户注册信息</h1>'
    ];
	
	var info = new Ext.Panel({
		region: 'west',
		preventBodyReset: true,
		width:350,
		height:60,
		html: aa.join('')
	});
    
	// store
	var prentDeptStore = new Ext.data.Store({
		baseParams:{parentid:"0"},
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
	prentDeptStore.load();
	
	// deptStore
	var deptStore = new Ext.data.Store({
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
	
	// subdeptStore
	var subdeptStore = new Ext.data.Store({
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
	
	//注册
    var registerForm = this.registerForm = new Ext.form.FormPanel({
    	labelAlign: 'right',
    	region: 'center',
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
    
    var html = [
    	'<h1 align="center">注册声明</h1>',
    	'<h2>尊敬的同学你好！在注册信息前请认真阅读注册信息。</h2>',
    	'<p>系统官方地址 <a href="http://localhost:8080/studentWeb/login.jsp">北大作业管理系统</a></p>',
    	'<ol>',
    		'<li>提供的网络版期刊全文链接的使用范围仅限于浏览和用于个人学习、研究目的少量下载与暂时保存。下载（包括印出）的任何材料都含有版权提示信息，为防止该文的全部或部分被用于其它目的，这样的提示信息不得被删改。删改版权提示信息的用户将根据著作权法承担版权侵权责任</li>',
    		'<li>北京大学创办于1898年，初名京师大学堂，是中国近代第一所国立大学，以最高学府身份创立，最初也是国家最高教育行政机关，行使教育部职能。北大开创了中国高校中最早的文科、理科、政科、商科、农科、医科等学科的大学教育，是近代以来中国高等教育的奠基者。在中国近现代史上，北大始终与中国国家民族的命运紧密相连，深刻的影响了中国百年来的历史进程。学校现为国家“211工程”、“985工程”重点建设大学、中国顶尖学府“九校联盟”（C9联盟）的重要成员。北京大学已经成为中国培养高素质、创造性人才的综合性研究型高校。</li>',
    		'<li>北京大学，简称“北大”，是中国第一所国立大学，也是中国近代第一个以“大学”身份</li>',
    	'</ol>',
    	'<blockquote>北京大学作业管理系统-2013</blockquote>'
    ];
	
	var registerPanel = new Ext.Panel({
		region: 'west',
		preventBodyReset: true,
		width:350,
    	height:240,
		html: html.join('')
	});
	
    //主添加、修改-窗体
    var registerWin = this.registerWin = new Ext.Window({
    	title:'学生信息注册',
    	width:700,
    	height:480,
    	layout:'border',
    	closable:true,
    	modal:true,
		closeAction:'hide',
    	items:[registerPanel,registerForm]
    });
    
    //找回密码面板
    var findUpassPanel = new Ext.form.FormPanel({
		width:240,
    	height:80,
    	bodyStyle : 'padding:5 0 0 10',
		labelWidth : 60,
		frame: true,
    	items:[
    	    {xtype:'textfield',name:'uname',height:25,fieldLabel:'注册姓名',allowBlank:false,blankText:'用户名称不能为空',anchor:'90%'},
			{xtype:'numberfield',name:'age',height:25,fieldLabel:'注册QQ',allowBlank:false,blankText:'注册QQ不能为空',anchor:'90%'},
			{xtype:'textfield',name:'mail',height:26,fieldLabel:'注册邮箱',vtype:'email',allowBlank:false,blankText:'邮箱地址不能为空',anchor:'90%'}
		]
	});
    
        //找回密码窗体
    var findUpassWin = this.findUpassWin = new Ext.Window({
    	title:'找回密码信息',
    	width:300,
    	height:200,
    	buttonAlign:'center',
    	iconCls : 'keyIcon',
    	layout:'fit',
    	modal:true,
		closeAction:'hide',
    	items:[findUpassPanel],
		buttons: [
			 {
    			text:'找回',scope:this,
				handler:function(){
					if (!findUpassPanel.form.isValid()) 
						return;
					findUpassPanel.form.submit({
						url : cxt+'/user/findUpassByInfo.do',
						waitTitle : '提示',
						method : 'POST',
						waitMsg : '正在处理数据,请稍候...',
						success : function(form, action) {
							Ext.MessageBox.alert('提示', '找回密码成功，密码已经发回你注册邮箱', function() {
								findUpassWin.hide();
							});
						},
						failure : function(form, action) {
							var success = action.result.success;
							if (success == false) {
								Ext.MessageBox.alert('提示', '信息验证失败,请重新输入',
										function() {
											findUpassPanel.getForm().reset();
											findUpassPanel.getForm().findField('uname').focus();
										});
							} else {
								Ext.MessageBox.alert('提示', '密码修改失败');
							}
						}
					});
				}	    		
    		 },
    		 {
    			text:'取消',scope:this,
    			handler:function(){
    				findUpassWin.hide();
				}
    		 }
		]
    });
    
    
	var win = new Ext.Window({
		title : "作业管理系统",
		layout : 'fit',
		buttonAlign: 'center',
		width : 460,
		height : 300,
		closeAction : 'hide',
		plain : true,
		modal : true,
		collapsible : false,
		titleCollapse : true,
		maximizable : false,
		draggable : false,
		closable : false,
		resizable : false,
		animateTarget : document.body,
		items : panel,
		buttons : [
			{
				text : '&nbsp;登录',
				iconCls : 'acceptIcon_sub',
				handler : function() {
					login();
				}
			}, 
			{
				text : '&nbsp;注册',
				iconCls : 'add',scope:this,
				handler : function() {
					registerWin.show();
				}
			},
			{
				text : '&nbsp;找回密码',
				iconCls : 'tbar_syn',
				handler : function() {
					 findUpassWin.show();
				}
			},
			{
				text : '&nbsp;选项',
				iconCls : 'add_url',
				menu : mainMenu
			}
		]
	});
	win.show();
	
	/**
	 * 当登入界面再次打开时，从就从cookie中把用户名称取出
	 */
//	win.on('show', function() {
//		setTimeout(function() {
//					var ucode = Ext.getCmp('loginForm').findById('ucode');
//					var password = Ext.getCmp('loginForm').findById('password');
//					if (Ext.isEmpty(c_account)) {
//					} else {
//					}
//				}, 200);
//	}, this);

	/**
	 * 提交登陆请求
	 */
	function login() {
		var ucode = Ext.getCmp('loginForm').findById('ucode');
		
		if (Ext.getCmp('loginForm').form.isValid()) {
			this.loginForm.getForm().submit({
				url : this.cxt+'/user/login.do',
				waitTitle : '提示',
				method : 'POST',
				waitMsg : '正在验证您的身份,请稍候.....',
				success : function(form, action) {
					var info = action.result;
					if(info.success == 'valicode'){
						Ext.Msg.alert('提示', info.info, function() {
							Ext.getCmp('loginForm').form.reset();
						});
					}else{
						window.location.href = cxt+'/HTML/main/main.jsp';					
					}
				},
				failure : function(form, action) {
					var info = action.result.info;
					Ext.Msg.alert('提示', info, function() {
						Ext.getCmp('loginForm').form.reset();
					});
				}
			});
		}
	}
});


var bool = false;
function vlidateUcode(val,aaa){
	Ext.Ajax.request({
		url: cxt + '/user/valiUserCode.do',
		method: 'post',
		waitTitle:'请等待',
		async : true,
		waitMsg: '正在提交...',
		params:{ucode:val,userid:userId},
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
