const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 32;
const degrees60 = 2 * Math.PI / 6;
const elementsToBeLoaded = 2;
let loadedElements = 0;
let origo = new Vector(0,0);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scrollSpeed = new Vector(0,0);
const mapHeight = 100;
const mapWidth = 100;
const mapSeed = Math.random();



class Point2D 
{
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x, y)  
    {
        this.x = x;
        this.y = y;
    }
}



class Point3D 
{
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} z 
     */
    constructor(x, y, z) 
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Hex 
{
    /**
     * 
     * @param {Point2D} point2D 
     */
    constructor(point2D) 
    {
        this.point2D = point2D;
        this.building = 0;
    }
    /**
     * 
     * @param {Point3D} point3D 
     */
    static cubeToAxial(point3D) 
    {
            return new Point2D(point3D.x, point3D.z);
    }
    /**
     * 
     * @param {Point2D} point2D 
     */
    static axialToCube(point2D)
    {
        let x = point2D.x;
        let z = point2D.y;
        let y = -x - z;
        return new Point3D(x, y, z);
    }

    /**
     * 
     * @param {Point3D} point3D 
     */
    static hexRound(point3D){
        let rx = Math.round(point3D.x)
        let ry = Math.round(point3D.y)
        let rz = Math.round(point3D.z)

        let x_diff = Math.abs(rx - point3D.x)
        let y_diff = Math.abs(ry - point3D.y)
        let z_diff = Math.abs(rz - point3D.z)

        if (x_diff > y_diff && x_diff > z_diff){
            rx = -ry-rz
        }
        else if (y_diff > z_diff){
            ry = -rx-rz
        }
        else{
            rz = -rx-ry
        }

        return new Point3D(rx, ry, rz);
    }


    /**
     * 
     * @param {Hex} hex 
     */
    static hexToPixel(hex) {
        let x = size * (3/2 * hex.point2D.x) + size + origo.x; // creating an x-basis vector from origin to the hexagon that is clicked, giving its central x- coordinate
        let y = size * (Math.sqrt(3)/2 * hex.point2D.y  +  Math.sqrt(3) * hex.point2D.y) + (size * Math.sin(Math.PI/3)) + origo.y; // creating an y-basis vector from origin to the hexagon that is clicked, giving its central y- coordinate
        return new Point2D(x, y);
    }


    /**
     * 
     * @param {Point2D} point2D 
     */
    static pixelToHex (point2D){
        let px = point2D.x - size - origo.x; // Changing the initial x coordinate to the middle of the top left hexagon
        let py = point2D.y - ((Math.sqrt(3) * size)/2) - origo.y; // Changing the initial y coordinate to the middle of the top left hexagon
       
        console.log(`${origo.x}, ${origo.y}`)
      
        let q = ( 2/3 * px) / size; // using the inverted function from hexToPixel function to get x from hex-coord
        let r = (-1/3 * px  +  Math.sqrt(3)/3 * py) / size; // using the inverted function from hexToPixel function to get y from hex-coord

        let point = this.cubeToAxial(this.hexRound(this.axialToCube(new Point2D(q, r))));

        point.y += Math.floor(point.x/2)
       
        return point;
    }
}
class HUD
{
    buttonsList;
    infoLists;
    constructor(buttonsList, infoLists)
    {
        this.buttonsList = buttonsList;
        this.infoLists = infoLists;
    }
}

class button
{
    pointStart;
    pointEnd;
    name;

    constructor(point2DStart, point2DEnd,name)
    {
        this.pointStart = point2DStart;
        this.pointEnd = point2DEnd;
        this.name = name;
    }

    pointIsWithin(point)
    {
        if ((this.pointStart.x <= point.x && point.x <= this.pointEnd.x )&&(this.pointStart.y <= point.y && point.y <= this.pointEnd.y))
        {
            return true;
        }
        else{return false;}
    }
}

let camera = 
{
    x: 100,
    y: 100
}

let tile = 
{
    water: new Point2D(0, 0),
    sand: new Point2D(1, 0),
    grass: new Point2D(2, 0),
    dirt: new Point2D(3, 0)
}

let mapArray = [];

for (let x = 0; x < 100; x++)
{
    mapArray.push([]);
    for (let y = 0; y < 100; y++)
    {
        mapArray[x].push(new Hex(new Point2D(x,y)))
    }
}

let map = 
{
    mapHexes: mapArray,
    mapSeed: seed
}
//PROOF OF CONCEPT. DOESN'T SAVE ANYTHING OF NOTE AS NOTHING HAS YET HAPPENED IN THE GAME. TODO: ADD AUTOSAVE EVERY 5 MINUTESx
let mapJSON = JSON.stringify(map);
localStorage.setItem("mapJSON", mapJSON);

function drawTile(tile, x, y) 
{
    const spriteWidth = 64
    const spriteHeight = 56

    let width = size * 2;
    let height = size * Math.sqrt(3);

    let spriteX = width * tile.x;
    let spriteY = height * tile.y;

    ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight, x, y, width, height);
}

function loading() 
{
    loadedElements += 1;
    console.log(`${loadedElements}/${elementsToBeLoaded} loaded ` + Math.round(loadedElements/elementsToBeLoaded*100) + "%");
    if (loadedElements == elementsToBeLoaded) 
    {
        console.log(`${loadedElements}/${elementsToBeLoaded} loaded Game initializing`);
        init();
    }
}



function hex_coords(center, size, number) 
{
    let angle = Math.PI / 180 * (60 * number);
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

let points = [];
for (let i = 0; i <= 5; i++) 
{
    points.push(hex_coords(new Point2D(200, 200), size, i));
}


function init() 
{
    gameLoop()
}

/**
 * @param {Number} x x-coordinate of where you want to draw the hexagon.
 * @param {Number} y y-coordinate of where you want to draw the hexagon.
 */

function drawHexagon(x, y) 
{
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + size * Math.cos(degrees60 * i), y + size * Math.sin(degrees60 * i));
    }
    ctx.closePath();
    // ctx.fillStyle = getBiome(x, y);
    // ctx.fill();
    ctx.stroke();
}

// function getBiome(x, y) {
//     const freq = 5;
//     noise.seed(mapSeed);
//     const e = (noise.perlin2(freq * x, freq * y) + 1) / 2;
//     noise.seed(mapSeed / 2);
//     const m = (noise.perlin2(freq * x, freq * y) + 1) / 2;
//     return biome(e, m);
// }

// function biome(e, m) {
//     // console.log(`e: ${e}, m: ${m}`);
//    if (e < 0.12) return "rgb(0, 0, 255)";
//     if (e < 0.2) return "rgb(248, 240, 164)";

//     if (e < 0.3) {
//         if (m < 0.16) return "rgb(194, 178, 128)";
//         if (m < 0.50) return "rgb(89, 149, 74)";
//         if (m < 0.83) return "rgb(13, 55, 13)";
//         else return "rgb(0, 46, 37)";
//     }

//     if (e < 0.6) {
//       if (m < 0.33) return "rgb(194, 178, 128)";
//       if (m < 0.66) return "rgb(65, 71, 34)";
//       else return "rgb(255, 195, 11)";
//     }

//     if (e < 0.8) {
//       if (m < 0.1) return "rgb(161, 102, 44)";
//       if (m < 0.2) return "rgb(210, 105, 30)";
//       if (m < 0.5) return "rgb(144, 102, 102)";
//       return "rgb(255, 255, 255)";
//   }

//     if (m < 0.16) return "rgb(194, 178, 128)";
//     if (m < 0.33) return "rgb(89, 149, 74)";
//     if (m < 0.66) return "rgb(138, 183, 51)";
//     else return "rgb(0, 46, 37)";
// }

/**
 * @param {Number} width width of the grid
 * @param {Number} height height of the grid
 */

function drawGrid(width, height) 
{
    for (let x = size + origo.x, i = 0, y; x + size * (1 + Math.cos(degrees60)) < width; x += size * (1 + Math.cos(degrees60)), i++) 
    {
        for (i % 2 === 1 ? y = 2 * size * Math.sin(degrees60) + origo.y : y = size * Math.sin(degrees60) + origo.y; y + size * Math.sin(degrees60) < height; y += 2 * size * Math.sin(degrees60)) 
        {
            drawHexagon(x, y);
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
    
    axialHex = Hex.PixelToHex(pointerPos);
    console.log("k");
   /* let i=0;
    while(i<h.buttonsList.length)
    {
        console.log("b");
       if(h.buttonsList[i].pointIsWithin(pointerPos))
       {
           switch (h.buttonsList[i].name) {
               case "build":
                   console.log("build");
                   break;
           
               default:
                   break;
           }
       }
       i++;
    }*/
}

document.onkeydown = keyHandlerDown;
document.onkeyup = keyHandlerUp;
document.onclick = mouseHandler;

function gameLoop() {
    //Calculations
    origo.add(scrollSpeed);

    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTile(tile.water,origo.x,origo.y);
    drawTile(tile.sand,origo.x+47,origo.y+28)
    drawGrid(canvas.width, canvas.height);
    //ctx.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);

    requestAnimationFrame(gameLoop);
}

var hexSpritesheet = new Image();
hexSpritesheet.src = "hexagonTerrain_sheet.png";
hexSpritesheet.onload = loading();

var HUDSprite = new Image();
HUDSprite.src = "hud.png";
HUDSprite.onload = loading();