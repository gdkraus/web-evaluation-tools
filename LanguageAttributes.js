var LanguageAttributes = Tool.extend({
	
	name: "Language Attributes",
	
	CSSString: ".language-attribute-highlight{background:#ccf;outline: 3px #00f solid;border: 3px #00f solid;clear:both;} p.language-attribute-highlight-note{background:#99f;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	languageAttributesFirstPass : true,
	
	languageAttributesFirstPassAdd : true,
	
	constructor: function(name) {
		//alert("inside headings constructor");
    self = this;
	},
	
	TotalCount: "0",
	
	count: function(fr) {
		//alert("Inside headings");
		
		   var languageAttributeCount = 0;

    if (self.languageAttributesFirstPass) { // need to do this check to accurately determine lang attributes on the outer most html element of page. html elements in iframes do not need this check
        self.languageAttributesFirstPass = false;
        $('*').each(function() {
            $.each(this.attributes, function() {
                if (this.specified) {
                    if (this.name.toLowerCase() == 'lang') {
                        languageAttributeCount = languageAttributeCount + 1;
                    }
                }
            });
        });
    } else {
        $('*', fr).each(function() {
            $.each(this.attributes, function() {
                if (this.specified) {
                    if (this.name.toLowerCase() == 'lang') {
                        languageAttributeCount = languageAttributeCount + 1;
                    }
                }
            });
        });
    }

		self.TotalCount = parseInt(self.TotalCount) +  languageAttributeCount;
	},
	
	getNumOf: function(fr) {
		self.languageAttributesFirstPass = true;
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
    //fr.find('.language-attribute-highlight-note').remove()
    if (self.languageAttributesFirstPassAdd) { // need to do this check to accurately determine lang attributes on the outer most html element of page. html elements in iframes do not need this check
        $('*').each(function() {
            currentElement = this;
            $.each(this.attributes, function() {
                if (this.specified) {
                    if (this.name.toLowerCase() == 'lang') {
                        if (self.languageAttributesFirstPassAdd) {
                            jQuery('body').addClass('language-attribute-highlight');
                            jQuery('body').prepend("<p class='language-attribute-highlight-note'>Language=\"" + this.value + "\"</p>");
                            self.languageAttributesFirstPassAdd = false;
                        } else {
                            jQuery(currentElement).addClass('language-attribute-highlight');
                            jQuery(currentElement).prepend("<p class='language-attribute-highlight-note'>Language=\"" + this.value + "\"</p>");
                        }

                    }
                }
            });
        });
    } else {
        $('*', fr).each(function() {
            currentElement = this;
            $.each(this.attributes, function() {
                if (this.specified) {
                    if (this.name.toLowerCase() == 'lang') {
                        jQuery(currentElement).addClass('language-attribute-highlight');
                        jQuery(currentElement).prepend("<p class='language-attribute-highlight-note'>Language=\"" + this.value + "\"</p>");
                    }
                }
            });
        });
    }

    
	},
	
	removeNotes: function(fr) {
		
		self.languageAttributesFirstPassAdd = true;
    fr.find('.language-attribute-highlight-note').remove();
    jQuery('*', fr).removeClass('language-attribute-highlight');

	}
	
});
