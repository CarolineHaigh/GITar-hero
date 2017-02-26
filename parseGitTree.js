/**
 * Created by io on 25/02/2017.
 */

function validate() {
	var url = document.getElementById("urlName").value; //Get user input - expected URL to github repo
	var pattern = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?github([^:\/\n]+)');

	if (!pattern.test(url)) {
		alert("Please enter a valid URL to a GitHub repo.");

	} else if (pattern.test(url)) {
		var splitUrl = url.split("/");
		var owner = splitUrl[3];
		var repo = splitUrl[4];
		parsejson(owner, repo);
	}
}
 
function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function parsejson(owner, repo){
	var listOfLists = [];
	var authorList = [];
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
		} else if (currAuthor == lastAuthor){
			status = 0;
		}
		
		if(authorList.indexOf(currAuthor) == -1){
			authorList.push(currAuthor);
		}
		
		lastAuthor = currAuthor;

		listOfLists.push([key.commit.author.name, status, key.commit.message]);
			
	});
	
	drawsetup(authorList);
	play(listOfLists, authorList);
	playsong(listOfLists, authorList);

}

//document.writeln(messageList);
