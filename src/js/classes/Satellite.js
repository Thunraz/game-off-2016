'use strict';

import * as Phaser from 'phaser';

class Satellite extends Phaser.Sprite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(planet, x, y, offset) {
        super(planet.game, x, y);

        this.planet = planet;
        this.offset = offset;

        let graphics = new Phaser.Graphics(x, y);
        graphics.lineStyle(0);
        graphics.beginFill(0xdddddd);
        graphics.drawCircle(0, 0, 5);
        graphics.endFill();

        this.texture = graphics.generateTexture();
        
        this.inShadow = false;
    }

    // ##############################################

    update() {
        this.position.set(
            this.planet.group.x + this.offset * Math.sin(this.game.time),
            this.planet.group.y + this.offset * Math.cos(this.game.time)
        );
    }

    // ##############################################
}

export default Satellite;