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