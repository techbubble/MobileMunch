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
                canvas = document.getElementById('myCanvas');
                context = canvas.getContext("2d");
                context.canvas.width = iW;
                context.canvas.height = iH-40;

                /* Image code goes below this line */
                target = new Image();
                target.src = "img/cordova.png";
                xPos = (iW-target.width)/2;
                yPos = (iH-target.height)/2;
                target.onload = function()
                {
                    context.drawImage(target, xPos, yPos);
                }
                
                /* Accelerometer code goes below this line */
                watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 25});
            };
            
            document.addEventListener('deviceready', onDeviceReady);


            function success(accel)
            {
                /* Success code goes here */
                document.getElementById("xOut").innerHTML = accel.x;
                document.getElementById("yOut").innerHTML = accel.y;
                document.getElementById("zOut").innerHTML = accel.z;
                context.clearRect(0, 0, canvas.width, canvas.height);
                xPos += -1*(accel.x * 1.5);
                yPos += (accel.y * 1.5);
                context.drawImage(target, xPos, yPos);                                  
            }

            function failure()
            {
                alert("Error");
            }