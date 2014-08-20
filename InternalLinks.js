var InternalLinks = Tool.extend({
	
	name: "Internal Links",
	
	CSSString: ".internal-link-highlight{background:#ccf;outline: 3px #ffd700 solid;border: 3px #00f solid;position:relative;width:auto;left:auto;top:auto;} p.internal-link-highlight-note{background:#ccf;font-weight:bold;margin:3px;padding:3px;font-size:1em;position:relative;width:auto;left:auto;top:auto;}",
	
	InternalLinksMissingTabindex: false,
	
	constructor: function(name) {
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {

		self.TotalCount = parseInt(self.TotalCount)+fr.find('[href^="#"][href!="#"]').length;
		
		fr.find('[href^="#"][href!="#"]').each(function() {
        var missingTabIndex = false;
        if (jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').attr('tabindex') === undefined) {
            missingTabIndex = true;
        } else {
            missingTabIndex = false;
        }
        if (missingTabIndex) {
            self.InternalLinksMissingTabindex = true;
        } else {
        }
    });
	},
	
	getNumOf: function(fr) {
		recurseFrames(jQuery('html'), self.count);
		return self.TotalCount + (self.InternalLinksMissingTabindex == true ? '*' : '');
		
	},
	
	addStyle: function(fr) {
		fr.find('head').append("<style type='text/css'>" + self.CSSString + "</style>");
	
	},
	
	removeStyle: function(fr) {
		fr.find('style:contains(' + self.CSSString + ')').remove();
		
	},
	
	addNotes: function(fr) {
		
		fr.find('[href^="#"][href!="#"]').each(function() {
        jQuery(this).addClass('internal-link-highlight')
        jQuery(this).parent().prepend("<p class='internal-link-highlight-note'>Internal Link Source: " + jQuery(this).text() + "</p>")
        var missingTabIndex = false;
        if (jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').attr('tabindex') === undefined) {
            missingTabIndex = true;
        } else {
            missingTabIndex = false;
        }

        jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').prepend("<p class='internal-link-highlight-note'>Internal Link Target" + (missingTabIndex ? ' (missing tabindex)' : '') + ": " + jQuery(this).text() + "</p>")

    });
    
	},
	
	removeNotes: function(fr) {
		
	fr.find('.internal-link-highlight-note').remove();
    fr.find('[href^="#"][href!="#"]').each(function() {
    jQuery(this).removeClass('internal-link-highlight')
    });
		


	}
	
});
