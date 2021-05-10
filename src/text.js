export default class Text {
    constructor (text, x, y, textAlign, font, color, size, context, shadow) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.textAlign = textAlign;
        this.color = color;
        this.size = size;
        this.context = context;
        this.shadow = shadow ?? false;
    }

    draw() {
        this.context.font = this.size + 'px ' + this.font;
        if (this.shadow) {
            this.context.shadowColor = 'black';
            this.context.shadowBlur = 7;
        }
        this.context.fillStyle = this.color;
        this.context.textAlign = this.textAlign;
        this.context.fillText(this.text, this.x, this.y);
        this.context.shadowBlur = 0;
    }
}
