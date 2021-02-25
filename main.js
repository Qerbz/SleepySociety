const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 32;
const degrees60 = 2 * Math.PI / 6;
const elementsToBeLoaded = 2;
let loadedElements = 0;


class Point2D {
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x, y)  {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} z 
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Hex {
    /**
     * 
     * @param {Point3D} point3D 
     */
    constructor(point) {
        this.point = point;
        this.height = Math.sqrt(3) * size;
        this.width = 2 * size;

        this.x = point.x;
        this.y = point.y;
        this.z = point.z;

    }
    /**
     * 
     * @param {Point3D} point3D 
     */
    static cubeToAxial(point3D) {
            return new Point2D(point3D.x, point3D.z);
        }
        /**
         * 
         * @param {Point2D} point2D 
         */
    static axialToCube(point2D) {
        let x = point2D.x;
        let z = point2D.y;
        let y = -x - z;
        return new Point3D(x, y, z);
    }
    static hexToPixel(hex){
        let x = size * (3/2 * hex.q) 
        let y = size * (Math.sqrt(3)/2 * hex.q  +  Math.sqrt(3) * hex.r) 
        console.log(hex.q);
        console.log(hex.z);
        return new Point2D(x, y)
    }
}

let camera = {
    x: 100,
    y: 100
}
let tile = {
    water: new Point2D(0, 0),
    sand: new Point2D(1, 0),
    grass: new Point2D(2, 0),
    dirt: new Point2D(3, 0)
}

function drawTile(tile, x, y) {
    const spriteWidth = 64
    const spriteHeight = 56

    let width = size * 2;
    let height = size * Math.sqrt(3);

    let spriteX = width * tile.x;
    let spriteY = height * tile.y;

    ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight, x, y, width, height);
}

function loading() {
    loadedElements += 1;
    if (loadedElements = elementsToBeLoaded) {
        init()
    }
}



function hex_coords(center, size, number) {
    let angle = Math.PI / 180 * (60 * number);
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

let points = [];
for (let i = 0; i <= 5; i++) {
    points.push(hex_coords(new Point2D(200, 200), size, i));
}



// const degrees60 = 2 * Math.PI / 6;

function init() {
    gameLoop()
}

/**
 * @param {Number} x x-coordinate of where you want to draw the 
 */

function drawHexagon(x, y) {
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

function drawGrid(width, height) {
    for (let x = size, i = 0, y; x + size * (1 + Math.cos(degrees60)) < width; x += size * (1 + Math.cos(degrees60)), i++) {
        for (i % 2 === 1 ? y = 2 * size * Math.sin(degrees60) : y = size * Math.sin(degrees60); y + size * Math.sin(degrees60) < height; y += 2 * size * Math.sin(degrees60)) {
            drawHexagon(x, y);
            document.addEventListener('mousemove', (event) => {
                console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
            });
        }
    }
}

drawGrid(canvas.width, canvas.height);

function gameLoop() {
    //Calculations


    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTile(tile.water, 0, 9);
    drawGrid(canvas.width, canvas.height);

    //Animation
    ctx.clearRect(0, 0, canvas.widht, canvas.height);


    requestAnimationFrame(gameLoop)
}

let hexSpritesheet = new Image();
hexSpritesheet.src = "hexagonTerrain_sheet.png";
hexSpritesheet.onload = loading();