$(function(){
	
	var minutesInGame = 50;
	var numberOfPeriods = 2;
	
	$('#big-time').html(minutesInGame + ":00");
	$('#slider-right .slider-time .time').html(minutesInGame + ":00");
	$('#period-number').html(numberOfPeriods);
	
	var lengthOfGame = 60*minutesInGame;
	
	var statEvents = [];
	
	var sliderBoundaries = {
		left: -3,
		right: 533	
	};
	
	var timeLeft;
	var timeRight;
	
	var oldData;
	
	var initialAssists1 = 0;
	var initialAssists2 = 0;
	
	var team1stats = {};
	var team2stats = {};
	var dataLoaded = false;			
		
	
	checkStats();
	
			
	$(".slider").bind('touchstart', function() {
		console.log(statEvents);
		sliderInterval = setInterval(changeTimeInterval, 10);
	});		
	
	$('.stat-bar-chart-box .icon').bind('touchstart', function(e) {
		
		if($(this).css('opacity') == 1){
			$(this).css('opacity', .4);
			$('.stat-on-field.' + $(this).attr('class').split(' ')[1]).removeClass('stat-showing').addClass('stat-hidden');
			$('.stat-on-field.' + $(this).attr('class').split(' ')[1]).hide();
		}
		else {
			$(this).css('opacity', 1);
			$('.stat-on-field.' + $(this).attr('class').split(' ')[1]).removeClass('stat-hidden').addClass('stat-showing');
			$('.stat-on-field.' + $(this).attr('class').split(' ')[1]).show();
		}
		console.log($(this).attr('class').split(' ')[1]);
	});

	
	$(".label").bind('touchstart', function() {
		if( $(this).hasClass('clicked')) {
			$(this).removeClass('clicked');
			$(this).siblings('.info-to-hide').hide();
			$(this).parent().css('opacity', .4);
			if($(this).hasClass('team-1')){
				$('.stat-on-field.team-1.team-showing.stat-showing').removeClass('team-showing').addClass('team-hidden').hide();
			}
			else {
				$('.stat-on-field.team-2.team-showing.stat-showing').removeClass('team-showing').addClass('team-hidden').hide();
			}
		}
		else {
			$(this).addClass('clicked');
			$(this).siblings('.info-to-hide').show();
			$(this).parent().css('opacity', 1);
			if($(this).hasClass('team-1')){
				$('.stat-on-field.team-1.team-hidden.stat-showing').removeClass('team-hidden').addClass('team-showing').show();
			}
			else {
				$('.stat-on-field.team-2.team-hidden.stat-showing').removeClass('team-hidden').addClass('team-showing').show();
				}
		}
	});	


	$('div.stat-on-field').live('click touchstart', function(){
	
		if($(this).children('p').attr('display') == 'none') {
			$(this).css('z-index', 9999);	
		}
		else {
			$(this).css('z-index', 100);
		}
		
		$(this).children('p').toggle();
	});
	
	
	
	var sliderInterval;
	
	$.fn.slideable = function() {
       
      	var offset = null;
      	var pageLoc = null;
      	var fieldLoc = null;
        var horizontalChange;
       
        
        var startTouch = function(e) {
 
        	var orig = e.originalEvent;
        	var pos = $(this).position();
        	offset = {
            	x: orig.changedTouches[0].pageX - pos.left,
            	y: orig.changedTouches[0].pageY - pos.top
        	};
        };
       
        var moveMeTouch = function(e) {
        	
        	
        	e.preventDefault();
        	sliderInterval = setInterval(changeTimeInterval, 10);
        	var orig = e.originalEvent;
        	endPos = $(this).position();
        	
        	$(this).parent().removeClass('covered');
        	
        	$(this).addClass('dragged');
        	
        	var xPosition =  orig.changedTouches[0].pageX - offset.x;
        	

        	
        	if($(this).attr('id') == "slider-left") {
        		sliderBoundaries.left = xPosition + 21 + 7;
        		if(xPosition > -28 && xPosition < 512 && sliderBoundaries.left < sliderBoundaries.right ) {
        			$(this).css({
		            	left: orig.changedTouches[0].pageX - offset.x
		          	});		
        		}
        	}
        	else if($(this).attr('id') == "slider-right") {
        		sliderBoundaries.right = xPosition + 7;
        		if(xPosition > -4 && xPosition < 533 && sliderBoundaries.left < sliderBoundaries.right ) {
        			$(this).css({
		            	left: orig.changedTouches[0].pageX - offset.x
		          	});		
        		}
        	}
        	
			horizontalChange = orig.changedTouches[0].pageX - offset.x; 
			
			timeLeft = parseInt(sliderBoundaries.left/533 * lengthOfGame);
			timeRight = parseInt(sliderBoundaries.right/533 * lengthOfGame);
			
			if(sliderBoundaries.left >533) {
				timeLeft = lengthOfGame;
			}
			if(sliderBoundaries.right >533) {
				timeRight = lengthOfGame;
			}
			if(sliderBoundaries.left < 0) {
				timeLeft = 0;
			}
			if(sliderBoundaries.right < 0) {
				timeRight = 0;
			}

			

			var timeLeftString = parseInt(timeLeft/60) + ":" + timeLeft % 60;
			var timeRightString = parseInt(timeRight/60) + ":" + timeRight % 60;

			if(timeLeft % 60 < 10) {
				timeLeftString = parseInt(timeLeft/60) + ":0" + timeLeft % 60;
				if(timeLeft <= 0){
					timeLeftString = "0:00";
				}
			}
			if(timeRight % 60 < 10) {
				timeRightString = parseInt(timeRight/60) + ":0" + timeRight % 60;
				if(timeRight <= 0){
					timeRightString = "0:00";
				}
			}
			
        	
        	$('#big-time').html(timeRightString);

			$('#slider-left .slider-time .time').html(timeLeftString);
        	$('#slider-right .slider-time .time').html(timeRightString);
       		
        	
        	var pctGame = sliderBoundaries.right/534;
        	
        	for(var i = 0; i < numberOfPeriods; i++) {
        		if(pctGame >= i/numberOfPeriods && pctGame < (i+1)/numberOfPeriods){
        			$('#period-number').html(i+1);
        		}
        	}
        	
       		
       		$('#gray-box-left').css('width', sliderBoundaries.left);
       		$('#gray-box-right').css('width', 533 - sliderBoundaries.right);
       			          
        };
       
		var droppedTouch = function(e) {
			
		clearInterval(sliderInterval);
		
        this.bind("touchstart", startTouch);
        this.bind("touchmove", moveMeTouch);
        this.bind("touchend", droppedTouch);

	};
      
    $(".slider").slideable();


	
	function changeTimeInterval() {
				
			$.each(team1stats, function(keyOuter, valueOuter) {
				$.each(valueOuter, function(key, value) {
					if(value.clockTime < timeRight && value.clockTime > timeLeft){						
						if(value.visible != true) {
							value.visible = true;							
							$('#team-1-' + value.type + '-' + key + '-field').addClass('visible').css({top: value.fieldPos.yPos * 1.12 - 30, left: value.fieldPos.xPos * 1.12});
							$('#team-1-' + value.type + '-' + key + '-field').show();
							$('.stat-bar-chart-box .icon.' + value.type).siblings('.team-1-bg.bar-chart-line').css('width', 15* (parseInt(key) + 1));
						}
					}
					else {
						if(value.visible == true) {
							value.visible = false;
							$('#team-1-' + value.type + '-' + key + '-field').removeClass('visible').hide();
							$('.stat-bar-chart-box .icon.' + value.type).siblings('.team-1-bg.bar-chart-line').css('width', 15* (parseInt(key)));
						}	
					} // end time check
					
				});
			});
			$.each(team2stats, function(keyOuter, valueOuter) {
				$.each(valueOuter, function(key, value) {
					if(value.clockTime < timeRight && value.clockTime > timeLeft){
						if(value.visible != true) {
							value.visible = true;
							$('#team-2-' + value.type + '-' + key + '-field').addClass('visible').css({top: value.fieldPos.yPos * 1.12 - 30, left: value.fieldPos.xPos * 1.12});
							$('#team-2-' + value.type + '-' + key + '-field').show();
							$('.stat-bar-chart-box .icon.' + value.type).siblings('.team-2-bg.bar-chart-line').css('width', 15* (parseInt(key) + 1));

						}
					}
					else {
						if(value.visible == true) {
							value.visible = false;
							$('#team-2-' + value.type + '-' + key + '-field').removeClass('visible').hide();
							$('.stat-bar-chart-box .icon.' + value.type).siblings('.team-2-bg.bar-chart-line').css('width', 15* $('.visible.team-2.' + value.type).length );
						}	
					} // end time check
					
				});
			});
			
			$('#score1-1 p').html(parseInt($('.goal.visible.team-1').length/10));
			$('#score1-2 p').html($('.goal.visible.team-1').length % 10);
			
			$('#score2-1 p').html(parseInt($('.goal.visible.team-2').length/10));
			$('#score2-2 p').html($('.goal.visible.team-2').length % 10);
			
			$('#assists .team-1-bg.bar-chart-line').css('width', parseInt($('.assisted.visible.team-1').length) * 15 );
			$('#assists .team-2-bg.bar-chart-line').css('width', parseInt($('.assisted.visible.team-2').length) * 15 );

	}


	function checkStats() {
		$.get("update_stats.php?game=game_data",
		{},
		function(data) {
				
				team1stats = {};
				team1stats.groundBalls = [];
				team1stats.goals = [];
				team1stats.interceptions = [];
				team1stats.turnovers = [];
				team1stats.missedShots = [];
				team1stats.fouls = [];
				team1stats.penalties = [];
				team1stats.drawControls = [];
				team1stats.goalieSaves = [];
			
				
				team2stats = {};
				team2stats.groundBalls = [];
				team2stats.goals = [];
				team2stats.interceptions = [];
				team2stats.turnovers = [];
				team2stats.missedShots = [];
				team2stats.fouls = [];
				team2stats.penalties = [];
				team2stats.drawControls = [];
				team2stats.goalieSaves = [];	
				
				var items = [];
				

				$.each(data, function(key, val) {
					items.push(val);
					
					if(val.team == "team-1") {
						
						if(val.type == "ground-ball") {
							team1stats.groundBalls.push(val);
						}
						else if(val.type == "interception") {
							team1stats.interceptions.push(val);
						}
						else if(val.type == "goal") {
							team1stats.goals.push(val);
							if(val.typeOption == "assisted") {
								initialAssists1 ++;
							}
						}
						else if(val.type == "penalty") {
							team1stats.penalties.push(val);
						}
						else if(val.typeOption == "missed-shot") {
							team1stats.missedShots.push(val);
						}
						else if(val.type == "foul") {
							team1stats.fouls.push(val);
						}
						else if(val.type == "goalie-save") {
							team1stats.goalieSaves.push(val);
						}
						else if(val.type == "penalty") {
							team1stats.penalties.push(val);
						}
						else if(val.type == "draw-control") {
							team1stats.drawControls.push(val);
						}
					}
					else {
						
						if(val.type == "ground-ball") {
							team2stats.groundBalls.push(val);
						}
						else if(val.type == "interception") {
							team2stats.interceptions.push(val);
						}
						else if(val.type == "goal") {
							team2stats.goals.push(val);
							if(val.typeOption == "assisted") {
								initialAssists2 ++;
							}
						}
						else if(val.type == "turnover") {
							team2stats.turnovers.push(val);
						}
						else if(val.typeOption == "missed-shot") {
							team2stats.missedShots.push(val);
						}
						else if(val.type == "foul") {
							team2stats.fouls.push(val);
						}
						else if(val.type == "goalie-save") {
							team2stats.goalieSaves.push(val);
						}
						else if(val.type == "penalty") {
							team2stats.penalties.push(val);
						}
						else if(val.type == "draw-control") {
							team2stats.drawControls.push(val);
						}
					}
					
				
				});
				
				statEvents = items;				
				
				
				$('#interceptions .team-1-bg.bar-chart-line').css('width', team1stats.interceptions.length * 15);
				$('#interceptions .team-2-bg.bar-chart-line').css('width', team2stats.interceptions.length * 15);
				
				$('#ground-balls .team-1-bg.bar-chart-line').css('width', team1stats.groundBalls.length * 15);
				$('#ground-balls .team-2-bg.bar-chart-line').css('width', team2stats.groundBalls.length * 15);
				
				$('#assists .team-1-bg.bar-chart-line').css('width', initialAssists1 * 15 );
				$('#assists .team-2-bg.bar-chart-line').css('width', initialAssists1 * 15 );
				
				$('#missed-shots .team-1-bg.bar-chart-line').css('width', team1stats.missedShots.length * 15);
				$('#missed-shots .team-2-bg.bar-chart-line').css('width', team2stats.missedShots.length * 15);
				
				$('#goalie-saves .team-1-bg.bar-chart-line').css('width', team1stats.goalieSaves.length * 15);
				$('#goalie-saves .team-2-bg.bar-chart-line').css('width', team2stats.goalieSaves.length * 15);
				
				$('#penalties .team-1-bg.bar-chart-line').css('width', team1stats.penalties.length * 15);
				$('#penalties .team-2-bg.bar-chart-line').css('width', team2stats.penalties.length * 15);
	
				$('#fouls .team-1-bg.bar-chart-line').css('width', team1stats.fouls.length * 15);
				$('#fouls .team-2-bg.bar-chart-line').css('width', team2stats.fouls.length * 15);
	
				$('#draw-controls .team-1-bg.bar-chart-line').css('width', team1stats.drawControls.length * 15);
				$('#draw-controls .team-2-bg.bar-chart-line').css('width', team2stats.drawControls.length * 15);
	
				
	
				$('#score1-1 p').html(parseInt(team1stats.goals.length/10));
				$('#score1-2 p').html(team1stats.goals.length % 10);
				
				$('#score2-1 p').html(parseInt(team2stats.goals.length/10));
				$('#score2-2 p').html(team2stats.goals.length % 10);
				
		
	
				$.each(team1stats.goals, function(key, value) {
					$('#goal-bar-clone-1').clone().appendTo('#goal-bars');	
					$('#goal-bar-clone-1').last().attr('id', 'team-1-goal-' + key + '-bar');
					$('#team-1-goal-' + key + '-bar').last().css( {height: (key+1) * 5, left: value.clockTime/lengthOfGame * 534});
					
				});
				
				
				
				$.each(team2stats.goals, function(key, value) {
					$('#goal-bar-clone-2').clone().appendTo('#goal-bars');	
					$('#goal-bar-clone-2').last().attr('id', 'team-2-goal-' + key);
					$('#team-2-goal-' + key).last().css( {height: (key+1) * 5, left: value.clockTime/lengthOfGame * 534});
				});
				
				
				
				console.log(team1stats);
				
				$.each(team1stats, function(keyOuter, valueOuter) {
					$.each(valueOuter, function(key, value) {
						
							value.visible = true;
							var statLabel = value.type.split('-')[0][0];
							if(value.type.split('-').length >1) {
								statLabel += value.type.split('-')[1][0];
							}
							
							if(value.type == "goal"){
								$('#goal-to-clone.team-1-bg').clone().addClass('visible team-showing stat-on-field stat-showing player-' + value.playerNum + ' ' + value.typeOption).appendTo('#field');
								$('#goal-to-clone.team-1-bg').last().attr('id', 'team-1-' + value.type + '-' + key + '-field');
								$('#team-1-' + value.type + '-' + key + '-field p').html("Stat Type: " + value.type + ' (' + value.typeOption.replace('-', ' ') + ')<br />Player #' + value.playerNum + '<br /> Time: ' + parseInt(value.clockTime/60) + ":" + value.clockTime%60 );
							}
							else {
								$('#stat-to-clone.team-1').clone().addClass('team-showing stat-showing player-' + value.playerNum).appendTo('#field');
								$('#stat-to-clone.team-1').last().attr('id', 'team-1-' + value.type + '-' + key + '-field');
								$('#team-1-' + value.type + '-' + key + '-field p').html("Stat Type: " + value.type + '<br />Player #' + value.playerNum + '<br /> Time: ' + parseInt(value.clockTime/60) + ":" + value.clockTime%60 );
							}
							
							
							$('#team-1-' + value.type + '-' + key + '-field').css({top: value.fieldPos.yPos * 1.12 - 30, left: value.fieldPos.xPos * 1.12});
							$('#team-1-' + value.type + '-' + key + '-field').addClass('stat-on-field');
							$('#team-1-' + value.type + '-' + key + '-field').addClass(value.type);
					
					});
				});
				
				
				$.each(team2stats, function(keyOuter, valueOuter) {
					$.each(valueOuter, function(key, value) {
						value.visible = true;
						
						var statLabel = value.type.split('-')[0][0];
						if(value.type.split('-').length >1) {
							statLabel += value.type.split('-')[1][0];
						}
						if(value.type == "goal"){				
							$('#goal-to-clone.team-2-bg').clone().addClass('visible team-showing stat-on-field stat-showing player-' + value.playerNum+ ' ' + value.typeOption).appendTo('#field');
							$('#goal-to-clone.team-2-bg').last().attr('id', 'team-2-' + value.type + '-' + key + '-field');
							$('#team-2-' + value.type + '-' + key + '-field p').html("Stat Type: " + value.type + ' (' + value.typeOption.replace('-', ' ') + ')<br />Player #' + value.playerNum + '<br /> Time: ' + parseInt(value.clockTime/60) + ":" + value.clockTime%60 );
	
						}
						else {
							$('#stat-to-clone.team-2').clone().addClass('team-showing stat-showing player-' + value.playerNum).appendTo('#field');
							$('#stat-to-clone.team-2').last().attr('id', 'team-2-' + value.type + '-' + key + '-field');
							
							$('#team-2-' + value.type + '-' + key + '-field p').html("Stat Type: " + value.type + '<br />Player #' + value.playerNum + '<br /> Time: ' + parseInt(value.clockTime/60) + ":" + value.clockTime%60 );
						}
						
						
						$('#team-2-' + value.type + '-' + key + '-field').css({top: value.fieldPos.yPos * 1.12 - 30, left: value.fieldPos.xPos * 1.12});
						$('#team-2-' + value.type + '-' + key + '-field').addClass('stat-on-field');
						$('#team-2-' + value.type + '-' + key + '-field').addClass(value.type);
					});
				});
			
		},
		"json"
	);
	}
	

	function checkForUpdates() {
		console.log('checking');
		$.get('checkToggle.php?check=1', function(data) {
		  
		  if(data == 1){
		  	
		  	location.reload(true);
		  }
		  
		});
	}

	var checkInterval = setInterval(checkForUpdates, 1000);

	
});