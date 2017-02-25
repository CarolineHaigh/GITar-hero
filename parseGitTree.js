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
var commitList = [];
var listOfLists = [];

var json = JSON.parse(httpGet("https://api.github.com/repos/" + owner + "/" + repo + "/commits"));

json.reverse();

var lastAuthor = null;

json.forEach(function(key){

    var status = null;
    var parentValue = Object.keys(key.parents).length;
    currAuthor = key.commit.author.name;

    if(parentValue > 1) {
        status = 2;
    } else if(currAuthor != lastAuthor) {
        status = 1;
    } else if ((currAuthor == lastAuthor) && (parentValue == 1)){
        status = 0;
    }

    commitList.push(key.commit.author.name);
    commitList.push(status);
    commitList.push(key.commit.message);
    listOfLists.push(commitList);

	});

//document.writeln(messageList);
