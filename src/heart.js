import loadAssets from './assets.js';

export default class Heart {
    constructor (x, y, width, height, type, canvas, context, gameSpeed, audio) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = loadAssets(type)[2];
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;
        this.audio = audio;
    }
    update() {
        this.x += -this.gameSpeed;
        this.draw();
    }

    draw() {
        this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
}