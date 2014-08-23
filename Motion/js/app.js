            var watch = 0;
            var context;
            var target;
            var xPos;
            var yPos;
            var canvas;

            var onDeviceReady = function() {
                navigator.splashscreen.hide(); 
                
                /* Get screen size */
                var iW = window.innerWidth;
                var iH = window.innerHeight;

                /* Canvas code goes below this line */

                
                /* Image code goes below this line */

                
                /* Accelerometer code goes below this line */

                
            };
            
            document.addEventListener('deviceready', onDeviceReady);


            function success(accel)
            {
                /* Success code goes here */


            }

            function failure()
            {
                alert("Error");
            }