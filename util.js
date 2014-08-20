function  addTool(temp) 
{
	var obj = new window[temp.name];
		if(obj.name!="HighContrast")
		{
		if (jQuery('style:contains(' + obj.CSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), obj.removeStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), obj.removeNotes);
		} else { // need to insert into the DOM
        recurseFrames(jQuery('html'), obj.addStyle);
        recurseFrames(jQuery('html'), obj.addNotes);

        if (obj.getNumOf() == 0) {
            alert("No "+obj.name+" were found");
			}
		}
		}
		else
		{
			
			if (jQuery('[data-id="ncsuA11yToolHighContrastCSS"]').length) {
			// need to remove from the DOM
			recurseFrames(jQuery('html'), obj.removeStyle); //remove the CSS style from the head
			} else {
				// need to insert into the DOM
				recurseFrames(jQuery('html'), obj.addStyle);

			}
		}
}	
	
	
	
	
	/*
	function  addTool(obj) {
		alert("inside add tool");
		if (jQuery('style:contains(' + obj.CSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), obj.removeStyle); //remove the CSS style from the head
        recurseFrames(jQuery('html'), obj.removeNotes);
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), obj.addStyle);
        recurseFrames(jQuery('html'), obj.addNotes);

        if (obj.getNumOf() == 0) {
            alert('No ARIA Roles were found');
        }
    }
	}	*/
var errThrown=false;	
	
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
