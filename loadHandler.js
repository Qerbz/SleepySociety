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

function gameLoop() {
    //Calculations
    origo.add(scrollSpeed);

    //Animation
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    // drawTile(tile.water,new Point2D(0,0));
    // drawTile(tile.sand,new Point2D(0,1));
    drawGrid(gridArray);
    //CTX.drawImage(HUDSprite, 0, 0, 1920, 1080, 0, 0, 1920, 1080);

    requestAnimationFrame(gameLoop);
}

load();
