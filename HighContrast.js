var HighContrast = Tool.extend({
	
	name : "HighContrast",
	
	CSSString: "*,body,html{color:#ff0!important;background-color:#000!important;font-family:sans-serif!important;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)!important}html{background:#eee!important}:focus{outline:2px solid #0FF!important}body{font-size:1.4em!important;line-height:1.6em!important;text-align:left!important;margin-left:1em!important;margin-right:auto!important}a{color:#fff!important;text-decoration:underline!important;border-color:#0F0!important}a:focus,a:hover{color:#000!important;background:#ffc!important}a:visited{color:#090!important}button,input,select,textarea{border-color:#FFF!important;border-style:solid!important;background-image:none!important}",
	
	constructor: function(name) {
		//alert("inside highcontrast constructor");
    self = this;
	},

	addStyle: function(fr) {
		//alert("inside highcontrast add style");
		fr.find('head').append("<style type='text/css' data-id='ncsuA11yToolHighContrastCSS'>" + self.CSSString + "</style>");
	
	},
	
	removeStyle: function(fr) {
		//alert("inside highcontrast remove style");
		fr.find('[data-id="ncsuA11yToolHighContrastCSS"]').remove();
	}
	
});

