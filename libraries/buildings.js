import { ctx } from '../constants/index.js';

export default class Building {
    img;
    x;
    y;

    /**
     * 
     * @param {Image} img The image of the building.
     * @param {Number} x The x-coodinate of the building.
     * @param {Number} y The y-coordinate of the building.
     */

    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }

    /**
     * @description Draws the image of the building.
     */

    draw() {
        ctx.beginPath()
        ctx.drawImage(this.img, this.x, this.y);
        ctx.closePath();
    }
}

export class House extends Building {

    /**
     * 
     * @param {Image} img The image of the house.
     * @param {Number} x The x-coordinate of the house.
     * @param {*} y The y-coordinate of the house.
     * @param {*} price The price to buy a house.
     * @param {*} inhabitants The amount of people living in the house.
     */
    
    constructor(img, x, y, price, inhabitants) {
        super(img, x, y);
        this.price = price;
        this.inhabitants = inhabitants;
    }
}