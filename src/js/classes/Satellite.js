'use strict';

import * as Phaser from 'phaser';

class Satellite extends Phaser.Sprite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(planet, options) {
        super(planet.game, options.center.x || 0, options.center.y || 0);

        this.options = {
            altitude:  options.altitude  || 50,
            center:    options.center    || new Phaser.Point(0, 0),
            clockwise: options.clockwise || true,

            offset:    Math.random() * Math.PI * 2,
            velocity:  1 / Math.pow(options.altitude - planet.options.radius + 500, 1.5) * 1000 * (options.clockwise ? 1 : -0.5)
        };

        this.planet = planet;

        let graphics = new Phaser.Graphics(this.x, this.y);
        graphics.lineStyle(0);
        graphics.beginFill(0xdddddd);
        graphics.drawCircle(0, 0, 5);
        graphics.endFill();

        this.texture = graphics.generateTexture();
        
        this.inShadow = false;
    }

    // ##############################################

    update() {
        let val = this.game.time * this.options.velocity + this.options.offset;

        this.position.set(
            this.planet.group.x + this.options.altitude * Math.sin(val),
            this.planet.group.y + this.options.altitude * Math.cos(val)
        );
    }

    // ##############################################
}

export default Satellite;