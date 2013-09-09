Ext.onReady(function(){  
    Ext.QuickTips.init();  
    Ext.form.Field.prototype.msgTarget = 'side';  
    
   
	 Ext.apply(Ext.form.VTypes, {
	 	/**
	 	 * 验证此用户是否重名
	 	 */
	    valiUserCode : function(val, field) {
	    	var bool;
	    	Ext.Ajax.request({
				url: cxt + '/user/valiUserCode.do',
				method: 'post',
				waitTitle:'请等待',
				async : true,
				waitMsg: '正在提交...',
				params:{ucode:val},
				success: function(ret) {
					var info = Ext.util.JSON.decode(ret.responseText);
					if(info.success == 'true')
						bool = false;
					else
						bool = true;
					console.log(bool);
				}
			})
			console.log(bool);
			return bool;
	    },
	    valiUserCodeText : '此名称已被占用！'
	});

 })