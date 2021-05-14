import { buildingsSprite,  buildingTypes, buildings, buildingButtons, interactButtons, scrollSpeedVector, scrollSpeed, player, map, origo } from '../constants/index.js';
import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { Button } from './hud.js';
import { Vector } from './vector.js';
import { Commercial, Housing } from './buildings.js';
import { Queue } from './person.js';
import { findIndexButtonlist } from './utils.js';


export function cameraMovement(keys) {
    if (keys.indexOf("ArrowUp") !== -1 && keys.indexOf("ArrowUp") > keys.indexOf("ArrowDown")) scrollSpeedVector.y = scrollSpeed;

    if (keys.indexOf("ArrowDown") !== -1 && keys.indexOf("ArrowDown") > keys.indexOf("ArrowUp")) scrollSpeedVector.y = -scrollSpeed;

    if (keys.indexOf("ArrowRight") !== -1 && keys.indexOf("ArrowRight") > keys.indexOf("ArrowLeft")) scrollSpeedVector.x = -scrollSpeed;
    
    if (keys.indexOf("ArrowLeft") !== -1 && keys.indexOf("ArrowLeft") > keys.indexOf("ArrowRight")) scrollSpeedVector.x = scrollSpeed;
}

export function mouseHandler(e, hud) {
    const pointerPos = new Point2D(e.clientX, e.clientY);
    const hexCoords = Hex.pixelToHex(pointerPos);
    const hudButtonIndex = findIndexButtonlist(hud.buttonsList, "hudButton");
    
    if (e.which == 3){
        player.avatar.newDestination(new Vector (pointerPos.x - origo.x, pointerPos.y - origo.y));
    }
    else{
        if (player.currentAction === 0) {
            for (let i = 0; i < hud.buttonsList.length; i++) 
            {
                if(hud.buttonsList[i].pointIsWithin(pointerPos)) 
                {
                    console.log(hud.buttonsList[i].name)
                    if (hud.buttonsList[i].name === "buildMenu") 
                    {
                        player.currentAction = "buildMenu";
                        return 0;  
                    }
                }
            }
            if(!((pointerPos.x > 0 && pointerPos.x < 118) && (pointerPos.y > 39 && pointerPos.y < 399))) {
                player.currentAction = 
                {
                    name: "interact",
                    hexCoords: new Point2D(hexCoords.x,hexCoords.y)
                };
                let buttonStartLoc = Hex.hexToPixel(player.currentAction.hexCoords);
                for (let i = 0; i < 3; i++)
                {
                    Button.constructButton(interactButtons,buttonStartLoc.x + i*100,buttonStartLoc.y,100,100,"interact"+i);
                }
                console.log(hud.buttonsList);
                return 0;
            }
           
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
            if(hud.buttonsList[hudButtonIndex].pointIsWithin(pointerPos)) {
                player.currentAction = 0;
            }
            else {
                map.mapHexes[hexCoords.x][hexCoords.y].building = 1;
                if(checkHouse(hexCoords)) buildings[hexCoords.x][hexCoords.y] = new Housing(buildingsSprite, hexCoords.x, hexCoords.y)
            }
            
        }


        else if (player.currentAction === "buildCommercial") {
            if(hud.buttonsList[hudButtonIndex].pointIsWithin(pointerPos)) {
                player.currentAction = 0;
            }
            else {
                map.mapHexes[hexCoords.x][hexCoords.y].building = 1;  
                if(checkHouse(hexCoords)) buildings[hexCoords.x][hexCoords.y] = new Commercial(buildingsSprite, hexCoords.x, hexCoords.y);
            }
        }
               
        if (player.currentAction.name === "interact"){
            
            for (let i = 0; i < interactButtons.length; i++) 
            {
                if(interactButtons[i].pointIsWithin(pointerPos)) 
                {
                    if (interactButtons[i].name === "interact0") 
                    {
                        
                        interactButtons.splice(0,interactButtons.length);
                        player.currentAction = 0;
                        return 0;  
                    }
                }
            }
        }

        buildingButtons.splice(0, buildingButtons.length);
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