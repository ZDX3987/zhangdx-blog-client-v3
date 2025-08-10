export function randomColor() {
    let r = Math.floor(Math.random() * 220);
    let g = Math.floor(Math.random() * 220);
    let b = Math.floor(Math.random() * 220);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}