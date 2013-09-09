
Ext.ns('App');
App.init = function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.Msg.minWidth = 300;

    App.LoginDialog.show();

    setTimeout(function() {
      Ext.get('loading').remove();
      Ext.get('loading-mask').fadeOut({ remove: true });
    }, 250);
};

Ext.onReady(App.init);
