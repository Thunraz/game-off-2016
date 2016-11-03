'use strict';

import Controls from './classes/Controls.js';
import Game     from './classes/Game.js';

let game     = new Game();
let controls = new Controls(game);

let lastFrameTime = 0;

function gameLoop(currentFrameTime) {
    requestAnimationFrame(gameLoop);
    let deltaT = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    if(controls.enabled) {
        game.update(deltaT);
    }

    game.render();
}

gameLoop();