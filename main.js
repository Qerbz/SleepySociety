const ctx = document.getElementById("canvas").getContext("2d");
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
     * @param {Point3D} center 
     */
    constructor(center) {
        this.X = center.x;
        this.Y = center.y;
        this.Z = center.z;
        this.height = Math.sqrt(3) * size;
        this.width = 2 * size;
    }    
    static cube_to_axial(cube){
        let q = cube.x
        let r = cube.z
        return Hex(q, r)
    }
    static axial_to_cube(hex){
        let x = hex.q
        let z = hex.r
        let y = -x-z
        return Cube(x, y, z)
    }
}

let camera = {
    x: 100,
    y: 100
}

function flat_hex_to_pixel(hex) {
    let x = size * (     3./2 * hex.q                    )
    let y = size * (sqrt(3)/2 * hex.q  +  sqrt(3) * hex.r)
    return Point2D(x, y)
}

function hex_coords(center, size, number) {
    let angle = Math.PI / 180 * (60 * number);
    return new Point2D(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

let points = [];
for (let i = 0; i <= 5; i++) {
    points.push(hex_coords(new Point2D(200, 200), 100, i));
}


let hex = new Hex(points);
hex.create_grid();

const a = 2 * Math.PI / 6;
const r = 50;

function init() {
    gameLoop()
}



function drawGrid(width, height) {
    let y = r;
    for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
        for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
            drawHexagon(x, y);
        }
    }
}

function drawHexagon(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
}

function gameLoop() {
    //Calculations


    //Animation
    drawGrid(canvas.width, canvas.height);

    requestAnimationFrame(gameLoop)
}


init();