var TABIndex = Tool.extend({
	
	name: "TAB Index",
	
	CSSString: ".tabindex-highlight{background:#fe0;outline: 3px #ffd700 solid;border: 3px #ffd700 solid;} p.tabindex-highlight-note{background:#ffee00;font-weight:bold;margin:3px;padding:3px;font-size:1em;}",
	
	constructor: function(name) {
		//alert("inside headings constructor");
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {
		//alert("Inside headings");

		self.TotalCount = parseInt(self.TotalCount) + fr.find('[tabindex]').length;
	},
	
	getNumOf: function(fr) {
		recurseFrames(jQuery('html'), self.count);
		return self.TotalCount;
		
	},
	
	addStyle: function(fr) {
		fr.find('head').append("<style type='text/css'>" + self.CSSString + "</style>");
	
	},
	
	removeStyle: function(fr) {
		fr.find('style:contains(' + self.CSSString + ')').remove();
		
	},
	
	addNotes: function(fr) {
		
		fr.find('[tabindex]').each(function() {
        jQuery(this).addClass('tabindex-highlight')
        jQuery(this).parent().prepend("<p class='tabindex-highlight-note'>tabindex: " + jQuery(this).attr("tabindex") + "</p>")
    });
    
	},
	
	removeNotes: function(fr) {
		fr.find('.tabindex-highlight-note').remove();
		fr.find('[tabindex]').each(function() {
        jQuery(this).removeClass('tabindex-highlight')
    });

	}
	
});
