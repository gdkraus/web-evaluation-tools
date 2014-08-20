

var Headings = Tool.extend({
	
	name: "Headings",
	
	CSSString: ".heading-highlight{background:#afff00;outline: 3px #0f0 solid;border: 3px #0f0 solid;position:relative;width:auto;left:auto;top:auto;} p.heading-highlight-note{background:#0f0;font-weight:bold;margin:3px;padding:3px;font-size:1em;}",
	
	constructor: function(name) {
    self = this;
	},
	TotalCount: 0,
	
	count: function(fr) {
		self.TotalCount = parseInt(self.TotalCount) + fr.find('h1,h2,h3,h4,h5,h6').length;
		
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
		
		fr.find('h1,h2,h3,h4,h5,h6').each(function() {
        jQuery(this).addClass('heading-highlight')
        jQuery(this).prepend("<p class='heading-highlight-note'>" + jQuery(this).prop("tagName") + ':' + jQuery(this).text() + "</p>")
    });
		
	},
	
	removeNotes: function(fr) {
		
		fr.find('.heading-highlight-note').remove();
		fr.find('h1,h2,h3,h4,h5,h6').each(function() {
        jQuery(this).removeClass('heading-highlight')
    });
		
	}
	
});

