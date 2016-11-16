'use strict';

import * as Phaser from 'phaser';

import Controls from './Controls.js';
import Planet   from './Planet.js';
import Player   from './Player.js';

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

        this.time    = 0.0;
        this.elapsed = 0.0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(-20000, -20000, 40000, 40000);

        this.sun = this.game.add.graphics(0, 0);
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 20);
        this.sun.endFill();

        this.player = new Player(this.game);

        this.planet = new Planet(this, this.player, {
            center:             new Phaser.Point(0, 0),
            orbit:              4000,
            radius:             2000,
            focusPointDistance: 250
        });

        this.game.camera.follow(this.planet.focusPoint, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
    }

    // ##############################################

    update() {
        this.elapsed = this.game.time.physicsElapsed;
        this.time   += this.elapsed;
        this.planet.update();

        this.game.world.rotation = -this.planet.group.rotation - Math.PI / 2;
    }

    // ##############################################
    
    render() {
        //this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }

    // ##############################################

    dummy() { }

    // ##############################################
}

export default Game;