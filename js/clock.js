$(function() {
	
	
	
	var minutesInGame = 50;
	var numberOfPeriods = 2;

	
	var lengthOfGame = 60*minutesInGame;
	
	
	

	var millis = 0;
	var seconds = 0;
	var minutes = 0;
	
	var clockInterval;
	
	var clockEditable = true;
	
	millis += parseInt($("#time1").html()) * 1000*60*10;
	millis += parseInt($("#time2").html()) * 1000*60;
	millis += parseInt($("#time3").html()) * 1000*10;
	millis += parseInt($("#time4").html()) * 1000;

			
	var	$clockSeconds = $("#clock-seconds");		
	var	$clockMinutes = $("#clock-minutes");
	var $changeClockSlider = $('#change-time');


	$('#clock-start-button').bind('click touchstart', function(e) {
		toggleClock(e);				
	});

	$('#edit-time p').bind('touchstart', function(e) {
		if(clockEditable){
			$('#edit-time form').toggle();
			$('#submit-new-time').bind('touchstart', function(e) {
				e.preventDefault();
				if(parseInt($('#edited-value').attr('value').split(':')[0]) < minutesInGame/numberOfPeriods && parseInt($('#edited-value').attr('value').split(':')[1]) < 60 ) {
					minutesString = $('#edited-value').attr('value').split(':')[0];
				 	secondsString = $('#edited-value').attr('value').split(':')[1];
				 	minutes = parseInt(minutesString);
				 	seconds = parseInt(secondsString);
				 	millis = minutes*60*1000 + seconds*1000;
				 	
				 	$('#edit-time form').hide();
				 	$("#time1").html(minutesString.charAt(0));
					$("#time2").html(minutesString.charAt(1));
					$("#time3").html(secondsString.charAt(0));
					$("#time4").html(secondsString.charAt(1));		
					
					if($('#whichHalfDropdown').val() == "2"){
						millis += 1000*60*minutesInGame/numberOfPeriods;
						$("#which-half").html("SECOND HALF");
						alert(millis);
					}
					else {
						$("#which-half").html("FIRST HALF");
					}
				}
			});
		}
	});


	
	function toggleClock(e) {
		
		e.preventDefault();
	
			if($(e.target).hasClass('clock-stopped')){
				runClock();
			    clockInterval = setInterval(runClock, 20);
    
				$(e.target).removeClass('clock-stopped');
				$(e.target).addClass('clock-running');
			
			    console.log("running");

								
				grayGone();
				warningGone();
				clockEditable = false;
			}
			else {
			
				clearInterval(clockInterval);
				$(e.target).removeClass('clock-running');
				$(e.target).addClass('clock-stopped');		
					
				console.log("stopped");			
				
				grayOut();
				warningUp();
				clockEditable = true;
				
			}	
			
	}

	function runClock() {
		
		millis += 20;
		minutes = parseInt(millis/(1000*60));
		seconds = parseInt(millis/1000 % 60);

		//now let's get the seconds value out and format it for printing
		var secondsString = String(seconds);
		var minutesString = String(minutes);

		// check to see if it's the second half (and adjust minutesString and label accordingly)
		if(millis >= 25*60*1000) {
				minutesString = (parseInt(minutesString) - 25).toString();
				
				if(millis <= minutesInGame/2*60*1000 +20){
					$("#which-half").html("SECOND HALF");
					$('#option-2').attr('selected', 'selected');
					console.log("oh hey");
				}
				else if(millis >= minutesInGame*60*1000) {
					clearInterval(clockInterval);
					alert("FINAL!");
				}
				
		}
			
			
		// add leading zero if only one digit
		if(secondsString.length < 2) {
			secondsString = "0" + secondsString;
		}
		if(minutesString.length < 2) {
			minutesString = "0" + minutesString;
		}
		
		// if seconds have incremented, then change the text
		if(secondsString.charAt(1) != $("#time4").html()){
			
			
			$("#time1").html(minutesString.charAt(0));
			$("#time2").html(minutesString.charAt(1));
			$("#time3").html(secondsString.charAt(0));
			$("#time4").html(secondsString.charAt(1));			
			// $changeClockSlider.attr('value', seconds);
			
			$('#edited-value').attr('value', minutesString + ":" + secondsString);
			
		}

	}	
	

	
	function grayOut() {
		$('#gray-out').attr('display','block');
		$('#gray-out').fadeTo('slow','.7');	
		$('#gray-out').css('z-index', '140');
	}
	
	function grayGone() {
		$('#gray-out').fadeTo('slow','0', function(e) {
			$(this).attr('display', 'none');
			$(this).css('z-index', '0');
		});	
	}
	
	function fieldFadeOut() {
		$('#field, #icon-bank').fadeTo('slow','.7');
		// bring up gray-out div so that you can't drag anything
		$('#gray-out').css('z-index', '140');
		$('.stat-icon-box, .icon-category > h3').fadeTo('slow','.3');
		// $('.icon-category > h3').fadeTo('slow','.3');
	}
	
	function fieldFadeIn() {
		$('#field, #icon-bank, .stat-icon-box, .icon-category > h3 ').fadeTo('slow','1');
		// put gray-out div back to reenable dragging 
		$('#gray-out').css('z-index', '0');
	}
	
	function warningUp() {
		$('#click-to-start').fadeIn('slow');
	}

	function warningGone() {
		$('#click-to-start').fadeOut('fast');	
	}

	
	

});