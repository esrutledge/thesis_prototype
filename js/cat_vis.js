$(function() {
    
   

    
        setInterval(draw, 30);

    
    
        var canvas = document.getElementById('mainCanvas');
        var c = canvas.getContext('2d');
        var grad = c.createLinearGradient(0, 0, 200, 200);
        grad.addColorStop(0, "white");
        grad.addColorStop(1, "black");
        c.fillStyle = grad;
    //    c.fillRect(0, 0, 100, 200);
        
        var img = new Image();
        img.onload = function() {
            c.drawImage(img, 300, 200);

            var pat = c.createPattern(img, "repeat-x");
            c.fillStyle = pat;
            c.fillRect(0, 0, 600, 60);
        }
        img.src = "http://placekitten.com/100/70";
        
        
        
        
            
            
            
        
       /*
		 c.fillStyle = "#5b00ff";

        c.beginPath();
        c.moveTo(10,100);
        c.bezierCurveTo(20,200, 500,200, 500,100);
        c.lineTo(500,300);
        c.lineTo(10,300);
        c.closePath();
        c.fill();

        c.lineWidth = 4;
        c.strokeStyle = "black";
        c.stroke();
	*/
        
    /*
    var img2 = new Image();
        img2.onload = function() {
            c.drawImage(img2, 400, 150);
            c.drawImage(img2,
                100,100,130,130, //source coords
                0,300,300,300//dest coords
                );
        }
        img2.src = 'http://static4.depositphotos.com/1013907/391/v/450/dep_3915076-Burglar-Pig..jpg';
	*/

	
	var mouseX = 10;
	var mouseY = 10;

	$('#mainCanvas').mousemove(function(e) {
		mouseX = e.pageX - $(e.target).offset().left;
		mouseY = e.pageY - $(e.target).offset().top;
		drawKitten(mouseX, mouseY);
	});


	$('#mainCanvas').click(function(e) {
		mouseX = e.pageX - $(e.target).offset().left;
		mouseY = e.pageY - $(e.target).offset().top;
		
		drawKitten(mouseX, mouseY);
	});



	function draw() {
		c.clearRect(0 , 0, c.canvas.width, c.canvas.height);
		drawKittenRow();
		drawKitten(mouseX, mouseY);
	}
	

	function drawKitten(x, y) {		
		c.drawImage(img, x, y);
	}
	
	function drawKittenRow() {
		 c.drawImage(img, 300, 200);

        var pat = c.createPattern(img, "repeat-x");
        c.fillStyle = pat;
        c.fillRect(0, 0, 600, 60);
	
	}

});



