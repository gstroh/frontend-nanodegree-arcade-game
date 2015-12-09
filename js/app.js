// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // location
    this.x = x;
    this.y = y;
    // speed
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    // check to see if off screen
    Enemy.prototype.checkRightBoundary(this);
    // check for collision with Player.
    Enemy.prototype.checkCollision(this);
};

Enemy.prototype.checkRightBoundary = function(enemyInstance) {
    if (enemyInstance.x >= 505) {
        enemyInstance.x = 0;
    }
}

Enemy.prototype.checkCollision = function(enemyInstance) {
    // Check if the y axis has collided.
    //console.log('enemyInstance.y = ' + enemyInstance.y)
    //console.log('player.y = ' + player.y)
    if (enemyInstance.y + 20 == player.y + 10) {
        console.log('y collision');
        // check if the x axis has collided too!
        var minX = Math.min(enemyInstance.x, player.x);
        var maxX = Math.max(enemyInstance.x + 101, player.x + 101);
        console.log('minX = ' + minX);
        console.log('maxX = ' + maxX);
        if ((maxX - minX) < (101 * 2) - 1) {
            console.log('collision');
            player.x = 101 * 2;
            player.y = (83 * 5) - 10;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    // location
    this.x = x;
    this.y = y;
    // sprite
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 83;
    this.vertSquares = 6;
    this.horizSquares = 5;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyName) {
    console.log(keyName);

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

    Player.prototype.checkBoundaries();
};

Player.prototype.checkBoundaries = function() {
    if (player.x >= player.horizSquares * player.width) {
        player.x = (player.horizSquares - 1) * player.width;
    }
    if (player.x < 0) {
        player.x = 0
    }
    if (player.y >= (player.vertSquares - 1) * player.height) {
        player.y = ((player.vertSquares - 1) * player.height) - 10;
    }
    if (player.y < 0) {
        player.y = -10;
    }
    console.log('x = ' + player.x);
    console.log('y = ' + player.y);
    // check to see if player has won the game.
    if (player.y < 0) {
        console.log('You won!!!');
        player.x = 101 * 2;
        player.y = (83 * 5) - 10;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(0, (83 * 1) - 20, 50);
allEnemies[2] = new Enemy(0, (83 * 2) - 20, 60);
allEnemies[3] = new Enemy(0, (83 * 2) - 20, 80);
allEnemies[4] = new Enemy(0, (83 * 3) - 20, 40);
allEnemies[5] = new Enemy(0, (83 * 3) - 20, 70);
allEnemies[6] = new Enemy(0, (83 * 3) - 20, 85);

var player = new Player(101 * 2, (83 * 5) - 10);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
