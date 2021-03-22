import { scrollSpeed, player, map } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js';

export function keyHandlerDown(e)
{  
 
    if (e.key == "ArrowDown") {
         scrollSpeed.y = -10;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeed.y = 10;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeed.x = -10;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeed.x = 10;
    }
    else 
    {
    }
}

export function keyHandlerUp(e)
{
    if (e.key == "ArrowDown")
    {
        scrollSpeed.y = 0;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeed.y = 0;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeed.x = 0;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeed.x = 0;
    }
    else 
    {
    }
}

export function mouseHandler(e, hud) {
    let pointerPos = new Point2D(e.clientX, e.clientY);
    for (let i = 0; i < hud.buttonsList.length; i++) 
    {
        if(hud.buttonsList[i].pointIsWithin(pointerPos)) 
        {
            if (hud.buttonsList[i].name == "testBuild") 
            {
                player.currentAction = "build";
                console.log(player.currentAction);
                return 0;
            }
        }

    }
    if (player.currentAction == "build") {
        let hexCoords = Hex.pixelToHex(pointerPos);
        console.log("built on " + hexCoords.x + ", " + hexCoords.y);
        map.mapHexes[hexCoords.x][hexCoords.y].building = 1;
        player.currentAction = 0;
    }
}