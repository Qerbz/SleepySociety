const elementsToBeLoaded = 2;
let loadedElements = 0;
var hexSpritesheet = new Image();
hexSpritesheet.src = "img/hexagonTerrain_sheet.png";
var HUDSprite = new Image();
HUDSprite.src = "img/hud.png";

function loading() 
{
    loadedElements += 1;
    console.log(`${loadedElements}/${elementsToBeLoaded} loaded ` + Math.round(loadedElements/elementsToBeLoaded*100) + "%");
    if (loadedElements == elementsToBeLoaded) 
    {
        console.log(`${loadedElements}/${elementsToBeLoaded} loaded Game initializing`);
        init();
    }
}


function load() {
    
    hexSpritesheet.onload = loading();
    HUDSprite.onload = loading();
}
