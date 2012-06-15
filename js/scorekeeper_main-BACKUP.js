$(document).ready(function(){

	
	
	var currentStats = 
	{
        "score": {
            "team1": 0,
            "team2": 0
        },
        "completepasses": {
            "team1": 0,
            "team2": 0
        },
        "incompletepasses": {
            "team1": 0,
            "team2": 0
        },
        "interceptions": {
            "team1": 0,
            "team2": 0
        },
        "groundballs": {
            "team1": 0,
            "team2": 0
        },
        "fouls": {
            "team1": 0,
            "team2": 0
        },
        "assists": {
            "team1": 0,
            "team2": 0
        },
        "goaliesaves": {
            "team1": 0,
            "team2": 0
        },
        "shotattempts": {
            "team1": 0,
            "team2": 0
        }
    };
    
    console.log(currentStats);
    
 //  checkMongo();
    
    	//var checkDatabaseInterval = setInterval(checkMongo, 1000);

    
	/*
$('.stat-counter-element').click(function() {
		if($(this).hasClass('zeroOriginRotateCW')){			
			$(this).removeClass('zeroOriginRotateCW');
			$(this).addClass('zeroOriginRotateCCW');
		}
		else {
			$(this).removeClass('zeroOriginRotateCCW');
			$(this).addClass('zeroOriginRotateCW');
		}
	});
*/


	var millis = 0;
	var seconds = 0;
	var minutes = 0;
	
	var clockInterval;
	
	var	$clockSeconds = $("#clock-seconds");		
	var	$clockMinutes = $("#clock-minutes");


	var whichTeam;
	var whichStat;
	var whichPlayer;
	var playerNum;
	var currVal;
	var x;
	var y;
	
	var  currentTargetEvent;
	var lastGoal;


	// $('.stat-counter-element > .counter-button.up-button').click(function(e) {
		// if($('#clock-start-button').hasClass('clock-running')){
			// pinPointCounter(e);
	 		// currentTargetEvent = e; 
			// incrementCounter(e);
		// }
	// });
// 	
	// $('.stat-counter-element > .counter-button.down-button').click(function(e) {
		// if($('#clock-start-button').hasClass('clock-running')){
			// pinPointCounter(e);
			// decrementCounter(e);
		// }
	// });

// 
	// $('.stat-counter-element > .counter-button').mousedown(function(e) {
		// $(e.target).addClass('button-clicked');;
	// });
// 
// 
	// $('.stat-counter-element > .counter-button').mouseup(function(e) {
		// setTimeout(function() {
			// $(e.target).removeClass('button-clicked');
		// }, 180);		
	// });
// 	
	
	
	//checkMongo();
	
	
	//set ajax handler for goal popups
/*
	$('#field').ajaxSend(
		goalPopUp(e);
	);
*/
	
	
	
	
	
	
	
	
	
	
	$('#field .left-half').click(function(e) {
		if($('#clock-start-button').hasClass('clock-running')){			
			var clonedItem = $('.goal:first').clone();
			x = e.pageX - $(e.target).offset().left - 4;
			y = e.pageY - $(e.target).offset().top - 4 - 15;
			clonedItem.css({ left:x, top:y });
			clonedItem.removeAttr('id');
			clonedItem.appendTo($('#field .left-half'));
			
			$("div:hidden:last").fadeIn("fast");
			
			
			lastGoal = $("div:hidden:last");
			lastGoal.show();
			
			currVal = $('.team-1 > .score-box > p').html();
			currVal++;
			$('.team-1 > .score-box > p').html(currVal);
	
			whichTeam = "team-1";
			whichStat = "goal";
	
			/* bring up pop-up player selector */
			$('#player-selector').fadeIn('fast');
		}
	});

	$('#field .right-half').click(function(e) {
		if($('#clock-start-button').hasClass('clock-running')){

			var clonedItem = $('.goal:first').clone();
			x = e.pageX - $(e.target).offset().left - 4;
			y = e.pageY - $(e.target).offset().top - 4 - 15;
			clonedItem.css({ left:x, top:y });
			clonedItem.removeAttr('id');
			clonedItem.appendTo($('#field .right-half'));
			
			$("div:hidden:last").fadeIn("fast");
			
			currVal = $('.team-2 > .score-box > p').html();
			currVal++;
			$('.team-2 > .score-box > p').html(currVal);
			
			whichTeam = "team-2";
			whichStat = "goal";
	
			/* bring up pop-up player selector */
			$('#player-selector').fadeIn('fast');
							
		}
	});






	function incrementCounter(e) {
		var counterToIncrement = $(e.target).closest('.stat-counter').find('.current-count');

		var teamShort = whichTeam.replace('-','');
		
		currVal = counterToIncrement.html();

		if($(e.target).hasClass('up-button')){
			currVal ++;
		}
		else {
			if(currVal > 0) {
				currVal --;
			}
		}
		counterToIncrement.html(currVal);

		/* objectChanger('currentStats.' + getStatCode(whichStat.replace('-', ''))+ '.' + teamShort, currVal); */


		console.log(currVal);
		console.log(currentStats);
		
		/* bring up pop-up player selector */
		$('#player-selector').fadeIn('fast');		
	}
	
	function decrementCounter(e) {
		var counterToDecrement = $(e.target).closest('.stat-counter').find('.current-count');
		
		currVal = counterToDecrement.html();

		if(currVal > 0){
				currVal --;
		}
		counterToDecrement.html(currVal);
	}

	
	
	function getTimeStamp() {
		var date = new Date(); 	
		var timeStampUTC = date.getTime();
		return timeStampUTC;
	}
	
	function goalPopUp(e){
	
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
	
	

	
	/****************************
	
		PLAYER SELECTOR LOGIC
	
	*****************************/
	
	
	
	var names = {
		"22" : "Liz Rutledge",
		"18" : "Liza Stark",
		"23" : "Jess Bromall"
	};

	$('.number-button').click(function(e) {
		var numClicked = $(e.target).closest('.number-button').attr('id').split('-')[1];
		
		if($('#number-digit-1').html() == " ") {
			$('#number-digit-1').html(numClicked);
			$('#number-digit-1').addClass('ready');	
			$('#delete').removeClass('unused');		
		}
		else {
			if($('#number-digit-2').html() == " ") {
				$('#number-digit-2').html(numClicked);		
				$('#ok-button').addClass('ready');	
				$('#number-digit-2').addClass('ready');	
				
				var num = $('#number-digit-1').html() + $('#number-digit-2').html();
				
				playerNum = num;
				whichPlayer = findPlayerName(num);
				$('#player-name .name p').html(whichPlayer);	
				$('#player-name .name p').fadeIn('fast');					
			}
		}
	});

	$('#cancel').click(function(e) {
		resetPlayerSelector();
		// $(".stat-icon").addClass("draggable");

		grayGone();	


		if(whichStat != "goal") {
			decrementCounter(currentTargetEvent);
		}
	});

	$('#delete').click(function(e) {
			if($('#number-digit-2').html() != " ") {
				$('#number-digit-2').html(" ");		
				$('#number-digit-2').removeClass('ready');		
				$('#ok-button').removeClass('ready');	
				$('#player-name .name p').fadeOut('fast', function(){
					$('#player-name .name p').html(' ');
				});					

			}
			else {
				if($('#number-digit-1').html() != " ") {
					$('#number-digit-1').html(" ");		
					$('#number-digit-1').removeClass('ready');	
					$('#delete').addClass('unused');	
				}
			}
	});


	$('#ok-button').click(function(e) {
		if($(this).hasClass('ready')){
			
			//then also UPDATE THE DATABASE
			 if(whichStat != ''){
				
				$.get("update_db.php", 
					{ 
						clockTime : seconds + 60*minutes,
						timeStamp : getTimeStamp(),
						fieldPos : { xPos: x, yPos : y },
						team: whichTeam,
						type: whichStat,
						player: whichPlayer,
						playerNum : playerNum
					},
				   function(data){
				     alert("Data Loaded: " + data);
				});
				
/* 				incrementCounter(currentTargetEvent); */
				resetPlayerSelector();
				
				grayGone();

			}	
		 }
	});
	

	$('#nobody').click(function(e) {
			//then  UPDATE THE DATABASE
			$.get("update_db.php", 
				{ 
					clockTime : seconds + 60*minutes,
					timeStamp : getTimeStamp(),
					fieldPos : { xPos: x, yPos : y },
					team: whichTeam,
					type: whichStat,
					player: 'unknown'
				},
			   function(data){
			     alert("Data Loaded: " + data);
			});
		$('#player-selector').fadeOut('fast');

		grayGone();	

	});
	

	function findPlayerName(number) {
		if(number == 22) {
			return "Liz Rutledge";
		}
		else if(number == 18) {
			return "Liza Stark";
		}
		else if(number == 13) {
			return "Jess Bromall";
		}		
		else {
			return "No player with that number!";
		}
	}
	

	
	function resetPlayerSelector() {
		$('#player-selector').fadeOut('fast');
		$('#player-name .name p').html(' ');
		$('#player-name .number-digit').html(' ');
		$('#player-name .number-digit').removeClass('ready');
		$('#ok-button').removeClass('ready');
		$('#delete').addClass('unused');
	}


	function checkMongo() {
		$.getJSON('update_stats.php', 
				{ 
					game_id : 'sampleGame'
				},
			   function(json){
/* 				    console.log("Data Loaded: " + json); */
					var jsObject = eval(json);
/* 				    console.log(tempObj) */
					
					$.each(currentStats, function(statType, values) {
						console.log(statType);
	/*
						console.log("----" + currentStats.shotAttempts.team1);
							console.log("----___" + eval('currentStats.' + statType + '.team1'));
*/
							if(values.team1 < eval('jsObject.' + statType + '.team1') ) {
								values.team1 = eval('jsObject.' + statType + '.team1');
								//console.log(currentStats);
								if(statType == "score") {
//										values.team1 = eval('jsObject.' + statType + '.team1');
										$('.team-1 > .score-box > p').html(eval('jsObject.' + statType + '.team1')); 
								}
							}
							if(values.team2 < eval('jsObject.' + statType + '.team2') ) {
								values.team2 = eval('jsObject.' + statType + '.team2');
								//console.log(currentStats);
								if(statType == "score") {
//										values.team2 = eval('jsObject.' + statType + '.team2'); 
									$('.team-2 > .score-box > p').html(eval('jsObject.' + statType + '.team2')); 
								}
							}
					});
					
				});
		}







	$.fn.draggable = function() {
       
      	var offset = null;
        var endPos;
        
        var start = function(e) {
 
        	var orig = e.originalEvent;
        	var pos = $(this).position();
        	offset = {
            	x: orig.changedTouches[0].pageX - pos.left,
            	y: orig.changedTouches[0].pageY - pos.top
        	};
        };
       
        var moveMe = function(e) {
        	e.preventDefault();
        	var orig = e.originalEvent;
        	endPos = $(this).position();
        	$(this).addClass('dragged');

        	$(this).parent().removeClass('covered');
        	$(this).css({
            	top: orig.changedTouches[0].pageY - offset.y -15,
            	left: orig.changedTouches[0].pageX - offset.x
          	});
          
        };
       
		var dropped = function(e) {
			whichStat = $(this).attr("id");
			
			/* bring up pop-up player selector */
			$('#player-selector').fadeIn('fast');
			
			// grayed out box
			grayOut();
			
			$(this).css({
			 	top: 0,
             	left: 0
         	});
         	
         	$(this).removeClass('dragged');
         	$(this).parent().addClass('covered');	
		}
		
        this.live("touchstart", start);
        this.live("touchmove", moveMe);
        this.live("touchend", dropped);
      

	};
      
    $(".draggable").draggable();


     


});
