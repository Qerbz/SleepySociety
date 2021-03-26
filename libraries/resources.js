import { ctx } from "../constants/index.js";

export default class Resource {
    value;

    /**
     * 
     * @param {Number} value The amount of the resource the player has. 
     */

    constructor(value) {
        this.value = value;
    }

    /**
     * 
     * @param {Number} x x-coordinate of where to draw the value.
     * @param {Number} y y-coordinate of where to draw the value.
     */

    draw(x, y) {
        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${this.value}`, x, y);
    }
}

class ResourcesStored 
{
    gold;
    timber;
    stone;
    firewood;
    Iron;
    Food;
    Livestock;

    constructor()
    {
        gold = 0;
        timber = 0;
        stone = 0;
        firewood = 0;
        Iron = 0;
        Food = 0;
        Livestock = 0;
    }
}