import { map, camera, mapArray, tile, listOfButtons, biomes, scrollSpeed, size, ctx, mapSeed, origo, hexSpritesheet, HUDSprite, degrees60, loadedHeight, loadedWidth, player, mapWidth, mapHeight } from './constants/index.js'
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
// import { Vector } from './libraries/vector.js';
import { HUD, Button } from './libraries/hud.js';
import { loadHandler } from './loadHandler.js';
import { keyHandlerDown, keyHandlerUp, mouseHandler } from './libraries/inputHandler.js';
import { fpsCounter } from './libraries/fpsCounter.js';


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

function drawTile(tile, coords) 
{

    const spriteWidth = 64;
    const spriteHeight = 56;

    const width = size * 2;
    const height = size * Math.sqrt(3);

    const spriteX = width * tile.x;
    const spriteY = height * tile.y;

    const pointCenter = Hex.hexToPixel(coords);

    const pointStartTile = new Point2D(pointCenter.x-width/2,pointCenter.y-height/2);

    // console.log(`${hexSpritesheet}, ${spriteX}, ${spriteY}, ${spriteWidth}, ${spriteHeight},${pointStartTile.x},${pointStartTile.y}, ${width}, ${height}`)

    ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight,pointStartTile.x,pointStartTile.y, width, height);
}




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

//draws around centre
// function drawHexagon(x, y) 
// {
//     ctx.beginPath();
//     for (let i = 0; i < 6; i++) {
//         ctx.lineTo(x + size * Math.cos(degrees60 * i), y + size * Math.sin(degrees60 * i));
//     }
//     ctx.closePath();
//     ctx.stroke();
// }

/**
 * @param {Number} width width of the grid
 * @param {Number} height height of the grid
 */

function drawGrid()
{
    for 
    (
        let x = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2)-1; 
        x < loadedWidth + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2+1); 
        x++
    ) 
    {
        for 
        (
            let y = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2)-1;
            y < loadedHeight + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2+1); 
            y++
        )
        {   
            // if(x < 0) {
            //     // console.log(y)
            //     biomes[x] = [];
            //     mapArray[x] = [];
            //     biomes[x][y] = getBiome(new Point2D(x,y));
            
            //     mapArray[x][y] = new Hex(new Point2D(x,y));
            // //    console.log(biomes[x][y])
            //     drawTile(biomes[x][y], new Point2D(x,y));
            // }
            // if (y < 0) {
            //     console.log(biomes[x][y].y)
            //     console.log(biomes[x][y].x)
            // }
            drawTile(biomes[x][y], new Point2D(x,y));

            let hexCoord = Hex.hexToPixel(new Point2D(x,y));
            if (map.mapHexes[x][y].building == 1){
                // console.log(mapArray[x][y])
                ctx.fillRect(hexCoord.x-5,hexCoord.y-5,10,10)
            }

        }
    }
}



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
    for (let x = mapWidth; x > -mapWidth; x--) {
        mapArray[x] = new Array(mapHeight);
        biomes[x] = new Array(mapHeight);
        for (let y = mapHeight; y > -mapHeight; y--) {   
            mapArray[x][y] = new Hex(new Point2D(x,y));
            biomes[x][y] = getBiome(new Point2D(x,y));
        }
    }
 
}


if(loadHandler()) {

    loadMap();
    gameLoop();
}

