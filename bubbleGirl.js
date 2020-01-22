var canvas = document.querySelector('canvas'); //searches the html document for an element called 'canvas'

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = 900;
canvas.height = 750;

//c stands for context. within c we are creating a "super object" where we can draw 2d objects that can be manipulated in a 2d space.
var c = canvas.getContext('2d'); 

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50; //max radius the circle can grow to
//var minRadius = Math.random() * 10; //min radius the circle will shrink to
//var minRadius = 10; //min radius the circle will shrink to


var colorArray = [
    'rgba(60, 127, 200, 0.5)',
    'rgba(62, 60, 200, 0.5)',
    'rgba(60, 197, 200, 0.5)',
    'rgba(60, 100, 62, 0.5)',
    'rgba(132, 60, 200, 0.5)',
];

console.log(colorArray.length);

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x; //x coordinate of user's mouse
    mouse.y = event.y; //y coordinate of user's mouse
})

// Respawns the circles when the window is resized
window.addEventListener('resize', function()
    {
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;
        canvas.width = 900;
        canvas.height = 750;

        init();
})

function Circle(x, y, dx, dy, radius) { //capital letter indicates object
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.width = canvas.width;
    this.height = canvas.height;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.strokeStyle = 'rgba(245, 126, 166, 1)';
        c.fill();
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > this.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > this.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
           
        } 
        
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    
        this.draw();
    }

}

//stores all of the circles in one variable
var circleArray = [];

function init() {

    circleArray = [];

    for (var i = 0; i < 150; i++) {
        //var radius = 30;
        var radius = Math.floor(Math.random()*10) * 3 + 1; //randomize the size of the bubbles at the start
        //var x = Math.random() * (innerWidth - radius * 2) + radius; //random x spawn point- from when width was entire window
        //var y = Math.random() * (innerHeight - radius * 2) + radius; //random y spawn point- from when height was entire window
        //var x = Math.random() * (canvas.width - radius * 2) + radius; //random x spawn point
        //var y = Math.random() * (canvas.height - radius * 2) + radius; //random y spawn point
        var x = 300; //places x spawn location at/near bubble wand
        var y = 250; //places the y spawn location at/near bubble wand
        //var dx = (Math.random() - 0.5) * 2; //standard variable for x velocity- allows for negatives
        var dy = (Math.random() - 0.5) * 2; //standard variable for y velocity- allows for negatives
        var dx = (Math.random()) * 3; //standard variable for x velocity
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
} 

function animate() {
    requestAnimationFrame(animate); //creates a loop for us that redraws whatever is in this function over and over
    c.clearRect(0, 0, canvas.width, canvas.height); //clears the circle after each loop

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();

animate();