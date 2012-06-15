<?php



	$number = file_get_contents('number.txt'); 

	echo $number;
	
	

	if(isset($_GET["update"])) {
		// now we rewrite	
		$filename = 'number.txt';
		$somecontent = 1;
		// Let's make sure the file exists and is writable first.
		if (is_writable($filename)) {
		    // In our example we're opening $filename in append mode.
		    // The file pointer is at the bottom of the file hence
		    // that's where $somecontent will go when we fwrite() it.
		    if (!$handle = fopen($filename, 'w')) {
		//         echo "Cannot open file ($filename)";
		         exit;
		    }
		    // Write $somecontent to our opened file.
		    if (fwrite($handle, $somecontent) === FALSE) {
		//        echo "Cannot write to file ($filename)";
		        exit;
		    }
		//    echo "Success, wrote ($somecontent) to file ($filename)";
		    fclose($handle);
		} else {
		//    echo "The file $filename is not writable";
		}
	}


	if(isset($_GET["check"])) {
		// now we rewrite	
		$filename = 'number.txt';
		$somecontent = 0;
		// Let's make sure the file exists and is writable first.
		if (is_writable($filename)) {
		    // In our example we're opening $filename in append mode.
		    // The file pointer is at the bottom of the file hence
		    // that's where $somecontent will go when we fwrite() it.
		    if (!$handle = fopen($filename, 'w')) {
		//         echo "Cannot open file ($filename)";
		         exit;
		    }
		    // Write $somecontent to our opened file.
		    if (fwrite($handle, $somecontent) === FALSE) {
		//        echo "Cannot write to file ($filename)";
		        exit;
		    }
		//    echo "Success, wrote ($somecontent) to file ($filename)";
		    fclose($handle);
		} else {
		//    echo "The file $filename is not writable";
		}
	}



	
	
	
	
?>