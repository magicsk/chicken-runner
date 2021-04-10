import loadAssets from './assets.js';

export default class Background {
    constructor (gameSpeed, canvas, context) {
        this.x = 0;
        this.y = 0;
        this.texture = loadAssets(0);
        this.gameSpeed = gameSpeed;
        this.canvas = canvas;
        this.context = context;
        this.scale = this.canvas.height / this.texture[0].height;
        this.width = this.texture[0].width * this.scale;
        this.height = this.texture[0].height * this.scale;
    }
    
    update() {
        this.scale = this.canvas.height / this.texture[0].height;
        this.width = this.texture[0].width * this.scale;
        this.height = this.texture[0].height * this.scale;
        if (this.x + this.width < 0) {
            this.x = 0;
        }
        this.x += -this.gameSpeed;
        this.draw();
    }

    draw() {
        for (let i = 0; i <= Math.floor(this.canvas.width / (this.texture[0].width * this.scale)) + 1; i++) {
            this.context.drawImage(this.texture[0], this.x + (this.width * i) - 5, this.y, this.width, this.height);
        }
    }
}
