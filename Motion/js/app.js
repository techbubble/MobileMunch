function MotionMunch(io){

   // All settings used in the game
    var SETTINGS = {
        imagePath: 'img/',
        bgColor: '#5e3f6b',			// You can find background color codes here: http://tinyurl.com/style-color
        bgSpeed: 10,
        bgDensity: io.canvas.width / 20,
        bgImages: ['starSmall', 'starBig', 'nebula'],   // You can resize your images here: http://www.picresize.com/
        playerImages: ['player'],
        targets: [ 
            {
                image: 'target1',
                vibrate: false,
                points: 100
        	},
            {
                image: 'target2',
                vibrate: true,
                points: 50
        	},
            {
                image: 'target3',
                vibrate: false,
                points: 10
        	},
            {
                image: 'target4',
                vibrate: false,
                points: 10
        	}
        ],
        targetDensity: Math.round( io.canvas.width / 200),
        playerStartX: io.canvas.center.x,
        playerStartY: io.canvas.center.y,
        gameDuration: 60
    };
    
    // Background
    (function(){
        
        io.setBGColor(SETTINGS.bgColor);

        // Add background images to screen
        for (var i = 0; i < SETTINGS.bgImages.length; i++) {
            var bgItem = new Image();
            bgItem.tag = SETTINGS.bgImages[i];
            bgItem.zIndex = -20 + (i * 5); // Smaller items are closer to top
            bgItem.velocity = SETTINGS.bgSpeed + (i * .2);
            bgItem.onload = function() {
                createBgItem(this);
            };
            
            // Always specify the "src" property last otherwise
            // the "onload" code will not run
            bgItem.src = SETTINGS.imagePath + 'bg/' + SETTINGS.bgImages[i] + '.png';
            
        };
        

        // Creates a scrolling background item
        function createBgItem(item) {
            for (var j=0; j < SETTINGS.bgDensity; j++)
            {
                if (iio.getRandomNum() < 0.4) {      		// Get a random number
                        io.addToGroup(
                        				item.tag, 			    
                                  		new iio.SimpleRect(       // Add a rectangle into which the BG item will be loaded
                                      						iio.getRandomInt(10, io.canvas.width-10),
                                      						iio.getRandomInt(0, io.canvas.height)
                                  		),
                                  		item.zIndex)
                       .createWithImage(item)
                       .enableKinematics()
                       .setVel(0, item.velocity)
                       .setBound('bottom', io.canvas.height + 140, moveBackToTop);
                }
            }
        };
        
         
        // Moves an object to the top and off the screen
        function moveBackToTop(obj) {
            obj.setPos( iio.getRandomInt(10, io.canvas.width-10), iio.getRandomInt(-340, -100) );
            return true;
        };
        
       
    })();
    
    

    //Player
    (function(){
        
        var players = [ ]; 
        for(var p=0; p < SETTINGS.playerImages.length; p++) {            
            players.push(SETTINGS.imagePath + SETTINGS.playerImages[p] + '.png')
        }
        
        var player = io.addToGroup( 'player', 
                                    new iio.SimpleRect(io.canvas.center.x, io.canvas.center.y).createWithAnim(players,0),
                                    -1
                                  );
        
        // Get acceleration from device hardware
        navigator.accelerometer.watchAcceleration(updatePlayerPos, failure, {frequency: 16.6});

        var xPos = SETTINGS.playerStartX;
        var yPos = SETTINGS.playerStartY;
        
        function updatePlayerPos(accel) {
            
            xPos += -1 * (accel.x.toFixed(2) * 1.5);
            
            // We do not allow the player to go off the screen horizontally
            if ( (xPos - player.width/2 > 0) &&
                 (xPos + player.width/2 < io.canvas.width) ) {
                	player.pos.x = xPos;
            }

            // We do not allow the player to go off the screen vertically
            yPos += (accel.y.toFixed(2) * 1.5);
            if ( (yPos - player.height/2 > 0) &&
                 (yPos + player.height/2 < io.canvas.height) ) {                
                	player.pos.y = yPos;
            }
            
        }
                
        function failure()
        {
        }

        
    })();    
    
    
	// Targets
    (function(){

    
        var targetImages = [ ];
        for(var t = 0; t < SETTINGS.targets.length; t++) {
            var targetImage = new Image();
            targetImage.src = SETTINGS.imagePath + 'target/' + SETTINGS.targets[t].image + '.png';
            targetImage.width = 64;
            targetImage.height = 64;
            targetImages.push(targetImage);
        }
        
        window.addTargetToScene = function(index, x, y) {    
            	var targ = new iio.SimpleRect(x,y);
                targ.points = SETTINGS.targets[index].points;
            	targ.vibrate = SETTINGS.targets[index].vibrate;
            
                io.addToGroup( 'targets', targ )
                                    .enableKinematics()
                                    .setBound('bottom', io.canvas.height + 120)
                                    .createWithImage(targetImages[index])
                                    .setVel(iio.getRandomInt(-2,2), iio.getRandomInt(5,7))
                                    .setTorque(iio.getRandomNum(-0.1, 0.1));
       }

    })();

    
    
    // Collisions
    (function(){
        
        io.addGroup('player');
        io.addGroup('targets');

        var flashImg = new Image();
        flashImg.src = SETTINGS.imagePath + 'flash.png';
  	    
        var onCollision = function(player, target) {
            io.addToGroup(	'flashes',
                			new iio.SimpleRect( (player.pos.x + target.pos.x)/2,
                           						(player.pos.y + target.pos.y)/2),
                          						10)
                            .createWithImage(flashImg)
                            .enableKinematics()
                            .setVel(target.vel.x, target.vel.y)
                            .shrink(0.1);

            if (target.vibrate) {
	             navigator.notification.vibrate(10);                         
            }
            
            if (window.game.active) {
	            window.game.score += target.points;
	            console.log(window.game.score, window.game.remainingTime);           
            }
            
 			io.rmvFromGroup(target, 'targets');
        };
        
        io.setCollisionCallback('player', 'targets', onCollision);

        
    })();


    var createTargets = function() {   
        
        if (iio.getRandomNum() < 0.02) {
            for (var i=0; i < SETTINGS.targetDensity; i++) {
                var x = iio.getRandomInt(30, io.canvas.width-30);
                var y = iio.getRandomInt(-800, -50);
                window.addTargetToScene(iio.getRandomInt(0, SETTINGS.targets.length),x,y);
            }
        }
    }
   
   // Setup scoring 
    window.game = {
        score: 0,
        remainingTime: 0,
        active: false
    };

    window.updateTime = function() {
        window.gameText.text = parseInt(window.game.remainingTime / 1000) + '   ' + window.game.score;
        if (window.game.remainingTime > 0) {
            window.game.remainingTime -= 500;
            if (window.game.remainingTime <= 0) {
                window.game.active = false;
            }
        }        
    }
                    
    io.canvas.addEventListener('mousedown', function(event) {
        window.game.remainingTime = SETTINGS.gameDuration * 1000;
        window.game.score = 0;
        window.game.active = true;
    });        
    
	window.setInterval(updateTime, 500)
    
    window.gameText = new iio.Text('',20,40)
                            .setFont('40px Consolas')
                            .setTextAlign('left')
                            .setFillStyle('#00baff')
	io.addObj(window.gameText);
    
    io.setFramerate(60, createTargets);
    
}



