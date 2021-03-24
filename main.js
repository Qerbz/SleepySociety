import { map, mapArray, tile, listOfButtons, biomes, scrollSpeed, size, ctx, mapSeed, origo, hexSpritesheet, HUDSprite, degrees60, loadedHeight, loadedWidth, mapWidth, mapHeight } from './constants/index.js'
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
// import { Vector } from './libraries/vector.js';
import { HUD, Button } from './libraries/hud.js';
import { loadHandler } from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';
import { drawGrid } from './libraries/draw.js';



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






// function hex_coords(center, size, number) 
// {
//     const angle = Math.PI / 180 * (60 * number);
//     return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
// }

// const points = [];
// for (let i = 0; i <= 5; i++) 
// {
//     points.push(hex_coords(new Point2D(200, 200), size, i));
// }


function hex_coords(center, size) 
{
    const angle = degrees60;
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

// const points = [];
// for (let i = 0; i <= 5; i++) 
// {
//     points.push(hex_coords(new Point2D(200, 200), size));
// }


/**
 * 
 * @param {Number} x x-coordinate of the tile.
 * @param {Number} y y-coordinate of the tile.
 * @returns returns a tile.
 */

function getBiome(coords) {
    const freq = 0.1;
    noise.seed(mapSeed);
    const e = (noise.perlin2(coords.x * freq, coords.y * freq) + 1) / 2;
    noise.seed(mapSeed / 2);
    const m = (noise.perlin2(coords.x * freq, coords.y * freq) + 1) / 2;
    return biome(e, m);
}

/**
 * 
 * @param {Number} e A value between 0 and 1.
 * @param {Number} m A value between 0 and 1.
 * @returns Returns a tile based on the value of e and m.
 */

function biome(e, m)
{
    if (e < 0.3) return tile.water;
    if (e < 0.45) return tile.sand;

    else {
        if (m < 0.1) return tile.sand;
        if (m < 0.7) return tile.dirt;
        if (m < 0.9) return tile.grass;
        else return tile.water;
    }
}

/**
 * @param {Number} width width of the grid
 * @param {Number} height height of the grid
 */




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

