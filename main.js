

// const elementsToBeLoaded = 2;
// let loadedElements = 0;
let origo = new Vector(0,0);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scrollSpeed = new Vector(0,0);
const mapHeight = 100;
const mapWidth = 100;
const mapSeed = Math.random();
const loadedWidth = (Math.ceil(canvas.width/((3/2)*size))+1);
const loadedHeight = (Math.ceil(canvas.height/(size*(Math.sqrt(3))))+1);
let lastCalledTime;
let fps;
ctx.lineWidth = 2;
ctx.font = "30px Arial";

hexSpritesheet.src = "img/hexagonTerrain_sheet.png";
HUDSprite.src = "img/hud.png";

let scrollSpeed = new Vector(0,0);

// let origo = new Vector(0,0);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


ctx.lineWidth = 2;


const listOfButtons = [];
Button.constructButton(listOfButtons, 10,50,40,40,"testBuild")
let hud = new HUD(listOfButtons,[]);

function mouseHandler(e)
{
   
    let pointerPos = new Point2D(e.clientX, e.clientY);

    console.log(pointerPos);
    console.log(Hex.pixelToHex(pointerPos));
    for (let i = 0; i < hud.buttonsList.length; i++) {
        if(hud.buttonsList[i].pointIsWithin(pointerPos)) {
            console.log(hud.buttonsList[i].name);
            if (hud.buttonsList[i].name == "build") {
                console.log("build");
            }
        }
    }
}




document.onkeydown = keyHandlerDown;
document.onkeyup = keyHandlerUp;
document.onclick = mouseHandler;

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

const points = [];
for (let i = 0; i <= 5; i++) 
{
    points.push(hex_coords(new Point2D(200, 200), size));
}


/**
 * 
 * @param {Number} x x-coordinate of the tile.
 * @param {Number} y y-coordinate of the tile.
 * @returns returns a tile.
 */

function getBiome(coords) {
    const freq = 0.15;
    noise.seed(mapSeed);
    const e =  (1 * noise.perlin2(1 * coords.x, 1 * coords.y) +  0.5 * noise.perlin2(2 * coords.x, 2 * coords.y) + 0.25 * noise.perlin2(4 * coords.x, 4 * coords.y) + 1) / 2;
    const elevation = e / (1 + 0.5 + 0.25);
    noise.seed(mapSeed / 2);
    const m = (1 * noise.perlin2(1 * coords.x, 1 * coords.y) +  0.5 * noise.perlin2(2 * coords.x, 2 * coords.y) + 0.25 * noise.perlin2(4 * coords.x, 4 * coords.y) + 1) / 2;
    const magnitude = m / (1 + 0.5 + 0.25);
    return biome(elevation);
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

//draws around centre
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

function drawGrid()
{
    for 
    (
        let x = Math.floor(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2)-1; 
        x < loadedWidth + Math.floor(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2); 
        x++
    ) 
    {
        for 
        (
            let y = Math.floor(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2)-1;
            y < loadedHeight + Math.floor(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2); 
            y++
        )
        {
            let hexCoord = Hex.hexToPixel(new Point2D(x,y));
            drawTile(getBiome(new Point2D(x,y)), new Point2D(x,y));
            //drawHexagon(hexCoord.x,hexCoord.y);
        }
    }
}

// document.addEventListener('mousemove', (event) => {
//     console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
// });

function keyHandlerDown(e)
{
    if (e.key == "ArrowDown")
    {
        scrollSpeed.y = -1;
    }
    else if (e.key == "ArrowUp")
    {
        scrollSpeed.y = 1;
    }
    else if (e.key == "ArrowRight")
    {
        scrollSpeed.x = -1;
    }
    else if (e.key == "ArrowLeft")
    {
        scrollSpeed.x = 1;
    }
    else 
    {
    }
}



function gameLoop() {
    //Calculations
    origo.add(scrollSpeed.normalize()*10);
    
    if(!lastCalledTime){
        lastCalledTime = Date.now();
        fps = 0;
    }
    delta = (Date.now() - lastCalledTime)/1000;
    lastCalledTime = Date.now();
    fps = 1/delta;


    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,60,40);
    ctx.fillStyle = "black";
    ctx.fillText(Math.round(fps),10,30);

    //ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);

    requestAnimationFrame(gameLoop);
}

function init() 
{
    gameLoop()
}

if(loadHandler()) {
    init();
}
