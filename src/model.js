import Background from './background.js';
import Image from './image.js';
import Player from './player.js';
import Obstacle from './obstacle.js';
import Button from './button.js';
import Text from './text.js';

export default class Model {
    constructor () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.gameSpeed = 3; // default: 3
        this.gravity = 1;
        this.score = 0;
        this.highscore = window.localStorage.getItem('highscore') ?? 0;
        this.initialSpawnTimer = 200;
        this.spawnTimer = this.initialSpawnTimer;
        this.death = false;
        this.start = false;

        this.background = new Background(this.gameSpeed, this.canvas, this.context);
        this.music = new Audio('./assets/music.wav');
        // this.music.play();
        this.audio = true;

        this.obstacles = [];
        this.player = new Player(150, this.canvas.height - 64, 50, 50, 1, 3, this.gravity, this.canvas, this.context, this.gameSpeed, this.audio);

        this.scoreText = new Text(this.score, 25, 45, 'left', '#212121', '48', this.context);
        this.highscoreText = new Text('HI: ' + this.highscore, (this.score.toString().length * 10) + 75, 45, 'left', '#212121', '48', this.context);

        this.musicButton = new Button('Music', this.canvas.width - 100, 45, 'center', '#212121', '48', this.context);
        this.audioButton = new Button('Audio', this.canvas.width - 300, 45, 'center', '#212121', '48', this.context);

        this.retryButton = new Button('Retry', this.canvas.width / 2, this.canvas.height / 2, 'center', '#cdcdcd', 48, this.context, 'rgba(43, 46, 48, 0.75)');
        this.startButton = new Button('Start', this.canvas.width / 2, this.canvas.height / 2, 'center', '#cdcdcd', 48, this.context, 'rgba(43, 46, 48, 0.75)');

        this.instructions = new Image(this.canvas.width - 450, this.canvas.height - 100, 3, this.canvas, this.context);
    }

    toggleMusic() {
        this.music.paused ? this.music.play() : this.music.pause();
    }

    toggleAudio() {
        this.audio = !this.audio;
    }

    move(keys) {
        this.player.gameSpeed = this.gameSpeed;
        this.player.audio = this.audio;
        this.player.update(keys);
    }

    spawnObstacle() {
        let obstacle = new Obstacle(this.canvas.width + 67, this.canvas.height / 1.085 - 64, 2, this.gameSpeed, this.canvas, this.context);
        this.obstacles.push(obstacle);
    }

    obstacle() {
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnObstacle();
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;

            if (this.spawnTimer < 60) {
                this.spawnTimer = 60;
            }
        }

        this.gameSpeed += 0.003;

        for (let i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i];
            o.gameSpeed = this.gameSpeed;
            if (o.x + o.width < 0) {
                this.obstacles.splice(i, 1);
            }

            if (
                this.player.x < o.x + o.width &&
                this.player.x + this.player.width > o.x &&
                this.player.y < o.y + o.height &&
                this.player.y + this.player.height > o.y
            ) {
                window.localStorage.setItem('highscore', this.highscore);
                this.death = true;
            }
            o.update();
        }
    }

    retry(keys) {
        let click = this.canvas.addEventListener('click', e => {
            let clickedX = e.pageX;
            let clickedY = e.pageY;
            if (this.canvas.width / 2.2 < clickedX && clickedX < this.canvas.width / 1.84 && this.canvas.height / 2.12 < clickedY && clickedY < this.canvas.height / 1.90) {
                // console.log('click');
                keys['click'] = true;
            }
        });

        if (keys['Space'] || keys['KeyW'] || keys['ArrowUp'] || keys['touch'] || keys['click']) {
            this.obstacles = [];
            this.gameSpeed = 3;
            this.gravity = 1;
            this.score = 0;
            this.initialSpawnTimer = 200;
            this.spawnTimer = this.initialSpawnTimer;
            this.death = false;
            this.canvas.removeEventListener('click', click);
        }
    }

    menu() {
        let click = this.canvas.addEventListener('click', e => {
            let clickedX = e.pageX;
            let clickedY = e.pageY;
            if (this.canvas.width / 2.2 < clickedX && clickedX < this.canvas.width / 1.84 && this.canvas.height / 2.12 < clickedY && clickedY < this.canvas.height / 1.90) {
                this.canvas.removeEventListener('click', click);
                this.start = true;
            }
        });
    }
}
