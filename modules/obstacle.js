export default class Obstacle {
    constructor(x, y, width, height, texture = [], gameSpeed, canvas, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = texture;
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;
    }

    update() {
        this.x += -this.gameSpeed;
        this.x -= 2;
        this.draw();
    }

    draw() {
        let f = Math.floor(this.gameSpeed*50)%5;
        this.context.drawImage(this.texture[Math.floor(f)], this.x, this.y, this.width, this.height);
    }
}