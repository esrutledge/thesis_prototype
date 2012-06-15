<?php

	// $m = new Mongo("mongodb://admin:gametime@ds029317.mongolab.com:29317/gametime");
	$m = new Mongo("mongodb://esrutledge_thesis:gametim3@ds031117.mongolab.com:31117/appfog_230b6240ee8c_c4ed2d466d81");
	
	// select a database
	// $db = $m->gametime;
	$db = $m->appfog_230b6240ee8c_c4ed2d466d81;
		
	// select a collection (analogous to a relational database's table)


	$collection = $db->game_data;
	$gamesCollection = $db->games;
	

	if(isset($_GET["game"])) {
		$collection = $db->$_GET["game"];
	}
	
		
	// add a record
/*
	$obj = array( "time" => 167, "stat_type" => "GB" );
	$collection->insert($obj);
*/
	$jsonData = json_encode($_GET);
	
	echo $jsonData;
	
	
	// add another record, with a different "shape"
	$obj = $_GET;
	
	$obj['clockTime'] = (int) $obj['clockTime'];
	$obj['timeStamp'] = (int) $obj['timeStamp'];
	$obj['fieldPos']['xPos'] = (int) $obj['fieldPos']['xPos'];
	$obj['fieldPos']['yPos'] = (int) $obj['fieldPos']['yPos'];
	$obj['playerNum'] = (int) $obj['playerNum'];
	$obj['clockTime'] = (int) $obj['clockTime'];
	
	
	
	
	
	$collection->insert($obj);
	
	

	
	/*
$jsonUpdate = '{
		"currentStatTotals" :
			{ "' . $_GET["stat_type"]. '" : 
				{
				"' . $_GET["whichTeam"] . '" : "' . $_GET["currentValue"] . '"
				}
			}
		
	}';
	$jsonQuery = '{
		"currentStatTotals" : {"type" : "' . $_GET["stat_type"].'"}
	}';
	
	$gamesCollection->update(
								json_decode($jsonQuery),
								json_decode($jsonUpdate)
							);
*/
	
	// find everything in the collection
	/*
$cursor = $collection->find( array("type"=> $_GET["stat_type"]));
	$cursorArray = iterator_to_array($cursor);
	
	foreach($cursorArray as $obj){
		$statsArray = $obj["currentStatTotals"];
	}
	
	$statsArray[];
*/

	
	// iterate through the results
	/*
foreach ($cursor as $obj) {
		    echo $obj['stat_type'] . ": " . $obj["time"] . "\n";
	}
*/

//	echo $cursor;

?>