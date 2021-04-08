import { buildings, buildingButtons, scrollSpeedVector, listOfButtons, scrollSpeed, player, map, origo, mapWidth, mapHeight } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { Button } from './hud.js';

export function keyHandlerDown(e)
{  
 
    if (e.key == "ArrowDown") {
         scrollSpeedVector.y = -scrollSpeed;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeedVector.y = scrollSpeed;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeedVector.x = -scrollSpeed;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeedVector.x = scrollSpeed;
    }
    else 
    {
    }
}

export function keyHandlerUp(e)
{
    if (e.key == "ArrowDown")
    {
        scrollSpeedVector.y = 0;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeedVector.y = 0;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeedVector.x = 0;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeedVector.x = 0;
    }
    else 
    {
    }
}

export function mouseHandler(e, hud) {
    let pointerPos = new Point2D(e.clientX, e.clientY);
    if (player.currentAction === 0) {
        for (let i = 0; i < hud.buttonsList.length; i++) 
        {
            if(hud.buttonsList[i].pointIsWithin(pointerPos)) 
            {
                if (hud.buttonsList[i].name === "buildMenu") 
              {
                    player.currentAction = "buildMenu";
                    Button.constructButton(buildingButtons, 75, 63, 28, 27, "buildHouse");
    
                    
                    return 0;  
                }
            }
        }
    }
    else if (player.currentAction === "buildMenu") {
        for (let j = 0; j < buildingButtons.length; j++) {
            if (buildingButtons[j].pointIsWithin(pointerPos)) {
                player.currentAction = buildingButtons[j].name

                return 0;
            }
        }
    }
    else if (player.currentAction === "buildHouse") {
        let hexCoords = Hex.pixelToHex(pointerPos);
        // console.log("built on " + hexCoords.x + ", " + hexCoords.y);
        // console.log(map.mapHexes[hexCoords.x][hexCoords.y])
        map.mapHexes[hexCoords.x][hexCoords.y].building = 1;
        
    }
    buildingButtons.length = 0;
    player.currentAction = 0;


}  