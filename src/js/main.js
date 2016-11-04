'use strict';

import Controls from './classes/Controls.js';
import Game     from './classes/Game.js';

let controls = new Controls();
let game     = new Game(controls);
game.render();

/*let lastFrameTime = 0;

function gameLoop(currentFrameTime) {
    requestAnimationFrame(gameLoop);
    let deltaT = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    if(controls.enabled) {
        game.update(deltaT);
    }

    game.render();
}

gameLoop();*/