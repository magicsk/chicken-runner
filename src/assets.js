export default function loadAssets(asset) {
    let background = ['./assets/background.png'];
    let chickenYellow = [
        './assets/chicken/chickenYellow1.png',
        './assets/chicken/chickenYellow2.png'
    ];
    let foxTexture = [
        './assets/fox/0.gif',
        './assets/fox/1.gif',
        './assets/fox/2.gif',
        './assets/fox/3.gif',
        './assets/fox/4.gif'
    ];
    let instructions = ['./assets/instructions.png'];

    let arr = [];

    switch (asset) {
        case 0:
            asset = background;
            break;
        case 1:
            asset = chickenYellow;
            break;
        case 2:
            asset = foxTexture;
            break;
        case 3:
            asset = instructions;
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