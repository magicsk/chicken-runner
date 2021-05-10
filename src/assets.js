export default function loadAssets(asset) {
    let background = ['./assets/background.png'];
    let chickenBlue = [
        './assets/chicken/chickenBlue1.png',
        './assets/chicken/chickenBlue2.png',
        './assets/chicken/chickenBlue3.png',
        './assets/chicken/chickenBlue4.png'
    ];
    let chickenBrown = [
        './assets/chicken/chickenBrown1.png',
        './assets/chicken/chickenBrown2.png',
        './assets/chicken/chickenBrown3.png',
        './assets/chicken/chickenBrown4.png'
    ];
    let chickenLBrown = [
        './assets/chicken/chickenLBrown1.png',
        './assets/chicken/chickenLBrown2.png',
        './assets/chicken/chickenLBrown3.png',
        './assets/chicken/chickenLBrown4.png'
    ];
    let chickenWhite = [
        './assets/chicken/chickenWhite1.png',
        './assets/chicken/chickenWhite2.png',
        './assets/chicken/chickenWhite3.png',
        './assets/chicken/chickenWhite4.png'
    ];
    let chickenYellow = [
        './assets/chicken/chickenYellow1.png',
        './assets/chicken/chickenYellow2.png',
        './assets/chicken/chickenYellow3.png',
        './assets/chicken/chickenYellow4.png'
    ];
    let foxTexture = [
        './assets/fox/0.gif',
        './assets/fox/1.gif',
        './assets/fox/2.gif',
        './assets/fox/3.gif',
        './assets/fox/4.gif'
    ];
    let birdTexture = [
        './assets/bird/0.gif',
        './assets/bird/1.gif',
        './assets/bird/2.gif',
        './assets/bird/3.gif',
        './assets/bird/4.gif'
    ];
    let snakeTexture = [
        './assets/snake/0.gif',
        './assets/snake/1.gif',
        './assets/snake/2.gif',
        './assets/snake/3.gif',
        './assets/snake/4.gif'
    ];
    let instructions = ['./assets/instructions.png'];

    let arr = [];

    switch (asset) {
        case 0:
            asset = background;
            break;
        case 1:
            asset = instructions;
            break;
        case 20:
            asset = chickenWhite;
            break;
        case 21:
            asset = chickenYellow;
            break;
        case 22:
            asset = chickenLBrown;
            break;
        case 23:
            asset = chickenBrown;
            break;
        case 24:
            asset = chickenBlue;
            break;
        case 30:
            asset = foxTexture;
            break;
        case 31:
            asset = birdTexture;
            break;
        case 32:
            asset = snakeTexture;
            break;
        default:
            break;
    }
    asset.forEach(img => {
        let new_img = new Image();
        new_img.src = img;
        arr.push(new_img);
    });
    return arr;
}