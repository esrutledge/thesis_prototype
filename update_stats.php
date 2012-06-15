<?php

	// $m = new Mongo("mongodb://admin:gametime@ds029317.mongolab.com:29317/gametime");
	$m = new Mongo("mongodb://esrutledge_thesis:gametim3@ds031117.mongolab.com:31117/appfog_230b6240ee8c_c4ed2d466d81");
		
	// select a database
	// $db = $m->gametime;
	$db = $m->appfog_230b6240ee8c_c4ed2d466d81;
		
	// select a collection (analogous to a relational database's table)
	$collection = $db->game_data;
	// $gamesCollection = $db->games;
	
	if(isset($_GET["game"])) {
		$collection = $db->$_GET["game"];
	}
	
	
	$query = array( "clockTime" => array( "\$gt" => 31, "\$lte" => 300 ));
	
	$cursor = $collection->find();
	
	if(isset($_GET["check"])){
		$cursor = $collection->find()->sort(array('ts'=>-1))->limit(1);
	}
	else {
		echo json_encode(iterator_to_array($cursor));
	}


	


?>