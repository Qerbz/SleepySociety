import { Hex } from './hex.js';
import { Point2D } from './point2d.js';
import { ctx, loadedHeight, loadedWidth, origo, hexSpritesheet, biomes, map, size } from '../constants/index.js';


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
    for 
    (
        let x = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2)-1; 
        x < loadedWidth + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).x/2+1); 
        x++
    ) 
    {
        for 
        (
            let y = Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2)-1;
            y < loadedHeight + Math.round(Hex.pixelToHex(new Point2D(-origo.x,-origo.y)).y/2+1); 
            y++
        )
        {   
            // if(x < 0) {
            //     // console.log(y)
            //     biomes[x] = [];
            //     mapArray[x] = [];
            //     biomes[x][y] = getBiome(new Point2D(x,y));
            
            //     mapArray[x][y] = new Hex(new Point2D(x,y));
            // //    console.log(biomes[x][y])
            //     drawTile(biomes[x][y], new Point2D(x,y));
            // }
            // if (y < 0) {
            //     console.log(biomes[x][y].y)
            //     console.log(biomes[x][y].x)
            // }
            drawTile(biomes[x][y], new Point2D(x,y));

            let hexCoord = Hex.hexToPixel(new Point2D(x,y));
            if (map.mapHexes[x][y].building == 1){
                // console.log(mapArray[x][y])
                ctx.fillRect(hexCoord.x-5,hexCoord.y-5,10,10)
            }

        }
    }
}