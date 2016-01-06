#Frogger Game

The classic Frogger arcade game.

## Installing the software

* **Copy** the source code to the desired location.
* **Run** index.html in your favorite browser.

## Playing the Game
The object of the game is to get the Player from the grass to the water without encountering Enemy bugs.  The user controls the Player by using the four arrow keys on the keyboard (_up, down, right, left_).

## Scoring and Levels
One point is gained by getting the Player to the water.  The Player is automatically returned to the starting square when getting to the water or after any collision.  The level starts at zero and increments with every five points scored.  Starting with level one, special enemies (not bugs) may appear in the game that allow the user to get more points:

* key: 	 3 points ![(Figure 1)](https://github.com/gstroh/frontend-nanodegree-arcade-game/blob/master/images/Key.png?raw=true "Figure 1")
* star:  5 points ![(Figure 2)](https://github.com/gstroh/frontend-nanodegree-arcade-game/blob/master/images/Star.png?raw=true "Figure 2")
* heart: 7 points ![(Figure 3)](https://github.com/gstroh/frontend-nanodegree-arcade-game/blob/master/images/Heart.png?raw=true "Figure 3")

When colliding with these special enemies, the user gains points instead of reseting the game score to zero and starting over.  As the levels increase, the number of enemies and their speed increase.

## History
To read more about the history of the Frogger arcade game, click [here](https://en.wikipedia.org/wiki/Frogger).

## License
No license required.
