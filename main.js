const ctx = document.getElementById("canvas").getContext("2d");
const size = 100;


class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    x;
    y;
    z;
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
// class Hex {
//     constructor(points) {
//         this.points = points;
//     }

//     create_grid() {
//         ctx.beginPath();
//         ctx.moveTo(this.points[0].x, this.points[0].y);
//         for (let i = 1; i < this.points.length; i++) {
//             ctx.lineTo(this.points[i].x, this.points[i].y);
//         }
//         ctx.lineTo(this.points[0].x, this.points[0].y)
//         ctx.stroke();
//     }
// }



class Hex {
    /**
     * @param {Point} center 
     */
    constructor(center) {
        this.centerX = center.x;
        this.centerY = center.y;
        this.height = Math.sqrt(3) * size;
        this.width = 2 * size;
    }    
    static cube_to_axial(cube){
        var q = cube.x
        var r = cube.z
        return Hex(q, r)
    }
    static axial_to_cube(hex){
        var x = hex.q
        var z = hex.r
        var y = -x-z
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
    return Point(x, y)
}

function hex_coords(center, size, number) {
    let angle = Math.PI / 180 * (60 * number);
    return new Point(center.x + size * Math.cos(angle), center.y + size * Math.sin(angle));
}

let points = [];
for (let i = 0; i <= 5; i++) {
    points.push(hex_coords(new Point(200, 200), 100, i));
}


let hex = new Hex(points);
hex.create_grid();


function gameLoop() {
///Calculations


    //Animation
    

    requestAnimationFrame(gameLoop)
}