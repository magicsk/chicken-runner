export default class Text {
    constructor(text, x, y, textAlign, color, size, context, background) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.textAlign = textAlign;
        this.color = color;
        this.size = size;
        this.context = context;
        this.background = background ?? false;
    }

    draw() {
        this.context.font = this.size + 'px monogram';
        if (this.background) {
            let background_size = this.context.measureText(this.text);
            this.context.beginPath();
            this.context.fillStyle = this.background;
            this.context.roundRect(this.x - 25, this.y - this.size + 3, background_size.width + 47, 25 + this.size, 20).fill();
            this.context.closePath();
        }
        this.context.fillStyle = this.color;
        this.context.textAlign = this.textAlign;
        this.context.fillText(this.text, this.x, this.y);
    }
}
