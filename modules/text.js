export default class Text {
    constructor(text, x, y, textAlign, color, size, context) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.textAlign = textAlign;
        this.color = color;
        this.size = size;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.font = this.size + 'px monogram';
        this.context.textAlign = this.textAlign;
        this.context.fillText(this.text, this.x, this.y);
    }
}