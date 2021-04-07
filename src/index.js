import Controller from './controller.js';

document.body.appendChild(document.createElement('canvas'));

const app = new Controller();

function run() {
    app.run();
    requestAnimationFrame(run);
}

new FontFace('monogram', 'url(assets/monogram.ttf)').load().then(() => run());