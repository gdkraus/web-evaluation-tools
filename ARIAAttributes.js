var ARIAAttributes = Tool.extend({
	
	CSSString: ".aria-role-highlight{background:#cfc;outline: 3px #0f0 solid;border: 3px #0f0 solid;clear:both;} p.aria-role-highlight-note{background:#9f9;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	count: function(fr) {
		alert("Inside headings");
		var ARIAAttributeCount = 0;
    $('*', fr).each(function() {
        $.each(this.attributes, function() {
            if (this.specified) {
                if (this.name.substring(0, 5).toLowerCase() == 'aria-') {
                    ARIAAttributeCount = ARIAAttributeCount + 1;
                }
            }
        });
    });
		TotalCount += ARIAAttributeCount;
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
		
		var currentElement;
    //fr.find('.aria-attribute-highlight-note').remove()
    $('*', fr).each(function() {
        currentElement = this;
        $.each(this.attributes, function() {
            if (this.specified) {
                if (this.name.substring(0, 5).toLowerCase() == 'aria-') {
                    jQuery(currentElement).addClass('aria-attribute-highlight');
                    jQuery(currentElement).prepend("<p class='aria-attribute-highlight-note'>ARIA Attribute: " + this.name + "=" + this.value + "</p>");
                }
            }
        });
    });
	},
	
	removeNotes: function(fr) {
		
		fr.find('.aria-attribute-highlight-note').remove();
    jQuery('*', fr).removeClass('aria-attribute-highlight');
	//    fr.find('[role]:not([role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"])').each(function() {
	//        jQuery(this).removeClass('aria-attribute-highlight')
	//    });
		

	}
	
});
