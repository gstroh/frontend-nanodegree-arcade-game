// Constants
var ROW_WIDTH = 101,
    ROW_HEIGHT = 83;
// Enemy class.
// Enemies our player must avoid.
var Enemy = function(x, y, speed, spriteName) {
    // location
    this.x = x;
    this.y = y;
    // speed
    this.speed = speed;
    // Image/sprite for enemy.
    //this.sprite = 'images/enemy-bug.png';
    this.spriteType = spriteName;
    this.sprite = this.getSprite(spriteName);
};
// Set some Enemy constants in the prototype object
// since it only has one instance.
// Width & height of each enemy square in game.
Enemy.prototype.WIDTH = ROW_WIDTH;
Enemy.prototype.HEIGHT = ROW_HEIGHT;
// Number of vertical and horizontal squares in game.
Enemy.prototype.VERTSQUARES = 6;
Enemy.prototype.HORIZSQUARES = 5;
// Offset enemy image to align correctly in game.
Enemy.prototype.OFFSET = -20;

// The enemy sprite can be one of many.
Enemy.prototype.getSprite = function(spriteName) {
    var returnSprite = '';
    if (spriteName == 'enemy') {
        returnSprite = 'images/enemy-bug.png';
    }
    if (spriteName == 'heart') {
        returnSprite = 'images/Heart.png';
    }
    if (spriteName == 'key') {
        returnSprite = 'images/Key.png';
    }
    if (spriteName == 'star') {
        returnSprite = 'images/Star.png';
    }
    return returnSprite;
};
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
    if (this.x >= this.WIDTH * this.HORIZSQUARES) {
        this.x = 0;
    }
};

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
        var maxX = Math.max(this.x + this.WIDTH, player.x + player.WIDTH);

        if ((maxX - minX) < (this.WIDTH * 2) - 1) {
            if (this.spriteType == 'enemy') {
                // enemy collision
                console.log('enemy collision');
                player.x = player.WIDTH * 2;
                player.y = (player.HEIGHT * player.HORIZSQUARES) + player.OFFSET;
                score = 0;
                displayScoreBoard();
            } else {
                // special collision
                console.log('special collision');
                player.x = player.WIDTH * 2;
                player.y = (player.HEIGHT * player.HORIZSQUARES) + player.OFFSET;
                // incement the score based on the special sprite.
                if (this.spriteType == 'key') {
                    score = score + 3;
                } else if (this.spriteType == 'heart') {
                    score = score + 7;
                } else if (this.spriteType == 'star') {
                    score = score + 5;
                }
                displayScoreBoard();
            }
        }
    }
};

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLayer class.
var Player = function(x, y) {
    // location
    this.x = x;
    this.y = y;
};

// Set some Player constants in the prototype object
// since it only has one instance.
// Width & height of each player square in game.
Player.prototype.WIDTH = ROW_WIDTH;
Player.prototype.HEIGHT = ROW_HEIGHT;
// Number of vertical and horizontal squares in game.
Player.prototype.VERTSQUARES = 6;
Player.prototype.HORIZSQUARES = 5;
// Offset player image to align correctly in game.
Player.prototype.OFFSET = -10;
// Image/sprite.
Player.prototype.sprite = 'images/char-boy.png';
// There is no need for this function since the player positiion
// is controlled by user input.
Player.prototype.update = function(dt) {};

// Draw the player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player is controlled by user input.  This function handles that input.
Player.prototype.handleInput = function(keyName) {
    console.log(keyName);
    // Handle player input keys.
    if (keyName == "left") {
        this.x = this.x - this.WIDTH;
    } else if (keyName == "right") {
        this.x = this.x + this.WIDTH;
    } else if (keyName == "up") {
        this.y = this.y - this.HEIGHT;
    } else if (keyName == "down") {
        this.y = this.y + this.HEIGHT;
    }
    // Check to see if the player has reached a boundary
    // or won the game.
    //Player.prototype.checkBoundaries();
    this.checkBoundaries();
};

// Check to see if the player has reached a boundary or won the game.
Player.prototype.checkBoundaries = function() {
    // Check the player boundaries.
    if (this.x >= this.HORIZSQUARES * this.WIDTH) {
        this.x = (this.HORIZSQUARES - 1) * this.WIDTH;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y >= (this.VERTSQUARES - 1) * this.HEIGHT) {
        this.y = ((this.VERTSQUARES - 1) * this.HEIGHT) + this.OFFSET;
    }
    if (this.y < 0) {
        this.y = this.OFFSET;
    }
    // Check to see if player has won the game.
    if (this.y < 0) {
        console.log('You won!!!');
        // Move the player to the starting position.
        this.x = this.WIDTH * 2;
        this.y = (this.HEIGHT * this.HORIZSQUARES) + this.OFFSET;
        // Increment the score and display it.
        score = ++score;
        displayScoreBoard();
    }
};

// Set the initial values for score and difficulty level.
var score = 0;
var difficultyLevel = 0;

// Display the score and difficulty level.
var displayScoreBoard = function() {
    var oldDifficultyLevel = difficultyLevel;
    // Update difficultyLevel if needed.
    difficultyLevel = Math.floor(score / 5.0);
    // Create new enemies if difficulty level has increased.
    if (oldDifficultyLevel != difficultyLevel) {
        allocateEnemies();
    }
    // Score board text.
    var scoreText = 'Score ' + score + ', Level ' + difficultyLevel;
    ctx.font = "20px Georgia";
    // Must fill background with white rectangle to clear text on each change.
    ctx.fillStyle = "white";
    ctx.fillRect(180, 0, 200, 100);
    // Now, can display score board text on a clean white background.
    ctx.fillStyle = "black";
    ctx.fillText(scoreText, 180, 25);
};

// Create function to allocate enemies.
var allocateEnemies = function() {
    // Reset allEnemies.
    allEnemies.length = 0;
    // Set variables.
    var numEnemies = 3 + difficultyLevel + 1;
    var rowEnemy = 1;
    // Allocate enemies based on difficulty level.
    for (var i = 0; i <= numEnemies - 1; i++) {
        var speedEnemy = 40 + (Math.random() * (difficultyLevel + 1) * 10.0);
        var yEnemy = (Enemy.prototype.HEIGHT * rowEnemy) + Enemy.prototype.OFFSET;
        // Set the sprite to enemy, unless otherwise to spice things up!!
        var spriteName = 'enemy';
        var difficultyRandom = Math.random();
        // Set special sprite by random generated number.
        if (difficultyLevel > 0 && difficultyRandom > 0.7) {
            spriteName = 'key';
            if (difficultyRandom > 0.8) {
                spriteName = 'heart';
            }
            if (difficultyRandom > 0.9) {
                spriteName = 'star';
            }
        }
        var enemy = new Enemy(0, yEnemy, speedEnemy, spriteName);
        // Put the new enemy in the allEnemies array.
        allEnemies.push(enemy);
        // Recycle enemy rows between 1 and 3.
        rowEnemy = ++rowEnemy;
        if (rowEnemy > 3) {
            rowEnemy = 1;
        }
    }
};

// Instantiate game objects.
// Place the player object in a variable called player.
var player = new Player(Player.prototype.WIDTH * 2, (Player.prototype.HEIGHT * 5) + Player.prototype.OFFSET);
// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
allocateEnemies();
//displayScoreBoard(score, difficultyLevel);

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