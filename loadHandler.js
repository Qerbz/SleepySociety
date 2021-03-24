import { elementsToBeLoaded, HUDSprite, hexSpritesheet } from './constants/index.js';


//FIX: INITS BEFORE EVERYTHING IS LOADED
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
        else{
            return false;
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