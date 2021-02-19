let spritesheet = new Image();
spritesheet.src = "hexagonTerrain_sheet.png";
spritesheet.onload = loading();

let tile = 
{
  water: new Point2D(0,0),
  sand: new Point2D(1,0),
  grass: new Point2D(2,0),
  dirt: new Point2D(3,0)
}

function drawTile( x,y )
{
  let width = size*2;
  let height = size*Math.sqrt(3)
}