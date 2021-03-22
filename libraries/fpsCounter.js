import { ctx } from '../constants/index.js';

let lastCalledTime;
let fps;
let delta;

export function fpsCounter() {
    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
    }
    delta = (Date.now() - lastCalledTime)/1000;
    lastCalledTime = Date.now();
    fps = 1/delta;

    //fps
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,60,40);
    ctx.fillStyle = "black";
    ctx.fillText(Math.round(fps),10,30);

}