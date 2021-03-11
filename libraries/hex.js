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
     * @param {Point2D} point2D 
     */
    static hexToPixel(point2D) {
        let x = size * (3/2 * point2D.x) + size + origo.x; // creating an x-basis vector from origin to the hexagon that is clicked, giving its central x- coordinate
        let y = size * (Math.sqrt(3)/2 * point2D.x  +  Math.sqrt(3) * point2D.y) + (size * Math.sin(Math.PI/3)) + origo.y; // creating an y-basis vector from origin to the hexagon that is clicked, giving its central y- coordinate
        return new Point2D(x, y);
    }


    /**
     * 
     * @param {Point2D} point2D 
     */
    static pixelToHex (point2D){
        let px = point2D.x - size - origo.x; // Changing the initial x coordinate to the middle of the top left hexagon
        let py = point2D.y - ((Math.sqrt(3) * size)/2) - origo.y; // Changing the initial y coordinate to the middle of the top left hexagon
       
        
      
        let q = ( 2/3 * px) / size; // using the inverted function from hexToPixel function to get x from hex-coord
        let r = (-1/3 * px  +  Math.sqrt(3)/3 * py) / size; // using the inverted function from hexToPixel function to get y from hex-coord

        let point = this.cubeToAxial(this.hexRound(this.axialToCube(new Point2D(q, r))));

        point.y += Math.floor(point.x/2)
        // console.log(`${point.x}, ${point.y}`)
        return point;
    }
}