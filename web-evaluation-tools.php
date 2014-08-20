<?php

header("Content-type: text/javascript");

//optionally load jQuery from a local source

$jq = file_get_contents('jquery-1.11.0.min.js');
echo $jq;
$file = file_get_contents('Base.js');
echo $file;
$file = file_get_contents('interface.js');
echo $file;
$file = file_get_contents('Headings.js');
echo $file;
$file = file_get_contents('InternalLinks.js');
echo $file;
$file = file_get_contents('controller.js');
echo $file;
$file = file_get_contents('util.js');
echo $file;
$file = file_get_contents('ARIAAttributes.js');
echo $file;
$file = file_get_contents('ARIALandmarks.js');
echo $file;
$file = file_get_contents('ARIARoles.js');
echo $file;
$file = file_get_contents('CrossSite.js');
echo $file;
$file = file_get_contents('LanguageAttributes.js');
echo $file;
$file = file_get_contents('TABIndex.js');
echo $file;
$file = file_get_contents('VisualFocus.js');
echo $file;
$file = file_get_contents('HighContrast.js');
echo $file;
$file = file_get_contents('ToolBar.js');
echo $file;


?>
