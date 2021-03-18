const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const keys = {};

let player;
let gravity;
let score;
let scoreText;
let highscore;
let highscoreText;
let gameSpeed;
let obstacles = [];

let i = 0;



document.addEventListener('keydown', event => keys[event.code] = true);
document.addEventListener('keyup', event => keys[event.code] = false);

class Player {
    constructor(x, y, width, height, t, lives) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.t = t;
        this.typeS = ['./assets/chickenYellowStanding.png'];
        this.typeR = ['./assets/chickenYellowRunning.png'];

        this.lives = lives;
        this.velocity = 0;
        this.jumpForce = 15;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }
    update() {
        // Jump
        if (keys['Space'] || keys['KeyW'] || keys['ArrowUp']) {
            this.jump();
        } else {
            this.jumpTimer = 0;
        }

        // Sneak
        if (keys['ShiftLeft'] || keys['KeyS'] || keys['ArrowDown']) {
            this.height = this.originalHeight / 2;
        } else {
            this.height = this.originalHeight;
        }


        // Gravity
        this.y += this.velocity;

        if (this.y + this.height < canvas.height) {
            this.velocity += gravity;
            this.grounded = false;
        } else {
            this.velocity = 0;
            this.grounded = true;
            this.y = canvas.height - this.height;
        }

        this.draw();
    }

    jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.velocity = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.velocity = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    draw() {
        ctx.beginPath();
        i++;
        i > 30 ? i = 0 : i;
        this.jumpTimer > 0 ? i = 20 : i;
        let image = new Image(64, 64);
        this.type = i < 15 ? image.src = this.typeS[this.t] : image.src = this.typeR[this.t];
        ctx.drawImage(image,this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.dx = -gameSpeed;
    }

    update() {
        this.x += this.dx;
        this.draw();
        this.dx = -gameSpeed;
    }

    draw() {
        // change to texture
        ctx.beginPath();
        ctx.fillStyle = '#2484E4';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class Text {
    constructor(text, x, y, textAlign, color, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.textAlign = textAlign;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'px monogram';
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}

function spawnObstacle() {
    // change to predefined blocks
    let size = random(20, 70);
    let type = random(0, 1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size);

    if (type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}


function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// eslint-disable-next-line no-unused-vars
function init(difficulty) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    gameSpeed = 3;
    gravity = 1;
    score = 0;
    highscore = 0;

    player = new Player(150, 0, 50, 50, 0, 3);

    scoreText = new Text(score, 25, 45, 'left', '#212121', '48');

    requestAnimationFrame(render);
}


let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function render() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;

    requestAnimationFrame(render);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    // ctx.beginPath();
    // let image = new Image(38, 16);
    // image.src = './assets/ground.png';    
    // ctx.drawImage(image, 0, canvas.height - 16, 38, 16 ); 
    // ctx.drawImage(image, 38, canvas.height - 16, 38, 16 ); 
    // ctx.closePath();

    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacle();
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        if (o.x + o.width < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < o.x + o.width &&
            player.x + player.width > o.x &&
            player.y < o.y + o.height &&
            player.y + player.height > o.y
        ) {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
        }

        o.update();
    }
    player.update();

    score++;
    scoreText.text = score;
    scoreText.draw();

    if (score > highscore) {
        highscore = score;
        highscoreText = new Text('HI: ' + highscore, score.toString().length * 35 + 150, 45, 'right', '#212121', '48');
    }

    highscoreText.draw();

    gameSpeed += 0.003;
}

init();