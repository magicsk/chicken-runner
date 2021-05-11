import Background from './background.js';
import Image from './image.js';
import Player from './player.js';
import Heart from './heart.js';
import Obstacle from './obstacle.js';
import Button from './button.js';
import Text from './text.js';

export default class Model {
    constructor () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.gameSpeed = 3;
        this.gravity = 1;
        this.score = 0;
        this.lives = 0;
        this.highscore = window.localStorage.getItem('highscore') ?? 0;
        this.initialSpawnTimer = 200;
        this.spawnTimer = this.initialSpawnTimer;
        this.death = false;
        this.start = false;

        this.background = new Background(this.gameSpeed, this.canvas, this.context);
        this.music = new Audio('./assets/sounds/music.wav');
        this.deathSound = new Audio('./assets/sounds/death.wav');
        this.pickupSound = new Audio('./assets/sounds/pickup.wav');
        this.scoreSound = new Audio('./assets/sounds/respawn.wav');
        this.music.play();
        this.music.volume = 0.5;
        this.audio = true;

        this.obstacles = [];
        let playerType = this.random(20, 24);
        this.player = new Player(150, this.canvas.height - 64, 50, 50, playerType, this.gravity, this.canvas, this.context, this.gameSpeed, this.audio);

        this.heart = new Heart(-64, this.canvas.height / (Math.random() * (1.6 - 1.2) + 1.2), 64, 64, playerType, this.canvas, this.context, this.gameSpeed, this.audio);

        this.scoreText = new Text(this.score, 25, 45, 'left', 'monogram', '#212121', '48', this.context);
        this.highscoreText = new Text('HI: ' + this.highscore, (this.score.toString().length * 10) + 75, 45, 'left', 'monogram', '#212121', '48', this.context);
        this.livesText = new Text('Eggs: ' + this.lives, 25, 90, 'left', 'monogram', '#212121', '48', this.context);
        this.deathText = new Text('😵 You died! 😵',this.canvas.width / 2, this.canvas.height / 3.5, 'center', 'monogram', '#cdcdcd', '100', this.context, true);
        this.logoText = new Text('LOST HENN',this.canvas.width / 2, this.canvas.height / 3, 'center', 'monocraft', '#cdcdcd', '130', this.context, true);

        this.musicButton = new Button('🎵', this.canvas.width - 75, 75, 'center', 'emoji', '#212121', '48', this.context, false, true);
        this.audioButton = new Button('🔊', this.canvas.width - 175, 75, 'center', 'emoji', '#212121', '48', this.context, false, true);

        this.retryButton = new Button('I will not surrender!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'monogram', '#cdcdcd', 48, this.context, 'rgba(43, 46, 48, 0.75)');
        this.startButton = new Button('Let\'s begin!', this.canvas.width / 2, this.canvas.height / 2, 'center', 'monogram', '#cdcdcd', 48, this.context, 'rgba(43, 46, 48, 0.75)');

        this.instructions = new Image(this.canvas.width - 450, this.canvas.height - 100, 1, this.canvas, this.context);
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
        this.heart.gameSpeed = this.gameSpeed;
        this.heart.audio = this.audio;
        this.heart.update();
        this.player.update(keys);

        if (
            this.player.x < this.heart.x + this.heart.width &&
            this.player.x + this.player.width > this.heart.x &&
            this.player.y < this.heart.y + this.heart.height &&
            this.player.y + this.player.height > this.heart.y
        ) {
            this.lives++;
            this.heart.x = -64;
            this.audio ? this.pickupSound.play() : undefined;
        }
    }

    random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    spawnObstacle() {
        let obstacle;
        let type = this.score > 1000 ? this.random(1, this.score > 3000 ? 3 : 2) : 1;
        switch (type) {
            case 1:
                obstacle = new Obstacle(this.canvas.width + 128, this.canvas.height / 1.085 - 64, 30, this.gameSpeed, this.canvas, this.context);
                break;
            case 2:
                obstacle = new Obstacle(this.canvas.width + 128, this.canvas.height / 1.085 - 64, 32, this.gameSpeed, this.canvas, this.context);
                break;
            case 3:
                obstacle = new Obstacle(this.canvas.width + 128, this.canvas.height / (Math.random() * (1.2 - 1.1) + 1.1) - 64, 31, this.gameSpeed, this.canvas, this.context);
                break;

        }
        this.obstacles.push(obstacle);
    }

    obstacle() {
        // this.death = true;
        // this.deathText.draw();
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnObstacle();
            let chance = this.random(1, 50);
            if (this.score > 2000 && chance == 24) {
                this.heart.x = this.canvas.width + 64;
                this.heart.y = this.canvas.height / (Math.random() * (1.6 - 1.2) + 1.2);
            }
            this.spawnTimer = this.initialSpawnTimer - this.gameSpeed * 8;

            if (this.spawnTimer < 60) {
                let difficulty = 40 - Math.floor(this.score/500);
                this.spawnTimer = this.random(difficulty < 15 ? 15 : difficulty, 60);
            }
        }

        this.gameSpeed > 10 ? this.gameSpeed += 0.002 : this.gameSpeed += 0.003;

        for (let i = 0; i < this.obstacles.length; i++) {
            let o = this.obstacles[i];
            if (o) {
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
                    if (this.lives < 1) {
                        this.audio ? this.deathSound.play() : undefined;
                        window.localStorage.setItem('highscore', this.highscore);
                        this.death = true;
                        this.deathText.draw();
                    } else {
                        this.obstacles = [];
                        this.lives--;
                        this.player.respawn();
                        this.gameSpeed = this.gameSpeed / 1.2;
                    }
                }
                o.update();
            }
        }
    }

    retry(keys) {
        let click = this.canvas.addEventListener('click', e => {
            let clickedX = e.pageX;
            let clickedY = e.pageY;
            if (this.canvas.width / 2 - 208 < clickedX && clickedX < this.canvas.width / 2 + 208 && this.canvas.width / 2 + 125 && this.canvas.height / 2 - 32 < clickedY && clickedY < this.canvas.height / 2 + 32) {
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
            keys['click'] = false;
            this.canvas.removeEventListener('click', click);
        }
    }

    menu() {
        let click = this.canvas.addEventListener('click', e => {
            let clickedX = e.pageX;
            let clickedY = e.pageY;
            if (this.canvas.width / 2 - 125 < clickedX && clickedX < this.canvas.width / 2 + 125 && this.canvas.height / 2 - 31 < clickedY && clickedY < this.canvas.height / 2 + 31) {
                this.canvas.removeEventListener('click', click);
                this.gameSpeed = 3;
                this.start = true;
            }
        });
    }
}
