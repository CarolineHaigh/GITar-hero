
function drawsetup(authorList){
	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.strokeStyle = '#FFFFFF';
	context.lineWidth = 5;
	
    var linecount = authorList.length + 1;
	var spacing = canvas.width / linecount;
	var y = canvas.height;
	
    for (i = 1; i < linecount; i++) { 
		var x = spacing*i;

		context.beginPath();
		context.moveTo(x, 0);
		context.lineTo(x, y);
		context.stroke();		
	};
	
	context.save();
	
}

function playsong(datas, authorList){
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    var colours = ['red', 'yellow', 'lime', 'blue', 'magenta', 'orange', 'green'];
    var eventcount = datas.length;
    var linecount = authorList.length + 1;
	var spacing = canvas.width / linecount;
    
	curr_index = 0;
    
    datas.forEach(function(e){
		var lineindex = authorList.indexOf(e[0]);
		var xpos = (lineindex + 1) * spacing;
		ctx.strokeStyle = colours[lineindex];
		console.log("S0");

		Tone.Transport.schedule(function(time){
			//use the time argument to schedule a callback with Tone.Draw
			Tone.Draw.schedule(function(){
				console.log("Not scheduling anything");				
			}, time)
		}, curr_index.toString() + "m")
		
		curr_index += 1;
					
	});
}
