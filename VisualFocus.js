var VisualFocus = Tool.extend({
	
	name: "Visual Focus",
	
	CSSString: ":focus{outline:#afff00;outline: solid 3px red !important}",
	
	constructor: function(name) {
    self = this;
	},

	addStyle: function(fr) {
		fr.find('head').append("<style type='text/css'>" + self.CSSString + "</style>");
	
	},
	
	removeStyle: function(fr) {
		fr.find('style:contains(' + self.CSSString + ')').remove();
		
	}
	
});

