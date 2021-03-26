import { map, listOfButtons, scrollSpeed, ctx, origo, hexSpritesheet, HUDSprite } from './constants/index.js'
import { HUD, Button } from './libraries/hud.js';
import { loadHandler } from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';
import drawGrid from './libraries/draw.js';



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
    origo.add(scrollSpeed);
    
    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
    
    fpsCounter()
    requestAnimationFrame(gameLoop);
}



if(loadHandler()) {
    gameLoop();
}

