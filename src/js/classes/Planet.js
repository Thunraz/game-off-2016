'use strict';

import * as PIXI from 'pixi';

class Planet extends PIXI.Container {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor() {
        super();

        let surface = new PIXI.Graphics();
        surface.lineStyle(0);
        surface.beginFill(0x6600cc);
        surface.drawCircle(400, 3500, 3000);
        surface.endFill();

        this.addChild(surface);
    }
}

export default Planet;