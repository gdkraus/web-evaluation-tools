var LanguageAttributes = Tool.extend({
	
	CSSString: ".language-attribute-highlight{background:#ccf;outline: 3px #00f solid;border: 3px #00f solid;clear:both;} p.language-attribute-highlight-note{background:#99f;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}",
	
	languageAttributesFirstPass : true,
	
	languageAttributesFirstPassAdd : true,
	
	count: function(fr) {
		alert("Inside headings");
		
		   var languageAttributeCount = 0;

    if (languageAttributesFirstPass) { // need to do this check to accurately determine lang attributes on the outer most html element of page. html elements in iframes do not need this check
        languageAttributesFirstPass = false;
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

		TotalCount += languageAttributeCount;
	},
	
	getNumOf: function(fr) {
		languageAttributesFirstPass = true;
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
    //fr.find('.language-attribute-highlight-note').remove()
    if (languageAttributesFirstPassAdd) { // need to do this check to accurately determine lang attributes on the outer most html element of page. html elements in iframes do not need this check
        $('*').each(function() {
            currentElement = this;
            $.each(this.attributes, function() {
                if (this.specified) {
                    if (this.name.toLowerCase() == 'lang') {
                        if (languageAttributesFirstPassAdd) {
                            jQuery('body').addClass('language-attribute-highlight');
                            jQuery('body').prepend("<p class='language-attribute-highlight-note'>Language=\"" + this.value + "\"</p>");
                            languageAttributesFirstPassAdd = false;
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
		
		languageAttributesFirstPassAdd = true;
    fr.find('.language-attribute-highlight-note').remove();
    jQuery('*', fr).removeClass('language-attribute-highlight');

	}
	
});
