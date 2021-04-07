import Text from './text.js';

export default class Button extends Text {
    constructor (text, x, y, textAlign, color, size, context, background) {
        super(text, x, y, textAlign, color, size, context);
        this.background = background ?? false;
    }
    
    draw() {
        this.context.font = this.size + 'px monogram';
        this.backgroundWidth = this.context.measureText(this.text).width + 40;
        if (this.background) {
            this.context.beginPath();
            this.context.fillStyle = this.background;
            this.context.roundRect(this.x - this.backgroundWidth / 2 - 1.5, this.y - (25 + this.size) / 2, this.backgroundWidth, 25 + this.size, 20).fill();
            this.context.closePath();
        }
        this.context.fillStyle = this.color;
        this.context.textAlign = this.textAlign;
        this.background ? this.context.fillText(this.text, this.x, this.y + 7) : this.context.fillText(this.text, this.x, this.y);
    }
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};
