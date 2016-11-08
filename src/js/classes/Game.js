'use strict';

import * as Phaser from 'phaser';

import Controls from './Controls.js';
import Planet   from './Planet.js';

/*inShadow(e, t, a, s, n) {
        let i = ((a[1] - t[1]) * e[0] - (a[0] - t[0]) * e[1] + a[0] * t[1] - a[1] * t[0]) / (((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])) / ((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])));
        let o = angleBetweenPoints([n.pos[0], n.pos[1]], [a[0], a[1]]);
        return 2 * s > i / 1e3 && i / 1e3 > -(2 * s) && 1 > o;
    }*/

class Game {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    create() {
        this.controls = new Controls(this.game);
        this.time = 0.0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(-1000, -1000, 3000, 3000);

        this.sun = this.game.add.graphics(400, 300);
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 20);
        this.sun.endFill();

        this.planet = new Planet(this, 400, 300, 500);
        
        this.game.camera.follow(this.planet.planet, Phaser.Camera.FOLLOW_TOPDOWN, 0.2, 0.2);
    }

    // ##############################################

    update() {
        this.time += this.game.time.elapsed / 1000;
        this.planet.update();
    }

    // ##############################################
    
    render() {
        this.game.debug.cameraInfo(this.game.camera, 0, 32);
        //this.game.debug.text('Satellite in shadow: ' + this.satellite.inShadow, 0, 10);
    }

    // ##############################################

    dummy() { }

    // ##############################################
}

export default Game;