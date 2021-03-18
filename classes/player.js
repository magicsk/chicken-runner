export default class Player {
    constructor(x, y, width, height, t, lives) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.t = t;
        this.type = ['./assets/chickenYellowStanding.png'];

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
        let image = new Image(64, 64);
        image.src = this.type[this.t];    
        ctx.drawImage(image,this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}