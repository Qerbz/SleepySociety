import { ctx } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js'; 

class Building {
    img;
    x;
    y;
    upgradeable;
    built;
    level;
    width;
    height;

    /**
     * 
     * @param {Image} img The image of the building.
     * @param {Number} x The x-coodinate of the building (hex).
     * @param {Number} y The y-coordinate of the building (hex).
     */

    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.upgradeable = false;
        this.built = false;
        this.level = 0;
        this.width = 64;
        this.height = 64;
        }
    
    /**
     * 
     * @param {Image} img The image of the building 
     * @param {Number} inhabitants The maximum amount of allowed people living in the building
     */

    upgrade(img, inhabitants) {
        this.level++;
        this.img = img;
        this.inhabitants = inhabitants;
    }

    /**
     * 
     * @param {Number} frameX The frame you wish to draw along the x-axis.
     * @param {Number} frameY The frame you wish to draw along the y-axis.
     */

    draw(frameX, frameY) {
        this.pixelPos = Hex.hexToPixel(new Point2D(this.x, this.y))
        ctx.drawImage(this.img, this.width * frameX, this.height * frameY, this.width, this.height, this.pixelPos.x-32, this.pixelPos.y-32, this.width, this.height)
  
    }
}

export class Housing extends Building {

    price;
    inhabitants;
    type;

    /**
     * 
     * @param {Image} img The image of the house.
     * @param {Number} x The x-coordinate of the house.
     * @param {Number} y The y-coordinate of the house.
     */
    
    constructor(img, x, y) {
        super(img, x, y);
        this.price = {
            work: 1,
            wood: 30
        };
        this.people = new Array();
        this.inhabitants = 3;
        this.type = "housing";
    }
}

export class Commercial extends Building {

    price;
    workers;
    type;
    /**
     * 
     * @param {Image} img The image of the building
     * @param {Number} x The x-coordinate of the building
     * @param {Number} y The y-coordinate of the building
     */

    constructor(img, x, y) {
        super(img, x, y);
        this.price = {
            work: 3,
            wood: 30
        };
        this.workers = new Array();
        this.type = "commercial";
    }
}

class Agriculture extends Building {

    price;

    /**
     * 
     * @param {Image} img 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} maxWorkers 
     */

    constructor(img, x, y, maxWorkers) {
        super(img, x, y);
        this.maxWorkers = maxWorkers;
        this.price = {
            work: 3,
            wood: 40
        }
    }
}

class Electricity extends Building {

    workers;

    /**
     * 
     * @param {Image} img The sprite image for the building.
     * @param {Number} x The x-coordinate of the building.
     * @param {Number} y The y-coordinate of the building.
     */

    constructor(img, x, y, built) {
        super(img, x, y);
        this.workers = new Array();
    }
}

export class CoalPowerStation extends Electricity {

    maxWorkers;
    pGeneration;

    /**
     * 
     * @param {Image} img The sprite image for the building.
     * @param {*} x The x-coordinate of the building.
     * @param {*} y The y-coordinate of the building.
     * @param {*} maxWorkers The max numbers of workers in the facility.
     */

    constructor(img, x, y, maxWorkers) {
        super(img, x, y, workers);
        this.maxWorkers = maxWorkers;
        this.pGeneration =  500;
    }
}

