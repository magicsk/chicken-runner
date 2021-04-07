export default class View {
    constructor () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render(model, keys) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        model.background.update();
        model.background.gameSpeed = model.gameSpeed;
    
        model.obstacle();

        model.move(keys);
    
        model.score++;
        model.scoreText.text = model.score;
        model.scoreText.draw();
    
        if (model.score > model.highscore) model.highscore = model.score;
        model.highscoreText.text = `HI: ${model.highscore}`;
        model.highscoreText.x = (model.score.toString().length * 10) + 75;
        model.highscoreText.draw();
    
        model.musicButton.text = model.music.paused ? 'Silence' : 'Music';
        model.musicButton.draw();
        
        model.audioButton.text = model.audio ? 'Audio' : 'Silence';
        model.audioButton.draw();
    }

    retry(model, keys){
        model.retryButton.draw();
        model.retry(keys);
    }

    menu(model, keys){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        model.background.update();
        model.gameSpeed += 0.003;
        model.move(keys);

        
        model.startButton.draw();
        model.menu();
        model.instructions.draw();
    }
}
