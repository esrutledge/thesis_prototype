<!DOCTYPE html>

<html>
	<head>
		<title>dataCoach || scoresheet</title>
		<link href='http://fonts.googleapis.com/css?family=Nunito:300,400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/styles.2.css" />
		<link rel="stylesheet" media="only screen and (max-device-width: 1024px)" href="css/ipad.css" type="text/css" />
	    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		
		<script type="text/javascript" charset="utf-8" src="js/scorekeeper_main.3.js" /> </script>
		<script type="text/javascript" charset="utf-8" src="js/clock.js" /> </script>
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
	<body ontouchmove="BlockMove(event);">

		
		<div id="wrapper">
			
			
		 
			<div id="gray-out">
				
				
				
			</div>
			
			
					
					
			<header>	
			</header>
				
			<section id="field-wrapper" class="deep-shadow">
				
				<div id="teamsRibbon">
					<div id="team-1-ribbon" class="team-ribbon team-1-bg deep-shadow"><h2>Home</h2></div>
						<div id="team-1-ribbon-fold" class="team-1 ribbon-fold"></div>
						<div id="team-1-ribbon-fold-bg" class="ribbon-fold"></div>
					<div id="team-2-ribbon" class="team-ribbon team-2-bg  deep-shadow"><h2>Away</h2></div>
						<div id="team-2-ribbon-fold" class="team-2 ribbon-fold"></div>
						<div id="team-2-ribbon-fold-bg" class="ribbon-fold"></div>
					<div id="vs-medallion"><img src="../images/vs.png" /></div>
				</div>	

				
				<section id="field" class="deep-shadow">
						
				</section>
				
				<section id="icon-bank" class="clearfix">
					<div class="icon-category hustle">
						<h3>HUSTLE PLAYS</h3>
						<div class="icon-box light-inner-shadow">
							<div class="stat-icon-box covered clearfix" id="ground-ball-box">
								<div class="stat-icon draggable" id="ground-ball" ></div>	
								<p>ground ball</p>
							</div>
							<div class="stat-icon-box covered clearfix" id="interception-box">	
								<div class="stat-icon draggable" id="interception"></div>
								<p>interception</p>
							</div>
							
						</div>
					</div>
					
				<!-- 	<div class="icon-category whistle">
						<h3>REF</h3>
						<div class="icon-box light-inner-shadow">
							
						</div>
					</div> -->
					
					<div class="icon-category shots">
						<h3>SHOTS ON GOAL</h3>
						<div class="icon-box light-inner-shadow">
							<div class="stat-icon-box covered clearfix" id="goal-box">
								<div class="stat-icon draggable" id="goal"></div>
								<p>goal</p>
							</div>
							<div class="stat-icon-box covered clearfix" id="shot-attempt-box">	
								<div class="stat-icon draggable" id="shot-attempt"></div>
								<p>missed</p>
							</div>
						</div>
					</div>
					
					<div class="icon-category defensive">
						<h3>REFEREE CALLS</h3>
						<div class="icon-box light-inner-shadow">
							
							<div class="stat-icon-box covered clearfix" id="whistle-box">		
								<div class="stat-icon draggable" id="foul"></div>
								<p>fouls</p>
							</div>
							<div class="stat-icon-box covered clearfix" id="penalty-box">
								<div class="stat-icon draggable" id="penalty"></div>
								<p>penalties</p>
							</div>
						</div>
					</div>
					
					
					
				</section>
			</section>
				 
				
				<section id="scores-and-clock">
					<div id="scoretable">
					</div>
				
					<div id="game-clock" class="clock-stopped mid-shadow">
						<div id="display-block">
							<div class="number-space" id="time1">0</div>
							<div class="number-space" id="time2">0</div>
							<div class="number-space" id="timecolon">:</div>	
							<div class="number-space" id="time3">0</div>			
							<div class="number-space" id="time4">0</div>
						</div>
						<h4 id="which-half">FIRST HALF</h4>
					</div>
			
			
					<section class="team-score-area team-1">
						<div class="scoreboard mid-shadow">
							<div class="score-card-container">
								<div id="score1-1" class="score-card team-1">
									<p>0</p>
									<div class="score-rings"></div>
								</div>
								<div id="score1-2" class="score-card team-1">
									<p>0</p>
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
									<p>0</p>
									<div class="score-rings"></div>
								</div>
								<div id="score2-2" class="score-card team-2">
									<p>0</p>
									<div class="score-rings"></div>
								</div>
							</div>
							
							<div id="score-stand-right"></div>
						</div>
					</section>
			</section>

				
		
			<section id="click-to-start" >
				<p>CLOCK PAUSED</p>
			</section>
			

			<section id="stat-popup">
				<div id="cancel">cancel <span class="button">X</span></div>
				
				<div id="stat-popup-main" class="rounded-corners-16 deep-shadow">
					<div class="deep-inner-shadow">
						<h2>What kind of goal?</h2>
						<div class="option-container option-1">	
							<img id="no-assist" class="stat-option-icon  option-1" src="images/scorekeeping/no-assist.png" />
						</div>	
						<div class="option-container option-2">
							<img id="assist" class="stat-option-icon option-2" src="images/scorekeeping/assisted.png" />
						</div>	
						<p></p>
					</div>
				</div>
			</section>
						
			<section id="stat-popup-horizontal">
				<div class="team-select team-1"></div>
				<div class="team-select team-2"></div>
			</section>		
			
			<section id="player-selector" class="deep-shadow" >
				<h2>Which player?</h2>
				<div id="submit-buttons" class="clearfix">
					<div  id="ok-team-1" class="ok-button button ok  team-1-bg rounded-corners-10 deep-shadow">OK</div>
					<div  id="ok-team-2" class="ok-button button ok  team-2-bg rounded-corners-10 deep-shadow">OK</div>															
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

			</section>
			 	<?php for($i = 0; $i < 2; $i++):?>
					<div class="team-counter-area team-<?php echo ($i+1); ?> clearfix">
				 		<?php foreach($buttons as $key => $button): ?>
					 		<div class="stat-counter" id="<?php echo str_replace(' ', '-', strtolower($button)).'_'.($i + 1); ?>">
								<div class="stat-counter-element bgQuickEaseIn">
						 			<div class="counter-button up-button"></div>
						 			<p class="current-count">0</p>
						 			<div class="counter-button down-button"></div>
								</div>		 		
								<div class="stat-counter-label">
									<p><?php echo $button; ?></p>
								</div>
					 		</div>
				 		<?php endforeach; ?> 
			 		</div>
			 	<?php endfor; ?>		 		
		 		
		 	</section>
	
			<footer>
				<div id="clock-start-button" class="clock-stopped">
				</div>
				<div id="edit-time">
					<p>Edit Clock Time</p>
					<form id="clockForm">
						<input type="tel" id="edited-value" value="00:00"/>
						Half:
						<select id="whichHalfDropdown">
							<option id="option-1">1</option>
							<option id="option-1">2</option>
						</select>
						<input type="submit" id="submit-new-time"/>
					</form>
				</div>
			</footer>
		</div>
	
	
	</body>
</html>
