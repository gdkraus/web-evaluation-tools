var CrossSite = Tool.extend({
	
	name: "Cross Site",
	
	
	CSSString: ".cross-site-content-highlight{border: 3px orange solid !important;} p.cross-site-content-highlight-note{background:orange;color:#000;font-weight:bold;margin:3px;padding:3px;font-size:1em;}",
	
	constructor: function(name) {
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {

		self.TotalCount = parseInt(self.TotalCount) + fr.find('iframe').length;
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
		
		fr.find('iframe').each(function() {
        jQuery(this).addClass('cross-site-content-highlight')
        jQuery(this).parent().prepend("<p class='cross-site-content-highlight-note'>Cross Site Content</p>")
    });
    
	},
	
	removeNotes: function(fr) {
		
		fr.find('.cross-site-content-highlight-note').remove();
		fr.find('iframe').each(function() {
        jQuery(this).removeClass('cross-site-content-highlight')
    });


	}
	
});
