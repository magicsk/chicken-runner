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
let score;
let scoreText;
let highscore;
let highscoreText;
let gameSpeed;
let scale;

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
    highscore = 0;
    initialSpawnTimer = 200;
    spawnTimer = initialSpawnTimer;

    player = new Player(150, canvas.height - 64, 50, 50, chickenYellow, 3, keys, gravity, canvas, context, gameSpeed);
    scoreText = new Text(score, 25, 45, 'left', '#212121', '48', context);
    musicButton = new Text('Music', canvas.width - 100, 45, 'center', '#212121', '48', context);

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
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
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
    if (score > highscore) {
        highscore = score;
        highscoreText = new Text('HI: ' + highscore, score.toString().length * 35 + 150, 45, 'right', '#212121', '48', context);
    }
    highscoreText.draw();

    // Music button
    musicButton.text = musicToggle ? 'Music' : 'Silence';
    musicButton.draw();

    gameSpeed += 0.003;
    requestAnimationFrame(render);
}

init();