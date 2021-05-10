import loadAssets from './assets.js';

export default class Player {
    constructor (x, y, width, height, type, gravity, canvas, context, gameSpeed, audio) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = loadAssets(type);
        this.gravity = gravity;
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;
        this.audio = audio;
        this.respawning = false;

        this.jumpSound = new Audio('./assets/sounds/jump.wav');
        this.respawnSound = new Audio('./assets/sounds/respawn.wav');
        this.velocity = 0;
        this.jumpForce = 15;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }
    update(keys) {
        if (!this.respawning) {
            // Jump
            if (keys['Space'] || keys['KeyW'] || keys['ArrowUp'] || keys['touch']) {
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
        }


        // Gravity
        this.y += this.velocity;

        if (this.y + this.height < this.canvas.height / 1.085) {
            this.velocity += this.gravity;
            this.grounded = false;
        } else {
            this.velocity = 0;
            this.grounded = true;
            this.y = this.canvas.height / 1.085 - this.height;
        }

        this.draw();
    }

    jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.velocity = -this.jumpForce;
            this.audio ? this.jumpSound.play() : undefined;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.velocity = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    respawn() {
        this.grounded = false;
        this.y = this.canvas.height / 2;
        this.context.drawImage(this.texture[3], this.x, this.y, this.width, this.height);
        this.respawning = true;
        this.audio ? this.respawnSound.play() : undefined;
    }

    draw() {
        if (this.respawning) {
            this.context.drawImage(this.texture[this.y < this.canvas.height / 1.5 ? 2 : 3], this.x, this.y, this.width, this.height);
            this.y == this.canvas.height / 1.085 - this.height ? this.respawning = false : undefined;
        } else {
            let f = Math.floor(this.gameSpeed * 20) % 2;
            this.context.drawImage(this.texture[this.grounded ? f : 1], this.x, this.y, this.width, this.height);
        }
    }
}
