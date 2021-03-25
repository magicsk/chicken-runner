export default class Background {
    constructor( x, texture, gameSpeed, canvas, context) {
        this.x = x;
        this.y = 0;
        this.texture = texture;
        this.scale = Math.min(canvas.width / texture.width, canvas.height / texture.height);
        this.width = this.texture.width * this.scale;
        this.height = this.texture.height * this.scale;
        this.gameSpeed = gameSpeed;
        this.context = context;
    }

    update() {
        this.x += -this.gameSpeed;
        this.width = this.texture.width * this.scale;
        this.height = this.texture.height * this.scale;
        this.draw();
    }

    draw() {
        this.context.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }
}