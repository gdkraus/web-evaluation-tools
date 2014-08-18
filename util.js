function  addTool(obj) {
		alert("inside add tool");
		if (jQuery('style:contains(' + obj.CSSString + ')').length) {// need to remove from the DOM
        recurseFrames(jQuery('html'), obj.remove); //remove the CSS style from the head
        recurseFrames(jQuery('html'), obj.removeNotes);
    } else { // need to insert into the DOM
        recurseFrames(jQuery('html'), obj.add);
        recurseFrames(jQuery('html'), obj.addNotes);

        if (obj.getNumOf() == 0) {
            alert('No ARIA Roles were found');
        }
    }
	}	
	
	
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
