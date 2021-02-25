var size = 32;

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Hex {
    constructor(point) {
        this.q = point.x;
        this.r = point.y;
    }
    static axialToCube(point2D) {
        let x = point2D.x;
        let z = point2D.y;
        let y = x + z;
        
        return {x: x, y: y, z: z}
    }
}



let point = new Point(1, 1);
let hex = new Hex(point);
let test = flat_hex_to_pixel(hex);
console.log(test.x)
console.log(test.y)
