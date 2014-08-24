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

        

        // Creates a scrolling background item

        
         
        // Moves an object to the top and off the screen
            
       
    })();
    
    

    //Player
    (function(){
        
        // Add player
        
        // Get acceleration from device hardware

        // Update player position

        
    })();    
    
    
	// Targets
    (function(){

    	// Get target images

		// Add target to scene        

    })();

    
    
    // Collisions
    (function(){

		// Define which groups will track collisions        

        
        
        // Create image displayed on collision

        
        
        // What happens when a collision occurs?

        
    })();


    // Create targets
   
    
    // Setup scoring 

    
    // Update game timer

    
    // Add start game handler

    
	// Setup game timer    

    
	// Setup score display text    


	// Start the game    
    
}



