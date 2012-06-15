<?php 

	$playerNumbers = array( array(2,3,4,5,6,7,8,9,11,13,14,15,17,18,19,21,22,23,24,28), array(2,3,4,5,6,7,8,9,11,13,15,16,17,19,20,21,22,23,25,26));
	$selectedNumbers = array(array(3,11,17,21,22,28), array(3,5,8,16));

	if(isset($_GET["game"])) {
		$collection = $db->$_GET["game"];
	}
?>

<!DOCTYPE html>

<html>
	<head>
		<title>dataCoach || visualization</title>
		<link href='http://fonts.googleapis.com/css?family=Nunito:300,400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.2.css" />
		<link rel="stylesheet" type="text/css" href="css/vis_styles.css" />
		<link rel="stylesheet" media="only screen and (max-device-width: 1024px)" href="css/ipad.css" type="text/css" />
	 
	    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		
<!-- 		<script type="text/javascript" charset="utf-8" src="js/scorekeeper_main.3.js" /> </script> -->
		<script type="text/javascript" charset="utf-8" src="js/vis.5.js"> </script>
		<script type="text/javascript" charset="utf-8" src="js/clock.js"> </script>
	    <script src="js/team-styles.js" type="text/javascript" charset="utf-8"></script>


		<link rel="apple-touch-startup-image" sizes="768x1004" href="images/ipad/open_screen.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="images/ipad/touch-icon-ipad.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="images/ipad/touch-icon-ipad3.png" />

		<!-- <link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" /> -->
		
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="viewport" id="view" content="user-scalable=no, width=device-width minimum-scale = 1, maximum-scale = 1" />
		<meta name="viewport" id="view" content="width=device-width minimum-scale = 1" />


		<script>
			 function BlockMove(event) {
			  // Tell Safari not to move the window.
			 	 event.preventDefault() ;
			 }
		</script>


	</head>
	<body ontouchmove="BlockMove(event);" id="vis-main">

		
		<div id="wrapper">
		 
					
			<header>	
			</header>
				
				
				<section id="scores-and-info">
					<div class='text-box'>
						<h1>HOME GAME</h1>
						<h2>SCOPE: 1 Game vs Away Team <span class="date">(April 14, 2012)</span></h2>
					</div>
					
					<section class="team-score-area team-1">
						<div class="scoreboard mid-shadow">
							<div class="score-card-container">
								<div id="score1-1" class="score-card team-1">
									<p></p>
									<div class="score-rings"></div>
								</div>
								<div id="score1-2" class="score-card team-1">
									<p></p>
									<div class="score-rings"></div>
								</div>
							</div>
							<div id="score-stand-left"></div>
						</div>
					</section>
				
					<section class="team-score-area team-2">
						<div class="scoreboard mid-shadow">
							<div class="score-card-container">
								<div id="score2-1" class="score-card team-2">
									<p></p>
									<div class="score-rings"></div>
								</div>
								<div id="score2-2" class="score-card team-2">
									<p></p>
									<div class="score-rings"></div>
								</div>
							</div>
							
							<div id="score-stand-right"></div>
						</div>
					</section>
	
				</section> <!-- #scores-and-info -->
								
				<section id="field" class="deep-shadow">
					<div id="goal-to-clone" class="team-1 team-1-bg"><p class="team-1-border"></p></div>
					<div id="stat-to-clone" class="team-1 team-1-bg"><p class="team-1-border"></p></div>

					<div id="goal-to-clone" class="team-2 team-2-bg"><p class="team-2-border"></p></div>
					<div id="stat-to-clone" class="team-2 team-2-bg"><p class="team-2-border"></p></div>
					
						
				</section>
				
				<section id="stats-and-options" class="clearfix light-inner-shadow">
					<div id="current-stats" class="column">
						<h2>CURRENT STATS</h2>
						<p>Click on a stat's icon to display or hide it on the field.</p>
						<div id="ground-balls" class="stat-bar-chart-box">
							<div class="icon ground-ball"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>GROUND BALLS</h3>
						</div>
						<div id="draw-controls" class="stat-bar-chart-box">
							<div class="icon draw-control"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>DRAW CONTROLS</h3>
						</div>
						<div id="assists" class="stat-bar-chart-box">
							<div class="icon assist"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>ASSISTS</h3>
						</div>
						<div id="interceptions" class="stat-bar-chart-box">
							<div class="icon interception"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>INTERCEPTIONS</h3>
						</div>
						<div id="missed-shots" class="stat-bar-chart-box">
							<div class="icon shot-attempt"></div><div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>MISSED SHOTS</h3>
						</div>
						<div id="goalie-saves" class="stat-bar-chart-box">
							<div class="icon goalie-save"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>GOALIE SAVES</h3>
						</div>
						<div id="penalties" class="stat-bar-chart-box">
							<div class="icon penalty"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>PENALTIES</h3>
						</div>
						<div id="fouls" class="stat-bar-chart-box">
							<div class="icon foul"></div>
							<div class="team-1-bg bar-chart-line"></div>
							<div class="team-2-bg bar-chart-line"></div>
							<h3>FOULS</h3>
						</div>

					</div>
					<div id="display-options" class="column">
						<h2>DISPLAY OPTIONS</h2>
						<p>Choose your team and player options below.</p>
						
					
						<div class="column team-1">
							<h2 class="team-name team-1 custom-checkbox-and-radio label clicked">Home</h2>
							<!--<div class="info-to-hide">
								<span class="player-option-box custom-checkbox-and-radio">		
									<input id="team-1-all-players" name="team-1-player-options" type="radio" checked />
									<label for="team-1-all-players">All Players</label>
								</span>
								<span class="player-option-box custom-checkbox-and-radio">
									<input id="team-1-select-player-input" name="team-1-player-options" type="radio" class="team-1-specific-players specific-players-radio"  />
									<label for="team-1-select-player-input" id="team-1-select-player-label" class="team-1-specific-players specific-players-label" >Specific Players</label>
									<div class="specific-player-grid">
										<?php foreach($playerNumbers[1] as $number): ?>
											<p id="player-number-<?php echo $number; ?>" class="player-number<?php if(in_array($number, $selectedNumbers[1])){ echo " selected"; } ?>"><?php echo $number; ?></p>
										<?php endforeach; ?>
										<div class="select-players-button rounded-corners-5">change selection</div>
									</div>
								</span>
								<div class="selected-players-grid"></div>
								<div class="change-selection-button"></div>
							</div>-->
						</div>						
						
						<div class="column team-2">
							<h2 class="team-name team-2 custom-checkbox-and-radio team-2 label clicked">Away</h2>
							<!--<div class="info-to-hide" >
								<span class="player-option-box custom-checkbox-and-radio">		
									<input id="team-2-all-players" name="team-2-player-options" type="radio" checked />
									<label for="team-2-all-players">All Players</label>
								</span>
								<span class="player-option-box custom-checkbox-and-radio">
									<input id="team-2-select-player-input" name="team-2-player-options" type="radio" class="team-2-specific-players specific-players-radio"  />
									<label for="team-2-select-player-input" id="team-2-select-player-label" class="team-2-specific-players specific-players-label" >Specific Players</label>
									<div class="specific-player-grid">
										<?php foreach($playerNumbers[1] as $number): ?>
											<p id="player-number-<?php echo $number; ?>" class="player-number<?php if(in_array($number, $selectedNumbers[1])){ echo " selected"; } ?>"><?php echo $number; ?></p>
										<?php endforeach; ?>
										<div class="select-players-button rounded-corners-5">change selection</div>
									</div>
								</span>
								<div class="selected-players-grid"></div>
								<div class="change-selection-button"></div>
							</div>-->
						</div>
						
						
					</div>
				</section>
				 

				
				<!-- <section id="scores-and-clock"> -->
					
	
				
					<!-- <div id="game-clock" class="clock-stopped mid-shadow">
						<div id="display-block">
							<div class="number-space" id="time1">0</div>
							<div class="number-space" id="time2">0</div>
							<div class="number-space" id="timecolon">:</div>	
							<div class="number-space" id="time3">0</div>			
							<div class="number-space" id="time4">0</div>
							<div id="final-score" >FINAL</div>			
							</div>
						<h4 id="which-half">FIRST HALF</h4>
					</div> -->


			<!-- </section> -->
			
			
				
				
				<!-- 
				
		

				
		
			<section id="click-to-start" >
				<p>CLOCK PAUSED</p>
			</section>
			

			<section id="stat-popup">
				<div id="cancel">cancel <span class="button">X</span></div>
				<div id="stat-popup-horizontal"></div>
				<div id="stat-popup-main" class="rounded-corners-16 deep-shadow">
					<div class="deep-inner-shadow">
						<h2>What kind of goal?</h2>
						<div class="option-container option-1">	
							<img id="no-assist" class="draggable stat-option-icon  option-1" src="images/scorekeeping/no-assist.png" />
						</div>	
						<div class="option-container option-2">
							<img id="assist" class="draggable stat-option-icon option-2" src="images/scorekeeping/assisted.png" />
						</div>	
						<p>(drag left or right to assign to a team)</p>
					</div>
					<div class="team-select team-1"></div>
					<div class="team-select team-2"></div>
				</div>
			</section>
						
		
			<section id="player-selector" class="deep-shadow" >
				
				<h2>Which player?</h2>
				<div id="submit-buttons" class="clearfix">
					<div  id="ok-team-1" class="ok-button button ok light-shadow"></div>
					<div  id="ok-team-2" class="ok-button button ok light-shadow"></div>										
										
				</div>
				<div id="number-buttons" class="clearfix">
					<?php
						for($i=1; $i<10; $i++) {
					?>
							<div id="number-<?php echo $i; ?>" class="number-button">
								<p class="light-shadow"><?php echo $i; ?></p>	
							</div>
					<?php
						}
					?>

					<div  id="delete" class="number-button unused ok"></div>

					<div  id="number-0" class="number-button"> 						
						<p class="light-shadow">0</p>						
					</div>
					<div  id="nobody" class="number-button"> 						
						<p class="light-shadow">I have<br />no<br />idea</p>						
					</div>
							
										
				
				
					
				</div>
				<div id="player-name" class="clearfix">
					
					<div id="player-number" class="number-digit"> </div>
				</div>

				

			</section> -->
			
	
			<footer>
				<div id="background-clock">
					<p id="clock-label">CLOCK TIME</p>
					<p id="big-time">50:00</p>
					<p id="period-number">2</p>
					<p id="period-title">PERIOD</p>
				</div>
				<div id="timeline">
					<h2>GOALS SCORED</h2>
					<div id="first-half" class="half-box">
						<p>FIRST HALF</p>
					</div>
					<div id="second-half" class="half-box">
						<p>SECOND HALF</p>
					</div>
					<div id="goal-bars">
						<div id="goal-bar-clone-1" class="goal-bar team-1-bg"></div>
						<div id="goal-bar-clone-2" class="goal-bar team-2-bg"></div>
					</div>
					<div id="gray-box-left" class="gray-box"></div>
					<div id="gray-box-right" class="gray-box"></div>
					<div id="slider-left" class="slider">
						<p class="slider-time"><span class="time">0:00</span><!--  <span class="which-half" id="which-half-left">(1st HALF)</span> --></p>
					</div>
					<div id="slider-right" class="slider">
						<p class="slider-time"><span class="time">50:00</span> <!-- <span class="which-half" id="which-half-right">(2nd HALF)</span> --></p>
					</div>
				</div>
			</footer>
		</div>
	
	
	</body>
</html>
