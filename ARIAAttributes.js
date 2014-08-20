var ARIAAttributes = Tool.extend({
	
	name: "ARIA Attributes",
	
	CSSString: ".aria-attribute-highlight{background:#ccf;outline: 3px #00f solid;border: 3px #00f solid;clear:both;} p.aria-attribute-highlight-note{background:#99f;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	constructor: function(name) {
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {
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
		self.TotalCount = parseInt(self.TotalCount) + ARIAAttributeCount;
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
		
		var currentElement;
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

	}
	
});
