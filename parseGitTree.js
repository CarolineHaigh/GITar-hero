/**
 * Created by io on 25/02/2017.
 */
function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var owner = "CarolineHaigh";
var repo = "GITar-hero";

document.writeln(httpGet("https://api.github.com/repos/" + owner + "/" + repo + "/commits"));
