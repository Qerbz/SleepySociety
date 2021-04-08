import { ctx } from '../constants/index.js';

class Building {
    img;
    x;
    y;
    upgradeable;
    level;

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
        this.upgradeable = false;
        this.level = 0;
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

export class Housing extends Building {

    price;
    inhabitants;
    level;

    /**
     * 
     * @param {Image} img The image of the house.
     * @param {Number} x The x-coordinate of the house.
     * @param {Number} y The y-coordinate of the house.
     * @param {Number} price The price of building the building
     */
    
    constructor(img, x, y) {
        super(img, x, y);
        this.price = {
            work: 1,
            wood: 30
        };
        this.inhabitants = inhabitants;
        this.people = new Uint16Array(this.inhabitants);
        this.level = 0;
    }

    upgrade(img, inhabitants) {
        this.level++;
        this.img = img;
        this.inhabitants = inhabitants;
    }
}


class Workplace extends Building {
    constructor(img, x, y, price, maxWorkers) {
        super(img, x, y);
        this.price = price;
        this.maxWorkers = 
        this.workers = Uint16Array(this.maxWorkers);
    }
}

export class Store extends Workplace {

    /**
     * 
     * @param {Image} img 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} price 
     * @param {Number} workers 
     */

    constructor(img, x, y, price, workers) {
        super(img, x, y, price, workers);
    }
}

