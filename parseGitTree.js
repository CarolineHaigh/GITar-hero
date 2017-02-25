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

var owner = "alexdobin";
var repo = "STAR";

document.write(httpGet("https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/master"));
