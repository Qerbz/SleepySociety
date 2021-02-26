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
        this.height = Math.sqrt(3) * size;
        this.width = 2 * size;

        this.x = point2D.x;
        this.y = point2D.y;
        

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
        let x = size * (3/2 * hex.x) + size + origo.x;
        let y = size * (Math.sqrt(3)/2 * hex.y  +  Math.sqrt(3) * hex.y) + (size * Math.sin(Math.PI/3)) + origo.y;
        return new Point2D(x, y);
    }

    
    /**
     * 
     * @param {Point2D} point2D 
     */
    static PixelToHex (point2D){
        var x = ((point2D.x - size - origo.x) /size ) * 2/3;
        var y = (point2D.y - size * Math.sin(Math.PI/3) + origo.y)/(size*(Math.sqrt(3)/2 + Math.sqrt(3)))
        return this.cubeToAxial(this.hexRound(this.axialToCube(new Point2D(x, y))))
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
    if (loadedElements = elementsToBeLoaded) 
    {
        init()
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
 * @param {Number} x x-coordinate of where you want to draw the 
 */

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


console.log(`${t.x}, ${t.y}`)

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

document.onkeydown = keyHandlerDown;
document.onkeyup = keyHandlerUp;

drawGrid(canvas.width, canvas.height);

function gameLoop() {
    //Calculations
    origo.add(scrollSpeed);

    //Animation
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawTile(tile.water,origo.x,origo.y);
    // drawTile(tile.sand,origo.x+47,origo.y+28)
    // drawGrid(canvas.width, canvas.height);


    // requestAnimationFrame(gameLoop)
}

let hexSpritesheet = new Image();
hexSpritesheet.src = "hexagonTerrain_sheet.png";
hexSpritesheet.onload = loading();