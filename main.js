const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 32;
const degrees60 = 2 * Math.PI / 6;
// const elementsToBeLoaded = 2;
// let loadedElements = 0;
let origo = new Vector(0,0);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scrollSpeed = new Vector(0,0);
const mapHeight = 100;
const mapWidth = 100;
const mapSeed = Math.random();

class Button
{
    pointStartButton;
    pointEnd;
    name;

    constructor(point2DStart, point2DEnd, name)
    {
        this.pointStartButton = point2DStart;
        this.pointEndButton = point2DEnd;
        this.name = name;
    }

    pointIsWithin(point)
    {
        if ((this.pointStartButton.x <= point.x && point.x <= this.pointEndButton.x )&&(this.pointStartButton.y <= point.y && point.y <= this.pointEndButton.y))
        {
            return true;
        }
        else{return false;}
    }
}

function constructButton(startx,starty,width,height,name){
    listOfButtons.push(new Button(new Point2D(startx,starty), new Point2D(startx+width,starty+height),name));
}

const listOfButtons = [];
constructButton(10,50,40,40,"testBuild")
let hud = new HUD(listOfButtons,[]);

const camera = 
{
    x: 100,
    y: 100
}

const tile = 
{
    water: new Point2D(0, 0),
    sand: new Point2D(1, 0),
    grass: new Point2D(2, 0),
    dirt: new Point2D(3, 0)
}

const mapArray = [];

for (let x = 0; x < 100; x++)
{
    mapArray.push([]);
    for (let y = 0; y < 100; y++)
    {
        mapArray[x].push(new Hex(new Point2D(x,y)))
    }
}

const map = 
{
    mapHexes: mapArray,
    mapSeed: mapSeed
}
//PROOF OF CONCEPT. DOESN'T SAVE ANYTHING OF NOTE AS NOTHING HAS YET HAPPENED IN THE GAME. TODO: ADD AUTOSAVE EVERY 5 MINUTESx
// const mapJSON = JSON.stringify(map);
// localStorage.setItem("mapJSON", mapJSON);

function drawTile(tile, point2D) 
{
    const spriteWidth = 64;
    const spriteHeight = 56;

    const width = size * 2;
    const height = size * Math.sqrt(3);

    const spriteX = width * tile.x;
    const spriteY = height * tile.y;

    const pointCenter = Hex.hexToPixel(point2D);

    const pointStartTile = new Point2D(pointCenter.x-width/2,pointCenter.y-height/2);

    ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight,pointStartTile.x,pointStartTile.y, width, height);
}




function hex_coords(center, size, number) 
{
    const angle = Math.PI / 180 * (60 * number);
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

const points = [];
for (let i = 0; i <= 5; i++) 
{
    points.push(hex_coords(new Point2D(200, 200), size, i));
}


function init() 
{
    gameLoop()
}

/**
 * 
 * @param {Number} x x-coordinate of the tile.
 * @param {Number} y y-coordinate of the tile.
 * @returns returns a tile.
 */

function getBiome(x, y)
{
    const freq = 0.01;
    noise.seed(mapSeed);
    const e = (noise.perlin2(freq * x, freq * y) + 1) / 2;
    // noise.seed(mapSeed / 2);
    // const m = (noise.perlin2(freq * x, freq * y) + 1) / 2;
    return biome(e);
}

/**
 * 
 * @param {Number} e A value between 0 and 1.
 * @returns Returns a tile based on the value of e.
 */

function biome(e)
{
    if (e < 0.25) return tile.water;
    else if (e < 0.5) return tile.sand;
    else if (e < 0.75) return tile.grass;
    else return tile.dirt;
}

function drawHexagon(x, y) 
{
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + size * Math.cos(degrees60 * i), y + size * Math.sin(degrees60 * i));
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * @param {Number} width width of the grid
 * @param {Number} height height of the grid
 */

function createGrid(width, height) 
{
    const arr = new Array();
    for (let x = size + origo.x, i = 0, y; x + size * (1 + Math.cos(degrees60)) <= width; x += size * (1 + Math.cos(degrees60)), i++) 
    {
        for (i % 2 === 1 ? y = 2 * size * Math.sin(degrees60) + origo.y : y = size * Math.sin(degrees60) + origo.y; y + size * Math.sin(degrees60) <= height; y += 2 * size * Math.sin(degrees60)) 
        {
            const tileBiome = getBiome(x, y);
            arr.push(new Array(tileBiome, new Point2D(x, y)));
        }
    }
    console.log(arr);
    return arr;
}

function drawGrid(arr)
{
    for (e in arr) {
        drawTile(arr[e][0], arr[e][1]);
        drawHexagon(arr[e][1].x, arr[e][1].y);
    }
}

// document.addEventListener('mousemove', (event) => {
//     console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
// });

function keyHandlerDown(e)
{
    if (e.key == "ArrowDown")
    {
        scrollSpeed.y = -10;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeed.y = 10;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeed.x = -10;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeed.x = 10;
    }
    else 
    {
    }
}

function keyHandlerUp(e)
{
    if (e.key == "ArrowDown")
    {
        scrollSpeed.y = 0;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeed.y = 0;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeed.x = 0;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeed.x = 0;
    }
    else 
    {
    }
}

function mouseHandler(e)
{
    pointerPos = new Point2D(e.clientX, e.clientY);
    
    axialHex = Hex.pixelToHex(pointerPos);
    // console.log("k");
   let i=0;
    while(i<hud.buttonsList.length)
    {
       if(hud.buttonsList[i].pointIsWithin(pointerPos))
       {
           console.log(hud.buttonsList[i].name);
           switch (hud.buttonsList[i].name) {
               case "build":
                   console.log("build");
                   break;
           
               default:
                   break;
           }
       }
       i++;
    }
}

document.onkeydown = keyHandlerDown;
document.onkeyup = keyHandlerUp;
document.onclick = mouseHandler;

const gridArray = createGrid(300, 300);

function gameLoop() {
    //Calculations
    origo.add(scrollSpeed);

    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawTile(tile.water,new Point2D(0,0));
    // drawTile(tile.sand,new Point2D(0,1));
    drawGrid(gridArray);
    //ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);

    requestAnimationFrame(gameLoop);
}

load();
