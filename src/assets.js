export default function loadAssets(asset) {
    let background = ['./assets/images/background.png'];
    let chickenBlue = [
        './assets/images/chicken/chickenBlue1.png',
        './assets/images/chicken/chickenBlue2.png',
        './assets/images/chicken/chickenBlue3.png',
        './assets/images/chicken/chickenBlue4.png'
    ];
    let chickenBrown = [
        './assets/images/chicken/chickenBrown1.png',
        './assets/images/chicken/chickenBrown2.png',
        './assets/images/chicken/chickenBrown3.png',
        './assets/images/chicken/chickenBrown4.png'
    ];
    let chickenLBrown = [
        './assets/images/chicken/chickenLBrown1.png',
        './assets/images/chicken/chickenLBrown2.png',
        './assets/images/chicken/chickenLBrown3.png',
        './assets/images/chicken/chickenLBrown4.png'
    ];
    let chickenWhite = [
        './assets/images/chicken/chickenWhite1.png',
        './assets/images/chicken/chickenWhite2.png',
        './assets/images/chicken/chickenWhite3.png',
        './assets/images/chicken/chickenWhite4.png'
    ];
    let chickenYellow = [
        './assets/images/chicken/chickenYellow1.png',
        './assets/images/chicken/chickenYellow2.png',
        './assets/images/chicken/chickenYellow3.png',
        './assets/images/chicken/chickenYellow4.png'
    ];
    let foxTexture = [
        './assets/images/fox/0.gif',
        './assets/images/fox/1.gif',
        './assets/images/fox/2.gif',
        './assets/images/fox/3.gif',
        './assets/images/fox/4.gif'
    ];
    let birdTexture = [
        './assets/images/bird/0.gif',
        './assets/images/bird/1.gif',
        './assets/images/bird/2.gif',
        './assets/images/bird/3.gif',
        './assets/images/bird/4.gif'
    ];
    let snakeTexture = [
        './assets/images/snake/0.gif',
        './assets/images/snake/1.gif',
        './assets/images/snake/2.gif',
        './assets/images/snake/3.gif',
        './assets/images/snake/4.gif'
    ];
    let instructions = ['./assets/images/instructions.png'];

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