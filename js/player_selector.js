$(document).ready(function(){

	var names = {
		"22" : "Liz Rutledge",
		"18" : "Liza Stark",
		"23" : "Jess Bromall"
	};

	$('.number-button').click(function(e) {
		var numClicked = $(e.target).closest('.number-button').attr('id').split('-')[1];
		console.log(numClicked);
		console.log($('#number-digit-1').html());
		
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
				
				console.log(findPlayerName(num));
				$('#player-name .name').html(findPlayerName(num));	
			}
		}
	});





	$('#delete').click(function(e) {
			if($('#number-digit-2').html() != " ") {
				$('#number-digit-2').html(" ");		
				$('#number-digit-2').removeClass('ready');		
				$('#ok-button').removeClass('ready');	
				$('#player-name .name').html(' ');	

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
		if($('#ok-button').hasClass('ready')){
			//then also UPDATE THE DATABASE
			$.get("update_db.php", 
				{ 
					clockTime : seconds + 60*minutes,
					timeStamp : getTimeStamp(),
	//				fieldPos : { xPos: x, yPos : y },
					team: whichTeam,
					type: whichStat
				},
			   function(data){
			     alert("Data Loaded: " + data);
			});
		}
	}

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

});