// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 510){
      //move enemy by using starting location and speed * delta time
      this.x += this.speed * dt;
    }
    else {
      //reset enemy
      this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
  constructor(){
      this.resetX = 200;
      this.resetY = 385;
      this.x = 200;
      this.y = 385;
      this.sprite = 'images/char-boy.png';
  }

  //draw player to screen
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //update
  update(){
    //this will check if player collided with enemy objects
    for(let enemy of allEnemies){
      //if player collided take life away
      if (this.y === enemy.y && this.x > enemy.x && this.x < enemy.x + 25){
      this.reset();
      }
  }
}

  reset(){
    this.y = this.resetY;
    this.x = this.resetX;
  }

  handleInput(input){
    switch(input){
      case 'left':
        if (this.x > 0) {
          this.x -= 105;
        }
        break;
      case 'up':
        if (this.y > 0){
        this.y -= 80;
       }
        break;
      case 'right':
        if (this.x < 400) {
        this.x += 105;
        }
        break;
      case 'down':
        if (this.y < 350){
        this.y += 80;
       }
        break;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemy1 = new Enemy(-100, 60, 300);
const enemy2 = new Enemy(-100, 145, 275);
const enemy3 = new Enemy(-250, 225, 200);
const enemy4 = new Enemy(-250, 145, 215);
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

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
