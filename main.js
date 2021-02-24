const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 100;


class Point2D {
    /**
     * 
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x, y) {
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
    constructor(x,y,z){
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
        this.point3D = point;
        this.height = Math.sqrt(3) * size;
        this.width = 2 * size;
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
        let z = point2D.z;
        let y = -x - z;
        return new Point3D(x, y, z);
    }
    static hexToPixel(hex){
        let x = size * (3/2 * hex.q) 
        let y = size * (Math.sqrt(3)/2 * hex.q  +  Math.sqrt(3) * hex.r) 
        return new Point(x, y)
    }
}

let camera = {
    x: 100,
    y: 100
}

function pixel_to_flat_hex(pixelPoint){
    var x = ( 2./3 * point.x                        ) / size
    var y = (-1./3 * point.x  +  sqrt(3)/3 * point.y) / size
    return hex_round(Hex(q, r))
}

function hex_coords(center, size, number) {
    let angle = Math.PI / 180 * (60 * number);
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

let points = [];
for (let i = 0; i <= 5; i++) {
    points.push(hex_coords(new Point2D(200, 200), size, i));
}

const degrees60 = 2 * Math.PI / 6;

function init() {
    gameLoop()
}

/**
 * @param {Number} x x-coordinate of where you want to draw the 
 */

function drawHexagon(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(degrees60 * i), y + r * Math.sin(degrees60 * i));
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * @param {Number} width width of the grid
 * @param {Number} height height of the grid
 */

function drawGrid(width, height) {
    for (let y = size; y + size * Math.sin(degrees60a) < height; y += size * Math.sin(degrees60)) {
        for (let x = size, j = 0; x + size * (1 + Math.cos(degrees60)) < width; x += size * (1 + Math.cos(degrees60)), y += (-1) ** j++ * size * Math.sin(degrees60)) {
            drawHexagon(x, y);
        }
    }
}

function gameLoop() {
    //Calculations
    

    //Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(canvas.width, canvas.height);

    requestAnimationFrame(gameLoop)
}


init();