import { ctx } from '../constants/index.js';

export default class Building {
    // img;
    x;
    y;

    /**
     * 
     * @param {Image} img The image of the building.
     * @param {Number} x The x-coodinate of the building.
     * @param {Number} y The y-coordinate of the building.
     */

    constructor(x, y) {
        // this.img = img;
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.closePath();
    }
}

export class House extends Building {
    constructor(x, y, price, inhabitants) {
        super(x, y);
        this.price = price;
        this.inhabitants = inhabitants;
    }
}