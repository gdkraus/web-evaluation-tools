/************ INSERT/REMOVE THE TOOL BAR ************/
function  toolBar() {
if (jQuery('#ncsuA11yTools').length == 0) { // insert the toolbar
    // add space to the top of the page
    var bodyCssString = "body {margin-top:3em !important;}";
    jQuery("<style type='text/css'>" + bodyCssString + "</style>").appendTo("head");

    // css for the toolbar
    var toolsCSSString = "#ncsuA11yTools {line-height: 1.2em;border: 1px solid #000;text-align:center !important;font-size:12pt !important;background:#eee !important;margin:0 !important;padding:3px !important;top:0 !important;left:0 !important;position:fixed !important;width:100% !important;z-index:9999999 !important} #ncsuA11yTools input, #ncsuA11yTools span{background-color:#eee !important} #ncsuA11yTools label{background-color:#eee !important;margin-right:1em; display:inline !important; color:#000 !important;font-size:1em !important; font-weight:normal !important; font-family: arial, sans-serif important;}.ncsua11ytoolitem{white-space:nowrap;}";
    jQuery("<style type='text/css'>" + toolsCSSString + "</style>").appendTo("head");
    
    var i=0;
    var objects = new Array(classes.length);
    
   /* for(i=0;i<classes.length;i++)
	{
		alert(classes[i]);
		
		objects[i] = new window[classes[i]];
	}
*/
    var divString="<div id='ncsuA11yTools'>\n\ ";
    for(i=0;i<classes.length;i++)
    {
		var obj = new window[classes[i]];
		divString+="<span class='ncsua11ytoolitem'>"+"<input id='ncsua11ytool"+classes[i]+"' name='"+classes[i]+"' type='checkbox'>\n\ <label for='ncsua11ytool"+classes[i]+"'>"+obj.name+": </label></span>\n\ ";
		if(i<classes.length-1)
		divString+="\n\ ";
	}
	divString+="</div>";
	jQuery('body').prepend(divString);
	var obj;
	
	for(i=0;i<classes.length;i++)
    {
		//objects[i] = new window[classes[i]];
		//obj = objects[i];
		//alert(objects[i].CSSString);
		var id = document.getElementById("ncsua11ytool"+classes[i]);
		id.onchange = function(){
			addTool(this);
		}
		//obj=null;
		
	}
	
	
	//i=0;
	
	for(i=0;i<classes.length;i++)
    {
		var obj = new window[classes[i]];
		divString="";
		divString+="label[for='ncsua11ytool"+classes[i]+"']";
		jQuery(divString).append(obj.getNumOf());
	}
	


} else { // remove the toolbar
    jQuery('#ncsuA11yTools').remove()
    jQuery('style:contains(' + bodyCssString + ')').remove()
    jQuery('style:contains(' + toolsCSSString + ')').remove()
}
}
