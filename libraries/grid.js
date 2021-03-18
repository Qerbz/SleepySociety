function createGrid(width, height) 
{
    const arr = new Array();
    for (let x = SIZE + origo.x, i = 0, y; x + SIZE * (1 + Math.cos(DEGREES60)) <= width; x += SIZE * (1 + Math.cos(DEGREES60)), i++) 
    {
        for (i % 2 === 1 ? y = 2 * SIZE * Math.sin(DEGREES60) + origo.y : y = SIZE * Math.sin(DEGREES60) + origo.y; y + SIZE * Math.sin(DEGREES60) <= height; y += 2 * SIZE * Math.sin(DEGREES60)) 
        {
            const tileBiome = getBiome(x, y);
            arr.push(new Array(tileBiome, new Point2D(x, y)));
        }
    }
    console.log(arr);
    return arr;
}