import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { ctx, loadedHeight, loadedWidth, origo, hexSpritesheet, map, size, mapArray } from '../constants/index.js';


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

    // console.log(`${hexSpritesheet}, ${spriteX}, ${spriteY}, ${spriteWidth}, ${spriteHeight},${pointStartTile.x},${pointStartTile.y}, ${width}, ${height}`)

    ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight,pointStartTile.x,pointStartTile.y, width, height);
}

export default function drawGrid()
{
    let loadX = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2)-2;
    let loadY = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2)-2;
    for 
    (
        let x = loadedWidth + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2+1);
        x > loadX; 
        x--
    ) 
    {
        for 
        (
            let y = loadedHeight + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2+1);
            y > loadY; 
            y--
        )
        {   
            drawTile(mapArray[x][y].tile, new Point2D(x,y));

            let hexCoord = Hex.hexToPixel(new Point2D(x,y));
            if (map.mapHexes[x][y].building == 1){
                // console.log(mapArray[x][y])
                ctx.fillRect(hexCoord.x-5,hexCoord.y-5,10,10)
            }

        }
    }
}