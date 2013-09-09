window.ChangeTheme = function(v) {
	var cp3 = new Ext.state.CookieProvider();     
	var v =cp3.get('themeStyle');   
	if(window.Ext&&v&&v!="") {
		var rule = "/DEP/resources/css/xtheme-"+v+".css";
		Ext.util.CSS.swapStyleSheet("theme",rule);
	}
}();
