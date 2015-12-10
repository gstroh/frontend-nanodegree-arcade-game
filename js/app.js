// Enemy class.
// Enemies our player must avoid.
var Enemy = function(x, y, speed) {
    // location
    this.x = x;
    this.y = y;
    // speed
    this.speed = speed;
};
// Set some Enemy constants in the prototype object
// since it only has one instance.
// Width & height of each enemy square in game.
Enemy.prototype.width = 101;
Enemy.prototype.height = 83;
// Number of vertical and horizontal squares in game.
Enemy.prototype.vertSquares = 6;
Enemy.prototype.horizSquares = 5;
// Offset enemy image to align correctly in game.
Enemy.prototype.offset = -20;
// Image/sprite for enemy.
Enemy.prototype.sprite = 'images/enemy-bug.png';

// Update the enemy's position, required method for game.
// Parameter: dt, a time delta between ticks.
// When position updated, check for right boundary and collisions.
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    // Check to see if off screen.
    this.checkRightBoundary();
    // Check for collision with Player.
    this.checkCollision();
};

// Check to see if the enemy has gone off the right boundary of the screen.
// If it has, reset to left side of screen.
Enemy.prototype.checkRightBoundary = function() {
    if (this.x >= this.width * this.horizSquares) {
        this.x = 0;
    }
}

// Check to see if enemy has collided with player.
// If it has, reset player to initial position.
Enemy.prototype.checkCollision = function() {
    // Check if the y axis has collided.
    if (this.y + 20 == player.y + 10) {
        console.log('y collision');
        // Check if the x axis has collided too!
        // If the difference between the enemy & player min and max
        // x coordinates is less than two image widths, a collision
        // has occured.
        var minX = Math.min(this.x, player.x);
        var maxX = Math.max(this.x + this.width, player.x + player.width);
        //console.log('minX = ' + minX);
        //console.log('maxX = ' + maxX);
        if ((maxX - minX) < (this.width * 2) - 1) {
            console.log('collision');
            player.x = player.width * 2;
            player.y = (player.height * player.horizSquares) + player.offset;
        }
    }
}

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLayer class.
var Player = function(x, y) {
    // location
    this.x = x;
    this.y = y;
    // image/sprite
    this.sprite = 'images/char-boy.png';
};

// Set some Player constants in the prototype object
// since it only has one instance.
// Width & height of each player square in game.
Player.prototype.width = 101;
Player.prototype.height = 83;
// Number of vertical and horizontal squares in game.
Player.prototype.vertSquares = 6;
Player.prototype.horizSquares = 5;
// Offset player image to align correctly in game.
Player.prototype.offset = -10;

// There is no need for this function since the player positiion
// is controlled by user input.
Player.prototype.update = function(dt) {};

// Draw the player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyName) {
    console.log(keyName);
    // Handle player input keys.
    if (keyName == "left") {
        player.x = player.x - player.width;
    }
    if (keyName == "right") {
        player.x = player.x + player.width;
    }
    if (keyName == "up") {
        player.y = player.y - player.height;
    }
    if (keyName == "down") {
        player.y = player.y + player.height;
    }
    // Check to see if the player has reached a boundary
    // or won the game.
    Player.prototype.checkBoundaries();
};

// Check to see if the player has reached a boundary or won the game.
Player.prototype.checkBoundaries = function() {
    // Check the player boundaries.
    if (player.x >= player.horizSquares * player.width) {
        player.x = (player.horizSquares - 1) * player.width;
    }
    if (player.x < 0) {
        player.x = 0
    }
    if (player.y >= (player.vertSquares - 1) * player.height) {
        player.y = ((player.vertSquares - 1) * player.height) + player.offset;
    }
    if (player.y < 0) {
        player.y = player.offset;
    }
    //console.log('x = ' + player.x);
    //console.log('y = ' + player.y);
    // Check to see if player has won the game.
    if (player.y < 0) {
        console.log('You won!!!');
        player.x = player.width * 2;
        player.y = (player.height * player.horizSquares) + player.offset;
    }
}

// Instantiate game objects.
// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
allEnemies[0] = new Enemy(0, (83 * 1) - 20, 50);
allEnemies[2] = new Enemy(0, (83 * 2) - 20, 60);
allEnemies[3] = new Enemy(0, (83 * 2) - 20, 80);
allEnemies[4] = new Enemy(0, (83 * 3) - 20, 40);
allEnemies[5] = new Enemy(0, (83 * 3) - 20, 70);
allEnemies[6] = new Enemy(0, (83 * 3) - 20, 85);
// Place the player object in a variable called player.
var player = new Player(101 * 2, (83 * 5) - 10);
// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // Process user input to move player.
    player.handleInput(allowedKeys[e.keyCode]);
});