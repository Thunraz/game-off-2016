'use strict';

import * as PIXI from 'pixi';

class Game {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor : 0x1099bb });
        document.getElementById('game-container').appendChild(this.renderer.view);

        // create the root of the scene graph
        this.stage = new PIXI.Container();
    }

    // ##############################################

    update(deltaT) {
    }

    // ##############################################

    render() {
        this.renderer.render(this.stage);
    }

    // ##############################################
}

export default Game;