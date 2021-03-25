import { mapSeed, tile } from '../constants/index.js';

export default function getBiome(coords) {
    const freq = 0.1;
    noise.seed(mapSeed);
    const e = (noise.perlin2(coords.x * freq, coords.y * freq) + 1) / 2;
    noise.seed(mapSeed / 2);
    const m = (noise.perlin2(coords.x * freq, coords.y * freq) + 1) / 2;
    return biome(e, m);
}

/**
 * 
 * @param {Number} e A value between 0 and 1.
 * @param {Number} m A value between 0 and 1.
 * @returns Returns a tile based on the value of e and m.
 */

function biome(e, m)
{
    if (e < 0.3) return tile.water;
    if (e < 0.45) return tile.sand;

    else {
        if (m < 0.1) return tile.sand;
        if (m < 0.7) return tile.dirt;
        if (m < 0.9) return tile.grass;
        else return tile.water;
    }
}
