import loadAssets from './assets.js';

export default class Background {
    constructor (gameSpeed, canvas, context) {
        this.x = 0;
        this.y = 0;
        this.texture = loadAssets(0)[0];
        this.scale = canvas.height / this.texture.height;
        this.width = this.texture.width * this.scale;
        this.height = this.texture.height * this.scale;
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;
    }

    update() {
        if (this.x + this.width < 0) {
            this.x = 0;
        }
        this.x += -this.gameSpeed;
        this.draw();
    }

    draw() {
        for (let i = 0; i <= Math.floor(this.canvas.width / (this.texture.width * this.scale)) + 1; i++) {
            this.context.drawImage(this.texture, this.x + (this.width * i) - 5, this.y, this.width, this.height);
        }
    }
}
