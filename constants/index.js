import { Vector } from '../libraries/vector.js';

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const size = 32;
export const degrees60 = 2 * Math.PI / 6;

export const mapHeight = 100;
export const mapWidth = 100;
export const mapSeed = Math.random();

export const origo = new Vector(0, 0);

export const elementsToBeLoaded = 2;
export const hexSpritesheet = new Image();
export const HUDSprite = new Image();
export const loadedWidth = (Math.ceil(canvas.width/((3/2)*size))+1);
export const loadedHeight = (Math.ceil(canvas.height/(size*(Math.sqrt(3))))+1);

