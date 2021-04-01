import Player from './modules/player.js';
import Obstacle from './modules/obstacle.js';
import Text from './modules/text.js';
import Background from './modules/background.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let player;
let initialSpawnTimer;
let spawnTimer;
let gravity;
let music;
let musicToggle = true;
let musicButton;
let retryButton;
let score;
let scoreText;
let highscore;
let highscoreText;
let gameSpeed;
let scale;
let death;

let keys = {};
let background_image = new Image();

let obstacles = [];
let backgrounds = [];
let fox = [];
let chickenYellow = [];

window.addEventListener('resize', () => location.reload());

document.addEventListener('keydown', event => keys[event.code] = true);
document.addEventListener('keyup', event => keys[event.code] = false);
document.addEventListener('touchstart', () => keys['touch'] = true);
document.addEventListener('touchend', () => keys['touch'] = false);

canvas.addEventListener('click', (e) => {
    let clickedX = e.pageX;
    let clickedY = e.pageY;
    // console.log(`${clickedX} ${clickedY}`);
    if (canvas.width - 150 < clickedX && clickedX < canvas.width - 50 && 20 < clickedY && clickedY < 50) {
        musicToggle = !musicToggle;
        musicToggle ? music.play() : music.pause();
    }
});

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};

function spawnObstacle() {
    let obstacle = new Obstacle(canvas.width + 67, canvas.height / 1.085 - fox[0].height, 100, 64, fox, gameSpeed, canvas, context);
    obstacles.push(obstacle);
}

function spawnBackground(x) {
    let background = new Background(x, background_image, 3, scale, canvas, context);
    backgrounds.push(background);
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gameSpeed = 7;
    gravity = 1;
    score = 0;
    highscore = parseInt(window.localStorage.getItem('highscore')) ?? 0;
    initialSpawnTimer = 200;
    spawnTimer = initialSpawnTimer;
    death = false;

    player = new Player(150, canvas.height - 64, 50, 50, chickenYellow, 3, keys, gravity, canvas, context, gameSpeed);
    scoreText = new Text(score, 25, 45, 'left', '#212121', '48', context);
    musicButton = new Text('Music', canvas.width - 100, 45, 'center', '#212121', '48', context);

    retryButton = new Text('Retry', canvas.width / 2, canvas.height / 2, 'left', '#cdcdcd', 48, context, 'rgba(43, 46, 48, 0.75)');

    music = new Audio('./assets/music.wav');
    // music.play();
    music.volume = 0.1;
    music.pause();

    for (let i = 0; i <= 4; i++) {
        let img = `./assets/fox/${i}.gif`;
        let new_img = new Image();
        new_img.src = img;
        new_img.onload = () => fox.push(new_img);
    }

    for (let i = 1; i <= 2; i++) {
        let img = `./assets/chicken/chickenYellow${i}.png`;
        let new_img = new Image();
        new_img.src = img;
        new_img.onload = () => chickenYellow.push(new_img);
    }

    background_image.src = './assets/background.png';

    background_image.onload = () => {
        scale = canvas.height / background_image.height;
        spawnBackground(0);
        // console.log(canvas.width + ' ' + background_image.width*scale + ' ' + scale);
        for (let i = 0; i <= Math.floor(canvas.width / (background_image.width * scale)); i++) {
            spawnBackground(backgrounds[backgrounds.length - 1].x + backgrounds[0].width - 5);
        }

        requestAnimationFrame(render);
    };
}

function retry() {
    retryButton.draw();
    let key = document.addEventListener('keydown', e => {
        if (e.code == 'Space' || e.code == 'KeyW' || e.code == 'ArrowUp' || e.code == 'touch') {
            again();
        }
    });
    let click = canvas.addEventListener('click', e => {
        let clickedX = e.pageX;
        let clickedY = e.pageY;
        // console.log(`${clickedX} ${clickedY}`);
        if (canvas.width / 2.07 < clickedX && clickedX < canvas.width / 1.79 && canvas.height / 2.15 < clickedY && clickedY < canvas.height / 1.90) {
            again();
        }
    });
    function again() {
        obstacles = [];
        gameSpeed = 7;
        gravity = 1;
        score = 0;
        initialSpawnTimer = 200;
        spawnTimer = initialSpawnTimer;
        death = false;
        requestAnimationFrame(render);
    }
    canvas.removeEventListener('keydown', key);
    canvas.removeEventListener('click', click);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    for (let i = 0; i < backgrounds.length; i++) {
        let b = backgrounds[i];
        b.gameSpeed = gameSpeed;
        b.scale = scale;
        if (b.x + b.width < 0) {
            b.x = i - 1 < 0 ? backgrounds[backgrounds.length - 1].x + b.width - 5 : backgrounds[i - 1].x + b.width - 5;
        }
        b.update();
    }

    // Spawn Enemies
    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacle();
        spawnTimer = initialSpawnTimer - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];
        o.gameSpeed = gameSpeed;
        if (o.x + o.width < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < o.x + o.width &&
            player.x + player.width > o.x &&
            player.y < o.y + o.height &&
            player.y + player.height > o.y
        ) {
            // obstacles = [];
            // score = 0;
            // spawnTimer = initialSpawnTimer;
            // gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
            death = true;
            // init();
            // break;
        }

        o.update();
    }

    // Player update
    player.gameSpeed = gameSpeed;
    player.update();

    // Score update
    score++;
    scoreText.text = score;
    scoreText.draw();

    // Highscore update
    if (score > highscore) highscore = score;
    highscoreText = new Text('HI: ' + highscore, (score.toString().length * 10) + 75, 45, 'left', '#212121', '48', context);
    highscoreText.draw();

    // Music button
    musicButton.text = musicToggle ? 'Music' : 'Silence';
    musicButton.draw();

    gameSpeed += 0.003;
    death ? retry() : requestAnimationFrame(render);
}

init();