import { Player } from '../libraries/player.js';
import { Vector } from '../libraries/vector.js';
import { Point2D } from '../libraries/point2d.js';

export const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const ctx = canvas.getContext("2d");
export const size = 32;
export const degrees60 = 2 * Math.PI / 6;

export const mapHeight = 100;
export const mapWidth = 100;
export const mapSeed = Math.random();

export const origo = new Vector(-100, -100);

export const elementsToBeLoaded = 3;
export const hexSpritesheet = new Image();
export const HUDSprite = new Image();
export const loadedWidth = (Math.ceil(canvas.width/((3/2)*size))+1);
export const loadedHeight = (Math.ceil(canvas.height/(size*(Math.sqrt(3))))+1);

export const scrollSpeed = new Vector(0,0);
export const player = new Player();
export const biomes = new Array(mapWidth);


export const listOfButtons = [];
export const camera = { x: 100, y: 100 }

export const tile = {
    water: new Point2D(0, 0),
    sand: new Point2D(1, 0),
    grass: new Point2D(2, 0),
    dirt: new Point2D(3, 0),
    snow: new Point2D(0,1),
    mountain: new Point2D(1,1),
    jungle: new Point2D(2,1),
    oceanDeep: new Point2D(3,1),
    forestDeep: new Point2D(0,2),
    scorched: new Point2D(1,2),
    desert: new Point2D(2,2)
}

export const building = {
    house: new Point2D(0,0),
    farm: new Point2D(1,0),
    church: new Point2D(2,0),
    barn: new Point2D(3,0)
}

export const mapArray = [];
export const map = {
    mapHexes: mapArray,
    mapSeed: mapSeed
}