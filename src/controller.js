import Model from './model.js';
import View from './view.js';

export default class Controller {
    constructor () {
        this.model = new Model();
        this.view = new View();
        this.keys = {};

        window.addEventListener('resize', () => location.reload());

        document.addEventListener('keydown', event => this.keys[event.code] = true);
        document.addEventListener('keyup', event => this.keys[event.code] = false);
        document.addEventListener('touchstart', () => this.keys['touch'] = true);
        document.addEventListener('touchend', () => this.keys['touch'] = false);

        this.model.canvas.addEventListener('click', e => {
            let clickedX = e.pageX;
            let clickedY = e.pageY;
            if (this.model.canvas.width - 110 < clickedX && clickedX < this.model.canvas.width - 50 && 50 < clickedY && clickedY < 85) {
                this.model.toggleMusic();
            } else if (this.model.canvas.width - 205 < clickedX && clickedX < this.model.canvas.width - 140 && 30 < clickedY && clickedY < 85) {
                this.model.toggleAudio();
            }
        });
    }

    run() {
        if (!this.model.start) {
            this.view.menu(this.model, this.keys);
        } else {
            this.model.death ? this.view.retry(this.model, this.keys) : this.view.render(this.model, this.keys);
        }
        // this.model.death = true;
    }
}