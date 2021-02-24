let hexSpritesheet = new Image();
hexSpritesheet.src = "hexagonTerrain_sheet.png";
hexSpritesheet.onload = loading();

let tile = 
{
  water: new Point2D(0,0),
  sand: new Point2D(1,0),
  grass: new Point2D(2,0),
  dirt: new Point2D(3,0)
}

function drawTile( tile,x,y )
{
  const spriteWidth = 64
  const spriteHeight = 56

  let width = size*2;
  let height = size*Math.sqrt(3);

  let spriteX = width * tile.x;
  let spriteY = height * tile.y;

  ctx.drawImage(hexSpritesheet, spriteX, spriteY, spriteWidth, spriteHeight, x, y, width, height);
}