var InternalLinks = Tool.extend({
	
	CSSString: ".internal-link-highlight{background:#ccf;outline: 3px #ffd700 solid;border: 3px #00f solid;position:relative;width:auto;left:auto;top:auto;} p.internal-link-highlight-note{background:#ccf;font-weight:bold;margin:3px;padding:3px;font-size:1em;position:relative;width:auto;left:auto;top:auto;}",
	
	InternalLinksMissingTabindex = false,
	
	count: function(fr) {
		alert("Inside headings");

		TotalCount += fr.find('[href^="#"][href!="#"]').length;
		
		fr.find('[href^="#"][href!="#"]').each(function() {
        var missingTabIndex = false;
        if (jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').attr('tabindex') === undefined) {
            missingTabIndex = true;
        } else {
            missingTabIndex = false;
        }
        if (missingTabIndex) {
            InternalLinksMissingTabindex = true
        } else {
        }
    });
	},
	
	getNumOf: function(fr) {
		recurseFrames(jQuery('html'), count);
		return TotalCount;
		
	},
	
	add: function(fr) {
		fr.find('head').append("<style type='text/css'>" + CSSString + "</style>");
	
	},
	
	remove: function(fr) {
		fr.find('style:contains(' + CSSString + ')').remove();
		
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
