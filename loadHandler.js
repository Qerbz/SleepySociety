import { mapArray, mapWidth, mapHeight, elementsToBeLoaded, HUDSprite, hexSpritesheet, buildingsSprite } from './constants/index.js';
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
import getBiome from './libraries/biomes.js';
   
let loadedElements = 0;
function loading() 
{
    loadedElements += 1;
    console.log(`${loadedElements}/${elementsToBeLoaded} loaded ` + Math.round(loadedElements/elementsToBeLoaded*100) + "%");
}

export function isLoaded(){
    if (loadedElements == elementsToBeLoaded) 
    {
        console.log(`${loadedElements}/${elementsToBeLoaded} elements loaded. Game initializing`);
        return true;
    }
}


export function load() {

    hexSpritesheet.onload = loading();
    HUDSprite.onload = loading();
    buildingsSprite.onload = loading();
    if(loadMap())   loading();
}


function loadMap() {
    for (let x = mapWidth; x > 0; x--) {
        mapArray[x] = new Array(mapHeight);
        for (let y = mapHeight; y > 0; y--) {   
            mapArray[x][y] = new Hex(new Point2D(x,y));
            mapArray[x][y].tile = getBiome(new Point2D(x,y));
        }
    }
    return true;
    
}
