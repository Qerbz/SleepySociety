import { map, mapArray, mapHeight, mapWidth, size, listOfButtons,scrollSpeedVector, ctx, origo, hexSpritesheet, HUDSprite, canvas } from './constants/index.js'
import { HUD, Button } from './libraries/hud.js';
import { loadHandler } from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';
import drawGrid from './libraries/draw.js';
import Resource from './libraries/resources.js';
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';



ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.font = "20px Arial"
ctx.lineWidth = 2;

hexSpritesheet.src = "img/hexagonTerrain_sheet.png";
HUDSprite.src = "img/hud.png";

Button.constructButton(listOfButtons, 10,50,40,40,"testBuild")
const hud = new HUD(listOfButtons,[]);


document.addEventListener("keyup", keyHandlerUp);
document.addEventListener("keydown", keyHandlerDown);
document.addEventListener("click", function(e) {mouseHandler(e, hud)});


//PROOF OF CONCEPT. DOESN'T SAVE ANYTHING OF NOTE AS NOTHING HAS YET HAPPENED IN THE GAME. TODO: ADD AUTOSAVE EVERY 5 MINUTES
const mapJSON = JSON.stringify(map);
localStorage.setItem("mapJSON", mapJSON);

function gameLoop() {
    //Calculations
    origo.add(scrollSpeedVector);
    if (origo.x > -100) origo.x = -100;
    if (origo.y > -100) origo.y = -100;

    console.log(origo.y + " " + (-Hex.hexToPixel(new Point2D(0,mapHeight)).y+origo.y + canvas.height+200));

    if (origo.y < -Hex.hexToPixel(new Point2D(0,mapHeight)).y + origo.y + canvas.height + 200) {
    
        origo.y = -Hex.hexToPixel(new Point2D(0,mapHeight)).y + origo.y + canvas.height + 200;
    
    }

    if (origo.x < -Hex.hexToPixel(new Point2D(mapWidth,0)).x + origo.x + canvas.width + 200) {
    
        origo.x = -Hex.hexToPixel(new Point2D(mapWidth,0)).x + origo.x + canvas.width + 200;
    
    }
    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
    
    //fpsCounter()
    requestAnimationFrame(gameLoop);
}




if(loadHandler()) {
    gameLoop();
}

