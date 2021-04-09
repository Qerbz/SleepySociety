import { map, mapArray, mapHeight, mapWidth, size, listOfButtons,scrollSpeedVector, ctx, origo, hexSpritesheet, HUDSprite, canvas, buildingsSprite, buildingHUDSprite, player} from './constants/index.js'
import { HUD, Button } from './libraries/hud.js';
import { isLoaded, load} from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';
import drawGrid from './libraries/draw.js';
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
import { Person } from './libraries/person.js';
import { Vector } from './libraries/vector.js';



ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.font = "20px Arial"
ctx.lineWidth = 2;

hexSpritesheet.src = "./img/hexagonTerrain_sheet.png";
HUDSprite.src = "./img/hud.png";
buildingsSprite.src = "./img/buildings.png";
buildingHUDSprite.src = "./img/buildingHUD.png";



Button.constructButton(listOfButtons, 10,50,40,40,"buildMenu");
const hud = new HUD(listOfButtons,[]);


document.addEventListener("keyup", keyHandlerUp);
document.addEventListener("keydown", keyHandlerDown);
document.addEventListener("mousedown", function(e) {mouseHandler(e, hud)});


//PROOF OF CONCEPT. DOESN'T SAVE ANYTHING OF NOTE AS NOTHING HAS YET HAPPENED IN THE GAME. TODO: ADD AUTOSAVE EVERY 5 MINUTES
//const mapJSON = JSON.stringify(map);
//localStorage.setItem("mapJSON", mapJSON);
player.avatar.destination = new Vector (3000,3000);
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

canvas.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    
    return false;
}, false);

function gameLoop() {
    //Calculations
    origo.add(scrollSpeedVector);
    if (origo.x > -100) origo.x = -100;
    if (origo.y > -100) origo.y = -100;

    if (origo.y < -Hex.hexToPixel(new Point2D(0,mapHeight)).y + origo.y + canvas.height + 200) {
        origo.y = -Hex.hexToPixel(new Point2D(0,mapHeight)).y + origo.y + canvas.height + 200;
    }

    if (origo.x < -Hex.hexToPixel(new Point2D(mapWidth,0)).x + origo.x + canvas.width + 200) {
        origo.x = -Hex.hexToPixel(new Point2D(mapWidth,0)).x + origo.x + canvas.width + 200;
    }
    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    player.avatar.draw(ctx);
    if (typeof player.avatar.destination !== 'undefined'){
        player.avatar.move();
    }
    
    ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
    if (player.currentAction === "buildMenu") {
        ctx.drawImage(buildingHUDSprite, 67, 54);
    }
    fpsCounter()
    requestAnimationFrame(gameLoop);
}

load();
let isLoadedLoop;
isLoadedLoop = setInterval(init(),100);

function init(){
    if(isLoaded()) {
        clearInterval(isLoadedLoop);
        gameLoop();
    }
}

