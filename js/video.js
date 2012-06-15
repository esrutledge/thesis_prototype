$(function() {

	var millis = 0;
	var seconds = 0;
	var minutes = 0;
	
	var clockIsRunning = false;

	var clockInterval;
	
	var	$clockSeconds = $("#clock-seconds");		
	var	$clockMinutes = $("#clock-minutes");

	var movieShowing = false;	
		
	
    var vid = $("#video")[0];
   // vid.width = $(window).width();
   // vid.height = $(window).height();
    var intId;
    var interval = 10;
    


    
    $(".clickable-goal").click(function(e) {
    	$("#video-wrapper").toggle("slow");
    	console.log("click");
	
		if(!movieShowing){
			vid.currentTime = 0;
            $("#progress-bar").css("width", 0);
	    	
	    	millis = 1000*832;
	  
			minutes = parseInt(millis/(1000*60));
			seconds = parseInt(millis/1000 % 60);
	
			//now let's get the seconds value out and format it for printing
			var secondsString = String(seconds);
			var minutesString = String(minutes);
	  	
	    	$clockSeconds.text(secondsString);
			$clockMinutes.text(minutesString); 
			
				
			runClock();
		    clockInterval = setInterval(runClock, 20);

		
			vid.play();
		    intId = setInterval(onVideoProgress, interval);
	
			$("#clock-start-button").removeClass('clock-stopped');
			$("#clock-start-button").addClass('clock-running');
			$("#clock-start-button>p").html('STOP');	
		}
		else {
  			clearInterval(clockInterval);
			if(movieShowing) {	
				vid.pause();
		        clearInterval(intId);
	        }
			$("#clock-start-button").addClass('clock-stopped');
			$("#clock-start-button").removeClass('clock-running');
			$("#clock-start-button>p").html('START');	
     
  		}
		
    	movieShowing = !movieShowing;
    });
    

	$('#clock-start-button').click(function(e) {
	
			e.preventDefault();

			
			if($(e.target).parent().hasClass('clock-stopped')){
			    
				runClock();
			    clockInterval = setInterval(runClock, 20);
    
				if(movieShowing) {
					vid.play();
	    		    intId = setInterval(onVideoProgress, interval);
				}

				$(e.target).parent().removeClass('clock-stopped');
				$(e.target).parent().addClass('clock-running');
				$(e.target).html('STOP');	
						
			}
			else {
			
				clearInterval(clockInterval);
				if(movieShowing) {	
					vid.pause();
			        clearInterval(intId);
		        }
				$(e.target).parent().removeClass('clock-running');
				$(e.target).parent().addClass('clock-stopped');		
				$(e.target).html('START');				
			}	
			
			

	});
	
	function runClock() {
		
		millis += 20;
		minutes = parseInt(millis/(1000*60));
		seconds = parseInt(millis/1000 % 60);


		//now let's get the seconds value out and format it for printing
		var secondsString = String(seconds);
		var minutesString = String(minutes);

		// add leading zero if only one digit
		if(secondsString.length < 2) {
			secondsString = "0" + secondsString;
		}
		/*
if(minutesString.length < 2) {
			minutesString = "0" + minutesString;
		}
*/
		
		// if seconds have incremented, then change the text
		if(secondsString != $clockSeconds.html()){
			$clockSeconds.text(secondsString);
			$clockMinutes.text(minutesString); 
		}

	}	
	

    
    function onVideoProgress() {
        if (vid.ended) {
            $('#clock-start-button').addClass('clock-stopped');
            $('#clock-start-button').removeClass('clock-running');
            $('#clock-start-button p').text('START');

           // $("#progress-bar").css("width", 0);

			millis = 0;
			
    		$("#progress-box").css("display", "none");

            console.log("ended!");
            clearInterval(intId);
           	clearInterval(clockInterval);
        } else {
          //  console.log(vid.currentTime + " of " + vid.duration);
    
            var pctComplete = vid.currentTime / vid.duration;
        //    console.log(pctComplete);
            $("#progress").html(pctComplete);
            $("#progress-bar").css("width", pctComplete*264);
    		$("#progress-box").css("display", "inline");
            
            
            
            var newColor = parseInt(vid.currentTime / vid.duration * 255);
         //   console.log("newColor = "+newColor);
            $("#seek").css("background-color", "rgb("+newColor+","+newColor+","+newColor+")");
        }
    }



});