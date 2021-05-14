import { HUD, Button } from './libraries/hud.js';
import { mouseHandler } from './libraries/inputHandler.js';
import { Point2D } from './libraries/point2d.js';

export default function loadMainMenu(ctx, cWidth, cHeight) {

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cWidth, cHeight);

    ctx.fillStyle = "#fff";
    const title = "Insert Title";
    const opt1 = "Continue";
    const opt2 = "New Game";
    const opt3 = "Settings";
    const opt4 = "Credits";

    ctx.font = "150px Arial";
    ctx.fillText(title, (cWidth - ctx.measureText(title).width) / 2, 3 * cHeight / 20);

    ctx.font = "50px Arial";
    ctx.fillText(opt1, (cWidth - ctx.measureText(opt1).width) / 2, 10 * cHeight / 20);
    ctx.fillText(opt2, (cWidth - ctx.measureText(opt2).width) / 2, 12 * cHeight / 20);
    ctx.fillText(opt3, (cWidth - ctx.measureText(opt3).width) / 2, 14 * cHeight / 20);
    ctx.fillText(opt4, (cWidth - ctx.measureText(opt4).width) / 2, 16 * cHeight / 20);

    const opt1Btn = new Button(new Point2D((cWidth - ctx.measureText(opt1).width) / 2, cHeight / 2), new Point2D((cWidth + ctx.measureText(opt1).width) / 2, cHeight / 2 + (ctx.measureText(opt1).fontBoundingBoxAscent + ctx.measureText(opt1).fontBoundingBoxDescent)), "continue");
    const opt2Btn = new Button(new Point2D((cWidth - ctx.measureText(opt2).width) / 2, 3 * cHeight / 5), new Point2D((cWidth + ctx.measureText(opt2).width) / 2, 3 * cHeight / 5 + (ctx.measureText(opt2).fontBoundingBoxAscent + ctx.measureText(opt2).fontBoundingBoxDescent)), "newGame");
    const opt3Btn = new Button(new Point2D((cWidth - ctx.measureText(opt3).width) / 2, 7 * cHeight / 10), new Point2D((cWidth + ctx.measureText(opt3).width) / 2, 7 * cHeight / 10 + (ctx.measureText(opt3).fontBoundingBoxAscent + ctx.measureText(opt3).fontBoundingBoxDescent)), "settings");
    const opt4Btn = new Button(new Point2D((cWidth - ctx.measureText(opt4).width) / 2, 4 * cHeight / 5), new Point2D((cWidth + ctx.measureText(opt4).width) / 2, 4 * cHeight / 5 + (ctx.measureText(opt4).fontBoundingBoxAscent + ctx.measureText(opt4).fontBoundingBoxDescent)), "credits");

    const buttonArray = [opt1Btn, opt2Btn, opt3Btn, opt4Btn];

    const buttonHud = new HUD(buttonArray, []);
}

// TODO: Add hud buttons to existing HUD.