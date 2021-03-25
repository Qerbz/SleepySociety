import { mapArray, listOfButtons, biomes, scrollSpeed, ctx, origo, hexSpritesheet, HUDSprite, mapWidth, mapHeight } from './constants/index.js'
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
import { HUD, Button } from './libraries/hud.js';
import { loadHandler } from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';
import drawGrid from './libraries/draw.js';
import getBiome from './libraries/biomes.js';


ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.font = "20px Arial"
ctx.lineWidth = 2;

hexSpritesheet.src = "img/hexagonTerrain_sheet.png";
HUDSprite.src = "img/hud.png";

Button.constructButton(listOfButtons, 10,50,40,40,"testBuild")
const hud = new HUD(listOfButtons,[]);


document.addEventListener("keyup", keyHandlerUp)
document.addEventListener("keydown", keyHandlerDown)
document.addEventListener("click", function(e) {mouseHandler(e, hud)})


//PROOF OF CONCEPT. DOESN'T SAVE ANYTHING OF NOTE AS NOTHING HAS YET HAPPENED IN THE GAME. TODO: ADD AUTOSAVE EVERY 5 MINUTESx
// const mapJSON = JSON.stringify(map);
// localStorage.setItem("mapJSON", mapJSON);



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

function loadMap() {
    for (let x = mapWidth; x > 0; x--) {
        mapArray[x] = new Array(mapHeight);
        biomes[x] = new Array(mapHeight);
        for (let y = mapHeight; y > 0; y--) {   
            mapArray[x][y] = new Hex(new Point2D(x,y));
            biomes[x][y] = getBiome(new Point2D(x,y));
        }
    }
 
}


if(loadHandler()) {
    loadMap();
    gameLoop();
}

