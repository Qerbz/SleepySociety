import { buildings, houses, buildingButtons, scrollSpeedVector, listOfButtons, scrollSpeed, player, map, origo, mapWidth, mapHeight, ctx } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { Button } from './hud.js';
import { Vector } from './vector.js';
import { Housing } from './buildings.js'

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
    const pointerPos = new Point2D(e.clientX, e.clientY);

    if (e.which == 3){
        player.avatar.newDestination(new Vector (pointerPos.x - origo.x, pointerPos.y - origo.y));
    }
    else{
        if (player.currentAction === 0) {
            for (let i = 0; i < hud.buttonsList.length; i++) 
            {
                if(hud.buttonsList[i].pointIsWithin(pointerPos)) 
                {
                    if (hud.buttonsList[i].name === "buildMenu") 
                    {
                      player.currentAction = "buildMenu";
                
                      return 0;  
                    }
                }
            }
        }
        else if (player.currentAction === "buildMenu") {
       
            makeBuildingButtons();
    
            for (let j = 0; j < buildingButtons.length; j++) {
                if (buildingButtons[j].pointIsWithin(pointerPos)) {
                    player.currentAction = buildingButtons[j].name
                    Button.constructButton(hud.buttonsList, 1, 43, 119, 358, "hudButton");
    
                    return 0;
                }
            }
        }
        else if (player.currentAction === "buildHouse") {
            if(hud.buttonsList[1].pointIsWithin(pointerPos)) {
                player.currentAction = 0;
            }
            else {
    
                let hexCoords = Hex.pixelToHex(pointerPos);
                let house = new Image(256, 256);
                house.src = "../img/buildings.png";
                let pixelCoords = Hex.hexToPixel(hexCoords);
                houses.push(new Housing(house, pixelCoords.x, pixelCoords.y));
                houses[0].draw(0, 0)
            }
            
        }
        buildingButtons.length = 0;
        player.currentAction = 0;
    }
}  


function makeBuildingButtons() {
    let step = 43;
    let yInit = 63;
    let building = 0;

    for (let i = 0; i < 4; i++) {
        let xInit = 75;
        for (let j = 0; j < 2; j++ ) {
            Button.constructButton(buildingButtons, xInit, yInit, 28, 27, `build${buildings[building]}`);
            
            
            building += 1;
            xInit += step;
        }
        yInit += step;
    }
}
