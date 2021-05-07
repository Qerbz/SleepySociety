import { buildingsSprite,  buildingTypes, buildings, buildingButtons, scrollSpeedVector, scrollSpeed, player, map, origo } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { Button } from './hud.js';
import { Vector } from './vector.js';
import { Commercial, Housing } from './buildings.js';
import { Queue } from './person.js';


export function cameraMovement(keys) {
    if (keys["ArrowUp"]) scrollSpeedVector.y = scrollSpeed;

    if (keys["ArrowDown"]) scrollSpeedVector.y = -scrollSpeed;

    if (keys["ArrowRight"]) scrollSpeedVector.x = -scrollSpeed;
    
    if (keys["ArrowLeft"]) scrollSpeedVector.x = scrollSpeed;
}

export function mouseHandler(e, hud) {
    const pointerPos = new Point2D(e.clientX, e.clientY);
    const hexCoords = Hex.pixelToHex(pointerPos);
    

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
            // If he doesnt left-click on the build hud (not the build menu)
            if(!hud.buttonsList[1].pointIsWithin(pointerPos)) {
                player.currentAction = 
                {
                    name: "interact",
                    hexCoords: hexCoords
                };
            }    
            return 0;
        }

        // If he click on the 
        else if (player.currentAction === "buildMenu") {
       
            makeBuildingButtons();
    
            for (let j = 0; j < buildingButtons.length; j++) {
                if (buildingButtons[j].pointIsWithin(pointerPos)) {
                    player.currentAction = buildingButtons[j].name
                    
                    return 0;
                }
            }
        }

        // If player click on buildHouse button
        else if (player.currentAction === "buildHouse") {
            if(hud.buttonsList[1].pointIsWithin(pointerPos)) {
                player.currentAction = 0;
            }
            else {
                map.mapHexes[hexCoords.x][hexCoords.y].building = 1;
               
                if(checkHouse(hexCoords)) buildings[hexCoords.x][hexCoords.y] = new Housing(buildingsSprite, hexCoords.x, hexCoords.y)
            }
            
        }
        else if (player.currentAction === "buildCommercial") {
            if(hud.buttonsList[1].pointIsWithin(pointerPos)) {
                player.currentAction = 0;
            }
            else {
                map.mapHexes[hexCoords.x][hexCoords.y].building = 1;
               
                if(checkHouse(hexCoords)) buildings[hexCoords.x][hexCoords.y] = new Commercial(buildingsSprite, hexCoords.x, hexCoords.y)
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
            Button.constructButton(buildingButtons, xInit, yInit, 28, 27, `build${buildingTypes[building]}`);
            
            
            building += 1;
            xInit += step;
        }
        yInit += step;
    }
}

function checkHouse(hexCoords) {
    if(typeof(buildings[hexCoords.x]) !== "object") {
        buildings[hexCoords.x] = [];
    }
    if (typeof(buildings[hexCoords.x][hexCoords.y]) !== "object" ) {
        return true;
        
    }
}