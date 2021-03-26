import { mapArray, mapWidth, mapHeight, elementsToBeLoaded, HUDSprite, hexSpritesheet } from './constants/index.js';
import { Hex } from './libraries/hex.js';
import { Point2D } from './libraries/point2d.js';
import getBiome from './libraries/biomes.js';

export function loadHandler() {
   
    let loadedElements = 0;
    function loading() 
    {
        loadedElements += 1;
        console.log(`${loadedElements}/${elementsToBeLoaded} loaded ` + Math.round(loadedElements/elementsToBeLoaded*100) + "%");
        if (loadedElements == elementsToBeLoaded) 
        {
            console.log(`${loadedElements}/${elementsToBeLoaded} loaded Game initializing`);
            return true;
            
        }
    }


    function load() {
    
        hexSpritesheet.onload = loading();
        HUDSprite.onload = loading();
        loadMap();
        return true;
    }
    function loadMap() {
        for (let x = mapWidth; x > 0; x--) {
            mapArray[x] = new Array(mapHeight);
            for (let y = mapHeight; y > 0; y--) {   
                mapArray[x][y] = new Hex(new Point2D(x,y));
                mapArray[x][y].tile = getBiome(new Point2D(x,y));
            }
        }
     
    }
    if(load()) {
        return true;
    }
}