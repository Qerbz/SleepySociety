import { elementsToBeLoaded, HUDSprite, hexSpritesheet } from './constants/index.js';



export function loadHandler() {
   
    let loadedElements = 0;
    function loading() 
    {
        loadedElements += 1;
        console.log(`${loadedElements}/${elementsToBeLoaded} loaded ` + Math.round(loadedElements/elementsToBeLoaded*100) + "%");
        if (loadedElements == elementsToBeLoaded) 
        {
            console.log(`${loadedElements}/${elementsToBeLoaded} loaded Game initializing`);
            
        }
    }


    function load() {
    
        hexSpritesheet.onload = loading();
        HUDSprite.onload = loading();
        return true;
    }
    if(load()) {
        return true;
    }
}