import loadAssets from './assets.js';

export default class Obstacle {
    constructor (x, y, type, gameSpeed, canvas, context) {
        this.x = x;
        this.y = y;
        this.texture = loadAssets(type);
        this.width = this.texture[0].width;
        this.height = this.texture[0].height;
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
        let f = Math.floor(this.gameSpeed * 50) % 5;
        this.context.drawImage(this.texture[Math.floor(f)], this.x, this.y, this.width, this.height);
    }
}