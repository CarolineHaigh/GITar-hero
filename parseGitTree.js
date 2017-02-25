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

var data = httpGet("https://api.github.com/repos/" + owner + "/" + repo + "/commits");


var fdata = JSON.parse(data, function(name, value) {
    // screen (e.g., based on name or typeof value)
    if (name === 'author') {
        return value;
    }
    // otherwise return value
    return undefined;
});

document.writeln(fdata);
