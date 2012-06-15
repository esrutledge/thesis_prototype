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
    

	var whichTeam;
	var whichStat;
	var whichOption;
	
	var whichPlayer;
	var playerNum;
	var currVal;
	var x;
	var y;
	
	var  currentTargetEvent;
	var lastGoal;
	
	var seconds;
	var minutes;


	var numGoals1 = 0;
	var numGoals2 = 0;
	
	// $('#field').click(function(e) {
		// if($('#clock-start-button').hasClass('clock-running')){			
// 			
			// x = e.pageX - $(e.target).offset().left - 4;
			// y = e.pageY - $(e.target).offset().top - 4 - 15;
// 			
			// currVal = $('.team-1 > .score-box > p').html();
			// currVal++;
			// $('.team-1 > .score-box > p').html(currVal);
// 	
			// whichTeam = "team-1";
			// whichStat = "goal";
// 	
			// /* bring up pop-up player selector */
			// $('#player-selector').fadeIn('fast');
		// }
	// });





	// function incrementCounter(e) {
		// var counterToIncrement = $(e.target).closest('.stat-counter').find('.current-count');
// 
		// var teamShort = whichTeam.replace('-','');
// 		
		// currVal = counterToIncrement.html();
// 
		// if($(e.target).hasClass('up-button')){
			// currVal ++;
		// }
		// else {
			// if(currVal > 0) {
				// currVal --;
			// }
		// }
		// counterToIncrement.html(currVal);
// 
		// /* objectChanger('currentStats.' + getStatCode(whichStat.replace('-', ''))+ '.' + teamShort, currVal); */
// 
// 
		// console.log(currVal);
		// console.log(currentStats);
// 		
		// /* bring up pop-up player selector */
		// $('#player-selector').fadeIn('fast');		
	// }
	
	
	// function decrementCounter(e) {
		// var counterToDecrement = $(e.target).closest('.stat-counter').find('.current-count');
// 		
		// currVal = counterToDecrement.html();
// 
		// if(currVal > 0){
				// currVal --;
		// }
		// counterToDecrement.html(currVal);
	// }

	
	
	function getTimeStamp() {
		var date = new Date(); 	
		var timeStampUTC = date.getTime();
		return timeStampUTC;
	}
	

	function grayOut() {
		$('#gray-out').attr('display','block');
		$('#gray-out').fadeTo('slow','.75');	
		$('#gray-out').css('z-index', '140');
	}
	
	function grayGone() {
		$('#gray-out').fadeTo('slow','0', function(e) {
			$(this).attr('display', 'none');
			$(this).css('z-index', '0');
		});	
	}
	
	function statPopUp(droppedStat) {
		$('#stat-popup').fadeIn('slow');
		if(droppedStat == "goal") {
			// conditionals
		}
	}


	function statPopUpGone() {
		$('#stat-popup').fadeOut('fast');
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
		
		$('.ok-button').addClass('ready');	
		$('#delete').removeClass('unused');	


		if( $("#player-number").html() == " "	) {
			$('#player-number').html(numClicked);
			$('#player-number').addClass('ready');

		}
		else if ( parseInt($('#player-number').html()) < 10 ){
			$('#player-number').html($('#player-number').html() + numClicked);
		}
	
		playerNum = $('#player-number').html();
		
		whichPlayer = findPlayerName(playerNum);
		$('#player-name .name p').html(whichPlayer);	
		$('#player-name .name p').fadeIn('fast');
	
	});
	
	$('.stat-option-icon').click(function(e) {
		whichOption = $(this).attr('id');
		showPlayerSelector();
	});
	


	$('#cancel').click(function(e) {
		resetPlayerSelector();
		// $(".stat-icon").addClass("draggable");
		
		statPopUpGone();
		grayGone();	


		if(whichStat != "goal") {
			decrementCounter(currentTargetEvent);
		}
	});

	$('#delete').click(function(e) {
			if (parseInt($('#player-number').html()) >= 10 ) {
				$('#player-number').html($('#player-number').html().charAt(0));
			
				// $('#player-name .name p').fadeOut('fast', function(){
					// $('#player-name .name p').html(' ');
				// });					
			}
			else if (parseInt($('#player-number').html()) < 10 ) {
					$('#player-number').html(" ");		
					$('#player-number').removeClass('ready');	
					$('#delete').addClass('unused');	
					$('.ok-button').removeClass('ready');	
			}
	});

	$('team-select').click(function(e) {
		if( $(this).hasClass('team-1') ) {
			whichTeam = "team-1";	
		}
		else {
			whichTeam = "team-2";
		}
		
	});

	$('.ok-button').click(function(e) {
		if($(this).hasClass('ready')){
			minutes = parseInt( $('#time1').html() + $('#time2').html());
			seconds = parseInt( $('#time3').html() + $('#time4').html());
			
			if($('#which-half').html() == "SECOND HALF") {
				seconds += 1500;
			}
			x = 0;
			y = 0;
			
			whichTeam = $(this).attr('id').replace('ok-', '');
			
			//then also UPDATE THE DATABASE
			 if(whichStat != ''){
				
				$.get("update_db.php?game=game_data", 
					{ 
						clockTime : seconds + 60*minutes,
						timeStamp : getTimeStamp(),
						fieldPos : { xPos: fieldPos.x, yPos : fieldPos.y },
						team: whichTeam,
						type: whichStat,
						typeOption : whichOption,
						player: whichPlayer,
						playerNum : playerNum
					},
				   function(data){
				   		// alert("Data Loaded: " + data);
					}
				);
				
				$.get('checkToggle.php?update=1', function(data) {
		  
				 
				});
				
				if(whichStat == "goal" ) {
					if( whichTeam == "team-1") {
						numGoals1 ++;	
						$('#score1-2 p').html(numGoals1 % 10);
						$('#score1-1 p').html(parseInt(numGoals1/10));
					}
					else {
						numGoals2 ++;
						$('#score2-2 p').html(numGoals1 % 10);
						$('#score2-1 p').html(parseInt(numGoals1/10));						
					}
					
				}
				
/* 				incrementCounter(currentTargetEvent); */
				resetPlayerSelector();
				
				statPopUpGone();
				grayGone();

			}	
		 }
	});
	

	$('#nobody').click(function(e) {
			//then  UPDATE THE DATABASE
			// $.get("update_db.php", 
				// { 
					// clockTime : seconds + 60*minutes,
					// timeStamp : getTimeStamp(),
					// fieldPos : { xPos: fieldPos.x, yPos : fieldPos.y },
					// team: whichTeam,
					// type: whichStat,
					// player: 'unknown'
				// },
			   // function(data){
			     // // alert("Data Loaded: " + data);
			// });
		whichPlayer = "unknown";
		$('#player-number').html(" ");	
		
	});
	

	function findPlayerName(number) {
		// if(number == 22) {
			// return "Liz Rutledge";
		// }
		// else if(number == 18) {
			// return "Liza Stark";
		// }
		// else if(number == 13) {
			// return "Jess Bromall";
		// }		
		// else {
			return "player #" + number;
		// }
	}
	
	function showPlayerSelector() {
		whichTeam = null;
		$('#stat-popup').fadeIn('slow');
		$('#stat-popup-horizontal').fadeIn('fast').css('z-index', '160');
		$('#player-selector').fadeIn('fast');
	}
	
	function resetPlayerSelector() {
		$('#stat-popup-horizontal').fadeOut('fast');
		$('#player-selector').fadeOut('fast');
		$('#player-name .name p').html(' ');
		$('#player-name .number-digit').html(' ');
		$('#player-name .number-digit').removeClass('ready');
		$('.ok-button').removeClass('ready');
		$('#delete').addClass('unused');
	}


	// function checkMongo() {
		// $.getJSON('update_stats.php', 
				// { 
					// game_id : 'sampleGame'
				// },
			   // function(json){
// /* 				    console.log("Data Loaded: " + json); */
					// var jsObject = eval(json);
// /* 				    console.log(tempObj) */
// 					
					// $.each(currentStats, function(statType, values) {
						// console.log(statType);
	// /*
						// console.log("----" + currentStats.shotAttempts.team1);
							// console.log("----___" + eval('currentStats.' + statType + '.team1'));
// */
							// if(values.team1 < eval('jsObject.' + statType + '.team1') ) {
								// values.team1 = eval('jsObject.' + statType + '.team1');
								// //console.log(currentStats);
								// if(statType == "score") {
// //										values.team1 = eval('jsObject.' + statType + '.team1');
										// $('.team-1 > .score-box > p').html(eval('jsObject.' + statType + '.team1')); 
								// }
							// }
							// if(values.team2 < eval('jsObject.' + statType + '.team2') ) {
								// values.team2 = eval('jsObject.' + statType + '.team2');
								// //console.log(currentStats);
								// if(statType == "score") {
// //										values.team2 = eval('jsObject.' + statType + '.team2'); 
									// $('.team-2 > .score-box > p').html(eval('jsObject.' + statType + '.team2')); 
								// }
							// }
					// });
// 					
				// });
		// }







	$.fn.draggable = function() {
       
      	var offset = null;
      	var pageLoc = null;
      	var fieldLoc = null;
        var horizontalChange;
        
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
        	
        	$(this).parent().removeClass('covered');
        	
        	$(this).addClass('dragged');
        	$(this).css({
            	top: orig.changedTouches[0].pageY - offset.y -40,
            	left: orig.changedTouches[0].pageX - offset.x
          	});
			horizontalChange = orig.changedTouches[0].pageX - offset.x; 
          
        };
       
		var dropped = function(e) {
			//first case: initial stat-icons
			
			if($(this).hasClass('stat-icon')) {
				pageLoc = $(this).offset();
				
				fieldPos = {
	            	x: pageLoc.left -29,
	            	y: pageLoc.top - 118
	        	};

				// alert("x: " + fieldPos.x + "y: " + fieldPos.y);		
				whichStat = $(this).attr("id");
				
				if(whichStat == "goal" || whichStat == "shot-attempt") {
					
					if(whichStat == "goal" ){
						$("#stat-popup .deep-inner-shadow h2").html('What kind of goal?');
		        		$(".option-container.option-1 > img").attr({'src':'images/scorekeeping/no-assist.png',
		        													'id' : 'no-assist'});
		        		
		        		$(".option-container.option-2 > img").attr({'src':'images/scorekeeping/assisted.png',
		        													'id' : 'assisted'});
		        	}
		        	else if(whichStat == "shot-attempt" ) {
		        		$("#stat-popup .deep-inner-shadow h2").html('Why did they miss?');
		        		$(".option-container.option-1 > img").attr({'src':'images/scorekeeping/missed-shot.png',
		        													'id' : 'missed-shot'});
	
		        		$(".option-container.option-2 > img").attr({'src':'images/scorekeeping/goalie-save.png',
		        													'id' : 'goalie-save'});
		        	}
					statPopUp(whichStat);

				}
				else {
					/* bring up pop-up player selector */
					whichOption = "none";
					// statPopUp(whichStat);

					showPlayerSelector();
				}
				// grayed out box
				grayOut();
				
				$(this).css({
				 	top: "0px",
	             	left: "0px"
	         	});
	         	
	         	$(this).removeClass('dragged');
	         	$(this).parent().addClass('covered');	
	        }
	        
	        // if made it to the options screen
	        else if($(this).hasClass('stat-option-icon')) {
	        	
	        	if(horizontalChange < 0){
	        		whichTeam = "team-1";
	        	
	        		if(whichStat == "goal") {
	        			if(parseInt($('#score1-2  p').html()) < 9) {
	        				$('#score1-2 p').html(parseInt($('#score1-2  p').html()) + 1);
	        			}
	        			else {
	        				$('#score1-2  p').html(0);
							$('#score1-1  p').html(parseInt($('#score1-1  p').html()) + 1);
	        			}
	        		}
	        	}
	        	else {
	        		whichTeam = "team-2";
	        		if(whichStat == "goal") {
	        			if(parseInt($('#score2-2  p').html()) < 9) {
	        				$('#score2-2 p').html(parseInt($('#score2-2  p').html()) + 1);
	        			}
	        			else {
	        				$('#score2-2  p').html(0);
							$('#score2-1  p').html(parseInt($('#score2-1  p').html()) + 1);
	        			}
	        		}
	        	}
	        	// alert(whichTeam);
	        	showPlayerSelector();
	        	$(this).css({
				 	top: "0px",
	             	left: "0px"
	         	});
	        
	        }
		}
		
        this.bind("touchstart", start);
        this.bind("touchmove", moveMe);
        this.bind("touchend", dropped);
      

	};
      
    $(".draggable").draggable();



});
