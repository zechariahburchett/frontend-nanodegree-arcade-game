//player lives
let lives = 3;

let score = 0;

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
      this.speed = Math.floor(Math.random() * 225 + 150);
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
      lives--;
      //console.log(lives);
      if (lives === 0){
        alert('You Lose!')
        lives = 3;
      }
      }
      //if player makes it to river add point
      if (this.y === -15){
        score++;
        //console.log(score);
        this.reset();
        //win condition
        if (score === 10){
          alert('You Win!');
          score = 0;
          lives = 3;
        }
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
// x = 2, y = 10
const player = new Player();
const enemy1 = new Enemy(-100, 65, Math.floor(Math.random() * 299 + 150));
const enemy2 = new Enemy(-100, 145, Math.floor(Math.random() * 299 + 150));
const enemy3 = new Enemy(-250, 225, Math.floor(Math.random() * 299 + 150));
const enemy4 = new Enemy(-250, 145, Math.floor(Math.random() * 299 + 150));
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left', //left arrow
        65: 'left', //a
        38: 'up', //up arrow
        87: 'up', //w
        39: 'right', //right arrow
        68: 'right', //d
        40: 'down', //down arrow
        83: 'down' //s
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
