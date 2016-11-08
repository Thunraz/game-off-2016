'use strict';

class Satellite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(game, origin, offset) {
        this.origin = origin;
        this.offset = offset;
        this.game   = game;

        this.graphics = game.add.graphics(this.origin.x, this.origin.y);
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xdddddd);
        this.graphics.drawCircle(0, 0, 5);
        this.graphics.endFill();
        this.inShadow = false;
    }

    // ##############################################

    update(planetPos) {
        this.graphics.position.set(
            planetPos.x + this.offset * Math.sin(this.game.time),
            planetPos.y + this.offset * Math.cos(this.game.time)
        );
    }

    // ##############################################
}

export default Satellite;