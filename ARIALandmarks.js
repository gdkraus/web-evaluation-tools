var ARIALandmarks = Tool.extend({
	
	name: "ARIA Landmarks",
	
	CSSString: ".aria-landmark-highlight{background:#fcc;outline: 3px #f00 solid;border: 3px #f00 solid;clear:both;} p.aria-landmark-highlight-note{background:#f99;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	constructor: function(name) {
		//alert("inside headings constructor");
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {
		//alert("Inside headings");
		self.TotalCount = parseInt(self.TotalCount) + fr.find('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').length;
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
		
		fr.find('.aria-landmark-highlight-note').remove()
		fr.find('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').each(function() {
        jQuery(this).addClass('aria-landmark-highlight')
        if (jQuery(this).attr('aria-label') !== undefined) {
            // attribute exists
            jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Label: &quot;" + jQuery(this).attr("aria-label") + "&quot;</p>")
        } else {
            // attribute does not exist
        }
        if (jQuery(this).attr('aria-labelledby') !== undefined) {
            // attribute exists
            jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Labelled By: &quot;" + jQuery('[id="' + jQuery(this).attr("aria-labelledby") + '"]').html() + "&quot;</p>")
        } else {
            // attribute does not exist
        }
        jQuery(this).prepend("<p class='aria-landmark-highlight-note'>Role: " + jQuery(this).attr("role") + "</p>")
    });
		
	},
	
	removeNotes: function(fr) {
		
		fr.find('.aria-landmark-highlight-note').remove();
		fr.find('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').each(function() {
        jQuery(this).removeClass('aria-landmark-highlight')
    });
		
	}
	
});
