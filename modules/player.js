export default class Player {
    constructor(x, y, width, height, texture, lives, keys = [], gravity, canvas, context, gameSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = texture;
        this.keys = keys;
        this.gravity = gravity;
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;

        this.lives = lives;
        this.velocity = 0;
        this.jumpForce = 15;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }
    update() {
        // Jump
        if (this.keys['Space'] || this.keys['KeyW'] || this.keys['ArrowUp']) {
            this.jump();
        } else {
            this.jumpTimer = 0;
        }

        // Sneak
        if (this.keys['ShiftLeft'] || this.keys['KeyS'] || this.keys['ArrowDown']) {
            this.height = this.originalHeight / 2;
        } else {
            this.height = this.originalHeight;
        }


        // Gravity
        this.y += this.velocity;

        if (this.y + this.height < this.canvas.height/1.085) {
            this.velocity += this.gravity;
            this.grounded = false;
        } else {
            this.velocity = 0;
            this.grounded = true;
            this.y = this.canvas.height/1.085 - this.height;
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
        let f = Math.floor(this.gameSpeed*20)%2;
        this.context.drawImage(this.texture[this.grounded ? f : 1], this.x, this.y, this.width, this.height);
    }
}