var TABIndex = Tool.extend({
	
	CSSString: ".aria-role-highlight{background:#cfc;outline: 3px #0f0 solid;border: 3px #0f0 solid;clear:both;} p.aria-role-highlight-note{background:#9f9;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	count: function(fr) {
		alert("Inside headings");

		TotalCount += fr.find('[tabindex]').length;
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
