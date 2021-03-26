import { ctx } from "../constants/index.js";

export default class Resource {
    value;
    x;
    y;

    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${this.value}`, this.x, this.y);
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