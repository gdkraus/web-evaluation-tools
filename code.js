var errThrown = false;

// Pass a function to be applied to all frames within a given context
function recurseFrames(fr, f) {
    f(fr);
    fr.find('iframe').each(function(index) {
        try {
            recurseFrames(jQuery(this).contents(), f);
        }
        catch (err) {
            if (!errThrown) {
                //Some content is loaded from another domain and cannot be analyzed becasue of cross-scripting permissions.
            }
            errThrown = true;
        }
    })
}

// CSS Strings for Tests
var ncsuA11yToolVisibleFocusString = ":focus{outline:#afff00;outline: solid 3px red !important}";

var ncsuA11yToolHeadingCSSString = ".heading-highlight{background:#afff00;outline: 3px #0f0 solid;border: 3px #0f0 solid;position:relative;width:auto;left:auto;top:auto;} p.heading-highlight-note{background:#0f0;font-weight:bold;margin:3px;padding:3px;font-size:1em;}";

var ncsuA11yToolARIALandmarksCSSString = ".aria-landmark-highlight{background:#fcc;outline: 3px #f00 solid;border: 3px #f00 solid;clear:both;} p.aria-landmark-highlight-note{background:#f99;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}";

var ncsuA11yToolARIARolesCSSString = ".aria-role-highlight{background:#cfc;outline: 3px #0f0 solid;border: 3px #0f0 solid;clear:both;} p.aria-role-highlight-note{background:#9f9;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}";

var ncsuA11yToolARIAAttributesCSSString = ".aria-attribute-highlight{background:#ccf;outline: 3px #00f solid;border: 3px #00f solid;clear:both;} p.aria-attribute-highlight-note{background:#99f;font-weight:bold;margin:0;padding:0;font-size:1em;padding-top:1.2em;}";

var ncsuA11yToolTabindexCSSString = ".tabindex-highlight{background:#fe0;outline: 3px #ffd700 solid;border: 3px #ffd700 solid;} p.tabindex-highlight-note{background:#ffee00;font-weight:bold;margin:3px;padding:3px;font-size:1em;}";

var ncsuA11yToolInternalLinksCSSString = ".internal-link-highlight{background:#ccf;outline: 3px #ffd700 solid;border: 3px #00f solid;position:relative;width:auto;left:auto;top:auto;} p.internal-link-highlight-note{background:#ccf;font-weight:bold;margin:3px;padding:3px;font-size:1em;position:relative;width:auto;left:auto;top:auto;}";

var ncsuA11yToolCrossSiteContentCSSString = ".cross-site-content-highlight{border: 3px orange solid !important;} p.cross-site-content-highlight-note{background:orange;color:#000;font-weight:bold;margin:3px;padding:3px;font-size:1em;}";

// Track the number of instances for each test
var ncsuA11yToolHeadingsCount = 0;
var ncsuA11yToolARIALandmarksCount = 0;
var ncsuA11yToolARIARolesCount = 0;
var ncsuA11yToolARIAAttributesCount = 0;
var ncsuA11yToolTabindexCount = 0;
var ncsuA11yToolInternalLinksCount = 0;
var ncsuA11yToolInternalLinksMissingTabindex = false;
var ncsuA11yToolCrossSiteContentCount = 0;

/****** HEADINGS ******/
// count the number of headings in a given frame
function ncsuA11yToolCountHeadings(fr) {
    ncsuA11yToolHeadingsCount += fr.find('h1,h2,h3,h4,h5,h6').length;
}

// count the number of headings, recursing through all the frames
function ncsuA11yToolGetNumberOfHeadings() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountHeadings);
    return ncsuA11yToolHeadingsCount;
}
// add the style for highlighting headings for a given frame
function ncsuA11yToolAddHeadingStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolHeadingCSSString + "</style>");
}

// remove the style for highlighting headings for a given frame
function ncsuA11yToolRemoveHeadingStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolHeadingCSSString + ')').remove();
}

// add the contextual notes for each heading for a given frame
function ncsuA11yToolAddHeadingNotes(fr) {
    fr.find('h1,h2,h3,h4,h5,h6').each(function() {
        jQuery(this).addClass('heading-highlight')
        jQuery(this).prepend("<p class='heading-highlight-note'>" + jQuery(this).prop("tagName") + ':' + jQuery(this).text() + "</p>")
    });
}

// remove the contextual notes for each heading for a given frame
function ncsuA11yToolRemoveHeadingNotes(fr) {
    fr.find('.heading-highlight-note').remove();
    fr.find('h1,h2,h3,h4,h5,h6').each(function() {
        jQuery(this).removeClass('heading-highlight')
    });
}

// add/remove the headings tool
function ncsuA11yToolHeadings() {

    if (jQuery('style:contains(' + ncsuA11yToolHeadingCSSString + ')').length) { // need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveHeadingStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveHeadingNotes); //remove all elements with this style (which should just be the elements we inserted)
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddHeadingStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddHeadingNotes);
        if (ncsuA11yToolGetNumberOfHeadings() == 0) {
            alert('No headings were found.');
        }
    }
}

/************ ARIA LANDMARKS ************/
// count the number of ARIA landmarks in a given frame
function ncsuA11yToolCountARIALandmarks(fr) {
    ncsuA11yToolARIALandmarksCount += fr.find('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').length;
}

// count the number of ARIA landmarks, recursing through all the frames
function ncsuA11yToolGetNumberOfARIALandmarks() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountARIALandmarks);
    return ncsuA11yToolARIALandmarksCount;
}

// add the style for highlighting ARIA landmarks for a given frame
function ncsuA11yToolAddARIALandmarkStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolARIALandmarksCSSString + "</style>");
}

// remove the style for highlighting ARIA landmarks for a given frame
function ncsuA11yToolRemoveARIALandmarkStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolARIALandmarksCSSString + ')').remove();
}

// add the contextual notes for each ARIA landmark for a given frame
function ncsuA11yToolAddARIALandmarkNotes(fr) {
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
}

// remove the contextual notes for each ARIA landmark for a given frame
function ncsuA11yToolRemoveARIALandmarkNotes(fr) {
    fr.find('.aria-landmark-highlight-note').remove();
    fr.find('[role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"]').each(function() {
        jQuery(this).removeClass('aria-landmark-highlight')
    });

}

// add/remove the ARIA landmarks tool
function ncsuA11yToolAriaLandmarks() {
    if (jQuery('style:contains(' + ncsuA11yToolARIALandmarksCSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIALandmarkStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIALandmarkNotes);
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIALandmarkStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIALandmarkNotes);

        if (ncsuA11yToolGetNumberOfARIALandmarks() == 0) {
            alert('No ARIA Landmarks were found');
        }
    }
}

/************ ARIA ROLES THAT ARE NOT LANDMARKS ************/
// count the number of ARIA roles that are not landmarks in a given frame
function ncsuA11yToolCountARIARoles(fr) {
    ncsuA11yToolARIARolesCount += fr.find('[role]:not([role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"])').length;
}

// count the number of ARIA roles that are not landmarks, recursing through all the frames
function ncsuA11yToolGetNumberOfARIARoles() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountARIARoles);
    return ncsuA11yToolARIARolesCount;
}

// add the style for highlighting ARIA roles that are not landmarks for a given frame
function ncsuA11yToolAddARIARolesStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolARIARolesCSSString + "</style>");
}

// remove the style for highlighting ARIA roles that are not landmarks for a given frame
function ncsuA11yToolRemoveARIARolesStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolARIARolesCSSString + ')').remove();
}

// add the contextual notes for each ARIA roles that are not landmarks for a given frame
function ncsuA11yToolAddARIARolesNotes(fr) {
    fr.find('.aria-role-highlight-note').remove()
    fr.find('[role]:not([role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"])').each(function() {
        jQuery(this).addClass('aria-role-highlight')
        jQuery(this).prepend("<p class='aria-role-highlight-note'>Role: " + jQuery(this).attr("role") + "</p>")
    });
}

// remove the contextual notes for each ARIA roles that are not landmarks for a given frame
function ncsuA11yToolRemoveARIARolesNotes(fr) {
    fr.find('.aria-role-highlight-note').remove();
    fr.find('[role]:not([role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"])').each(function() {
        jQuery(this).removeClass('aria-role-highlight')
    });

}

// add/remove the ARIA roles that are not landmarks tool
function ncsuA11yToolAriaRoles() {
    if (jQuery('style:contains(' + ncsuA11yToolARIARolesCSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIARolesStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIARolesNotes);
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIARolesStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIARolesNotes);

        if (ncsuA11yToolGetNumberOfARIARoles() == 0) {
            alert('No ARIA Roles were found');
        }
    }
}


/************ ARIA ATTRIBUTES (NOT ROLE) ************/
// count the number of ARIA attributes (not role) in a given frame
function ncsuA11yToolCountARIAAttributes(fr) {
    //console.log(fr);
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
    ncsuA11yToolARIAAttributesCount += ARIAAttributeCount;
}

// count the number of ARIA attributes (not role), recursing through all the frames
function ncsuA11yToolGetNumberOfARIAAttributes() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountARIAAttributes);
    return ncsuA11yToolARIAAttributesCount;
}

// add the style for highlighting ARIA attributes (not role) for a given frame
function ncsuA11yToolAddARIAAttributesStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolARIAAttributesCSSString + "</style>");
}

// remove the style for highlighting ARIA attributes (not role) for a given frame
function ncsuA11yToolRemoveARIAAttributesStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolARIAAttributesCSSString + ')').remove();
}

// add the contextual notes for each ARIA attributes (not role) for a given frame
function ncsuA11yToolAddARIAAttributesNotes(fr) {
    var currentElement;
    fr.find('.aria-attribute-highlight-note').remove()
    $('*', fr).each(function() {
        currentElement = this;
        $.each(this.attributes, function() {
            if (this.specified) {
                if (this.name.substring(0, 5).toLowerCase() == 'aria-') {
                    jQuery(currentElement).addClass('aria-attribute-highlight');
                    jQuery(currentElement).prepend("<p class='aria-attribute-highlight-note'>ARIA Attribute: " + this.name + "="+ this.value +"</p>");
                }
            }
        });
    });
}

// remove the contextual notes for each ARIA attributes (not role) for a given frame
function ncsuA11yToolRemoveARIAAttributesNotes(fr) {
    fr.find('.aria-attribute-highlight-note').remove();
    jQuery('*',fr).removeClass('aria-attribute-highlight');
//    fr.find('[role]:not([role="navigation"],[role="main"],[role="form"],[role="search"],[role="banner"],[role="complementary"],[role="contentinfo"])').each(function() {
//        jQuery(this).removeClass('aria-attribute-highlight')
//    });

}

// add/remove the ARIA attributes (not role) tool
function ncsuA11yToolAriaAttributes() {
    if (jQuery('style:contains(' + ncsuA11yToolARIAAttributesCSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIAAttributesStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveARIAAttributesNotes);
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIAAttributesStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddARIAAttributesNotes);

        if (ncsuA11yToolGetNumberOfARIAAttributes() == 0) {
            alert('No ARIA Attributes were found');
        }
    }
}

/************ TABINDEX ************/
// count the number of tabindex attributes in a given frame
function ncsuA11yToolCountTabindex(fr) {
    ncsuA11yToolTabindexCount += fr.find('[tabindex]').length;
}

// count the number of tabindex attributes, recursing through all the frames
function ncsuA11yToolGetNumberOfTabindex() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountTabindex);
    return ncsuA11yToolTabindexCount;
}

// add the style for highlighting tabindex attributes for a given frame
function ncsuA11yToolAddTabindexStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolTabindexCSSString + "</style>");
}

// remove the style for highlighting tabindex attributes for a given frame
function ncsuA11yToolRemoveTabindexStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolTabindexCSSString + ')').remove();
}

// add the contextual notes for each tabindex attributes for a given frame
function ncsuA11yToolAddTabindexNotes(fr) {
    fr.find('[tabindex]').each(function() {
        jQuery(this).addClass('tabindex-highlight')
        jQuery(this).parent().prepend("<p class='tabindex-highlight-note'>tabindex: " + jQuery(this).attr("tabindex") + "</p>")
    });
}

// remove the contextual notes for each tabindex attributes for a given frame
function ncsuA11yToolRemoveTabindexNotes(fr) {
    fr.find('.tabindex-highlight-note').remove();
    fr.find('[tabindex]').each(function() {
        jQuery(this).removeClass('tabindex-highlight')
    });
}

// add/remove the tabindex attributes tool
function ncsuA11yToolTabIndex() {

    if (jQuery('style:contains(' + ncsuA11yToolTabindexCSSString + ')').length) {
        // need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveTabindexStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveTabindexNotes); //remove all elements with this style (which should just be the elements we inserted)

    } else {
        // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddTabindexStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddTabindexNotes);

        if (ncsuA11yToolGetNumberOfTabindex() == 0) {
            alert('No tabindex attributes were found.');
        }
    }

}

/************ INTERNAL LINK ************/
// count the number of internal links in a given frame
function ncsuA11yToolCountInternalLinks(fr) {
    ncsuA11yToolInternalLinksCount += fr.find('[href^="#"][href!="#"]').length;
    
    fr.find('[href^="#"][href!="#"]').each(function() {
    var missingTabIndex = false;
    if(jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').attr('tabindex')===undefined) {missingTabIndex=true;} else {missingTabIndex=false;}
    if(missingTabIndex){ncsuA11yToolInternalLinksMissingTabindex = true} else {}
   });
}

// count the number of internal links, recursing through all the frames
function ncsuA11yToolGetNumberOfInternalLinks() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountInternalLinks);
    return ncsuA11yToolInternalLinksCount+(ncsuA11yToolInternalLinksMissingTabindex == true?'*':'');
}

// add the style for highlighting internal links for a given frame
function ncsuA11yToolAddInternalLinksStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolInternalLinksCSSString + "</style>");
}

// remove the style for highlighting internal links for a given frame
function ncsuA11yToolRemoveInternalLinksStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolInternalLinksCSSString + ')').remove();
}

// add the contextual notes for each internal link for a given frame
function ncsuA11yToolAddInternalLinksNotes(fr) {
    fr.find('[href^="#"][href!="#"]').each(function() {
        jQuery(this).addClass('internal-link-highlight')
        jQuery(this).parent().prepend("<p class='internal-link-highlight-note'>Internal Link Source: " + jQuery(this).text() + "</p>")
        var missingTabIndex = false;
        if(jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').attr('tabindex')===undefined) {missingTabIndex=true;} else {missingTabIndex=false;}
        
        jQuery(jQuery(this).attr("href") + ',[name="' + jQuery(this).attr('href').substring(1, jQuery('[href^="#"][href!="#"]').attr('href').length) + '"]').prepend("<p class='internal-link-highlight-note'>Internal Link Target"+(missingTabIndex?' (missing tabindex)':'')+": " + jQuery(this).text() + "</p>")

        //jQuery(jQuery(this).attr("href")).prepend("<p class='internal-link-highlight-note'>Internal Link Target: " + jQuery(this).text() + "</p>")
    });
}

// remove the contextual notes for each internal link for a given frame
function ncsuA11yToolRemoveInternalLinksNotes(fr) {
    fr.find('.internal-link-highlight-note').remove();
    fr.find('[href^="#"][href!="#"]').each(function() {
        jQuery(this).removeClass('internal-link-highlight')
    });
}

// add/remove the internal links tool
function ncsuA11yToolInternalLink() {

    if (jQuery('style:contains(' + ncsuA11yToolInternalLinksCSSString + ')').length) {
        // need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveInternalLinksStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveInternalLinksNotes); //remove all elements with this style (which should just be the elements we inserted)

    } else {
        // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddInternalLinksStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddInternalLinksNotes);

        if (ncsuA11yToolGetNumberOfInternalLinks() == 0) {
            alert('No internal links were found.');
        }
    }

}

/************ VISUAL FOCUS ************/
// add a focus ring for all focusable items for a given frame
function ncsuA11yToolAddVisibleFocusStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolVisibleFocusString + "</style>");
}

// remove the focus ring for all focusble items for a given frame
function ncsuA11yToolRemoveVisibleFocusStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolVisibleFocusString + ')').remove();
}

// add/remove the visual focus tool
function ncsuA11yToolVisualFocus() {

    if (jQuery('style:contains(' + ncsuA11yToolVisibleFocusString + ')').length) {
        // need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveVisibleFocusStyle); //remove the CSS style from the head
    } else {
        // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddVisibleFocusStyle);

    }
}

/************ CROSS-SITE CONTENT ************/
// count the number of cross-site content areas in a given frame
function ncsuA11yToolCountCrossSiteContent(fr) {
    ncsuA11yToolCrossSiteContentCount += fr.find('iframe').length;
}

// count the number of cross-site content areas, recursing through all the frames
function ncsuA11yToolGetNumberOfCrossSiteContent() {
    recurseFrames(jQuery('html'), ncsuA11yToolCountCrossSiteContent);
    return ncsuA11yToolCrossSiteContentCount;
}

// add the style for highlighting cross-site content areas for a given frame
function ncsuA11yToolAddCrossSiteContentStyle(fr) {
    fr.find('head').append("<style type='text/css'>" + ncsuA11yToolCrossSiteContentCSSString + "</style>");
}

// remove the style for highlighting cross-site content areas for a given frame
function ncsuA11yToolRemoveCrossSiteContentStyle(fr) {
    fr.find('style:contains(' + ncsuA11yToolCrossSiteContentCSSString + ')').remove();
}

// add the contextual notes for each cross-site content area for a given frame
function ncsuA11yToolAddCrossSiteContentNotes(fr) {
    fr.find('iframe').each(function() {
        jQuery(this).addClass('cross-site-content-highlight')
        jQuery(this).parent().prepend("<p class='cross-site-content-highlight-note'>Cross Site Content</p>")
    });
}

// remove the contextual notes for each cross-site content area for a given frame
function ncsuA11yToolRemoveCrossSiteContentNotes(fr) {
    fr.find('.cross-site-content-highlight-note').remove();
    fr.find('iframe').each(function() {
        jQuery(this).removeClass('cross-site-content-highlight')
    });
}

// add/remove the cross-site content areas tool
function ncsuA11yToolCrossSiteContent() {

    if (jQuery('style:contains(' + ncsuA11yToolCrossSiteContentCSSString + ')').length) {
        // need to remove from the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveCrossSiteContentStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), ncsuA11yToolRemoveCrossSiteContentNotes); //remove all elements with this style (which should just be the elements we inserted)

    } else {
        // need to insert into the DOM
        recurseFrames(jQuery('html'), ncsuA11yToolAddCrossSiteContentStyle);
        recurseFrames(jQuery('html'), ncsuA11yToolAddCrossSiteContentNotes);

        if (ncsuA11yToolGetNumberOfCrossSiteContent() == 0) {
            alert('No internal links were found.');
        }
    }

}

/************ INSERT/REMOVE THE TOOL BAR ************/
if (jQuery('#ncsuA11yTools').length == 0) { // insert the toolbar
    // add space to the top of the page
    var bodyCssString = "body {margin-top:3em !important;}";
    jQuery("<style type='text/css'>" + bodyCssString + "</style>").appendTo("head");

    // css for the toolbar
    var toolsCSSString = "#ncsuA11yTools {border: 1px solid #000;text-align:center !important;font-size:12pt !important;background:#eee !important;margin:0 !important;padding:3px !important;top:0 !important;left:0 !important;position:fixed !important;width:100% !important;z-index:9999999 !important} #ncsuA11yTools label{margin-right:1em; display:inline !important; color:#000 !important;font-size:1em !important; font-weight:normal !important; font-family: arial, sans-serif important;}";
    jQuery("<style type='text/css'>" + toolsCSSString + "</style>").appendTo("head");

    // add the toolbar
    jQuery('body').prepend('<div id="ncsuA11yTools">\n\
<input id="ncsua11ytoolheadings" name="headings" type="checkbox" onChange="ncsuA11yToolHeadings();">\n\
<label for="ncsua11ytoolheadings">Headings: </label>\n\
\n\
<input id="ncsua11ytoolarialandmarks" name="arialandmarks" type="checkbox" onChange="ncsuA11yToolAriaLandmarks();">\n\
<label for="ncsua11ytoolarialandmarks">ARIA Landmarks: </label>\n\
\n\
<input id="ncsua11ytoolariaroles" name="ariaroles" type="checkbox" onChange="ncsuA11yToolAriaRoles();">\n\
<label for="ncsua11ytoolariaroles">ARIA Roles: </label>\n\
\n\
<input id="ncsua11ytoolariaattributes" name="ariaattributes" type="checkbox" onChange="ncsuA11yToolAriaAttributes();">\n\
<label for="ncsua11ytoolariaattributes">ARIA Attributes: </label>\n\
\n\
<input id="ncsua11ytooltabindex" name="tabindex" type="checkbox" onChange="ncsuA11yToolTabIndex();">\n\
<label for="ncsua11ytooltabindex">tabindex: </label>\n\
\n\
<input id="ncsua11ytoolinternallink" name="internallink" type="checkbox" onChange="ncsuA11yToolInternalLink();">\n\
<label for="ncsua11ytoolinternallink">Internal Link: </label>\n\
\n\
<input id="ncsua11ycrosssitecontent" name="crosssitecontent" type="checkbox" onChange="ncsuA11yToolCrossSiteContent();">\n\
<label for="ncsua11ycrosssitecontent">Cross Site Content: </label>\n\
\n\
<input id="ncsua11ytoolvisualfocus" name="visualfocus" type="checkbox" onChange="ncsuA11yToolVisualFocus();">\n\
<label for="ncsua11ytoolvisualfocus">Force Show Visual Focus</label>\n\
</div>')

    // append the number of instances to each appropriate tool
    jQuery('label[for="ncsua11ytoolheadings"]').append(ncsuA11yToolGetNumberOfHeadings())
    jQuery('label[for="ncsua11ytoolarialandmarks"]').append(ncsuA11yToolGetNumberOfARIALandmarks())
    jQuery('label[for="ncsua11ytoolariaroles"]').append(ncsuA11yToolGetNumberOfARIARoles())
    jQuery('label[for="ncsua11ytoolariaattributes"]').append(ncsuA11yToolGetNumberOfARIAAttributes())
    jQuery('label[for="ncsua11ytooltabindex"]').append(ncsuA11yToolGetNumberOfTabindex())
    jQuery('label[for="ncsua11ytoolinternallink"]').append(ncsuA11yToolGetNumberOfInternalLinks())
    jQuery('label[for="ncsua11ycrosssitecontent"]').append(ncsuA11yToolGetNumberOfCrossSiteContent())

} else { // remove the toolbar
    jQuery('#ncsuA11yTools').remove()
    jQuery('style:contains(' + bodyCssString + ')').remove();
    jQuery('style:contains(' + toolsCSSString + ')').remove();
}

