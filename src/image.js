import loadAssets from './assets.js';

export default class Image {
    constructor (x, y, type, canvas, context) {
        this.x = x;
        this.y = y;
        this.texture = loadAssets(type)[0];
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.canvas = canvas;
        this.context = context;
    }

    draw() {
        this.context.drawImage(this.texture, this.x, this.y, this.width*1.5, this.height*1.5);
    }
}