Ext.apply(Ext.form.VTypes, {
    password : function(val, field) {
        return false;
    },
    passwordText : '此字段不符合要求！！！！'
});


Ext.onReady(function(){

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    var bd = Ext.getBody();

    var pwd = new Ext.FormPanel({
      labelWidth: 125,
      frame: true,
      width: 350,
      items: [
      	{
      	 xtype:'textfield',
		 allowBlank:false,
		 blankText:'登入名称不能为空',
         fieldLabel: 'Confirm Password',
       	 vtype: 'password'
      	}
      ]
    });
    pwd.render('pw');
});
