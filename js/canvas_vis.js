$(function() {
    
   
	var data = {	"Ground Balls" : [12 , 13, 39, 23],
					"Unforced Errors" : [2 , 9, 8, 14],
					"Completed Passes" : [49 , 23, 39, 22],
					"Goalie Saves" : [12 , 8, 4, 15],					
				};
	
	
	for(stat in data){
	    console.log(stat);
		console.log(data[stat][0]);
	}
	
	var whichPeriod = 0;
	var lastPeriod = 0;
	var animating = false;


    
    setInterval(draw, 30);

    var canvas = document.getElementById('mainCanvas');
    var c = canvas.getContext('2d');
    

	var counter = 0;
   	var stepCounter = 0;
   		
	var mouseX = 10;
	var mouseY = 10;

	$('#mainCanvas').mousemove(function(e) {
		mouseX = e.pageX - $(e.target).offset().left;
		mouseY = e.pageY - $(e.target).offset().top;
	});


	$('#mainCanvas').click(function(e) {
		mouseX = e.pageX - $(e.target).offset().left;
		mouseY = e.pageY - $(e.target).offset().top;
		
		animating = true;

		if(whichPeriod < 3){
			lastPeriod = whichPeriod;
			whichPeriod ++;
		}
		else {
			lastPeriod = whichPeriod;
			whichPeriod = 0;
		}
		
		console.log(whichPeriod);
	});
	


	$('.arrow-button.right').click(function(e) {
		

		if(whichPeriod < 3){
			animating = true;
			lastPeriod = whichPeriod;
			whichPeriod ++;
		}

	});
	
	
		$('.arrow-button.left').click(function(e) {

		if(whichPeriod > 0){
			animating = true;
			lastPeriod = whichPeriod;
			whichPeriod --;
		}
	
	});
	
	
	

	function draw() {
	
		//clear canvas for animation
		c.clearRect(0 , 0, c.canvas.width, c.canvas.height);

		c.fillStyle = "#50d0ff";

		if(animating == false){
			for(stat in data){
				c.fillRect((counter+1)*c.canvas.width/5-30, c.canvas.height-30-data[stat][whichPeriod]*4, 60, data[stat][whichPeriod]*4);
				counter ++;			
			}
		}
		else {
			if(stepCounter < 20) {
				for(stat in data){
				var interval = (data[stat][whichPeriod] - data[stat][lastPeriod])*4/20;
					c.fillRect((counter+1)*c.canvas.width/5-30, c.canvas.height-30-(data[stat][lastPeriod]*4 + interval*stepCounter), 60, data[stat][lastPeriod]*4 + interval*stepCounter);
					counter ++;			
				}	
				stepCounter ++;
			}
			else {
				for(stat in data){
					c.fillRect((counter+1)*c.canvas.width/5-30, c.canvas.height-30-data[stat][whichPeriod]*4, 60, data[stat][whichPeriod]*4);
					counter ++;			
				}
				stepCounter = 0;
				animating = false;
			}
			
		}
		
		
		counter = 0;
	
		
		var whichGame = whichPeriod + 1;
		$("#periodTitle").html("GAME " + whichGame + " STATS");	
		$("#value-1").html(data["Ground Balls"][whichPeriod]);	
	   $("#value-2").html(data["Unforced Errors"][whichPeriod]);
	   $("#value-3").html(data["Completed Passes"][whichPeriod]);
	   $("#value-4").html(data["Goalie Saves"][whichPeriod]);
	   
	   
	/* 	c.fillRect(20, c.canvas.height - 100, 30, 100 ); */

			
/*
		c.beginPath();
        c.moveTo(10,100);
        c.bezierCurveTo(20,200, 500,200, 500,100);
        c.lineTo(500,300);
        c.lineTo(10,300);
        c.closePath();
        c.fill();

        c.lineWidth = 4;
        c.strokeStyle = "black";
        c.stroke();
*/

		

	}
	
		
});



