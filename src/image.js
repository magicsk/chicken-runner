import loadAssets from './assets.js';

export default class Image {
    constructor (x, y, type, canvas, context) {
        this.x = x;
        this.y = y;
        this.texture = loadAssets(type);
        this.canvas = canvas;
        this.context = context;
    }
    
    draw() {
        this.width = this.texture[0].width;
        this.height = this.texture[0].height;
        this.context.drawImage(this.texture[0], this.x, this.y, this.width*1.5, this.height*1.5);
    }
}