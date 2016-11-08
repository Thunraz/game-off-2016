'use strict';

import * as Phaser from 'phaser';

import Controls  from './Controls.js';
import Satellite from './Satellite.js';

function angleBetweenPoints(p1, p2) {
    let deltaX = p2.x - p1.x;
    let deltaY = p2.y - p1.y;

    return Math.atan2(deltaY, deltaX);
}

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

        this.game.world.setBounds(-1000, -1000, 3000, 3000);

        this.sun = this.game.add.graphics(400, 300);
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 20);
        this.sun.endFill();

        let planetGraphics = new Phaser.Graphics(0, 0);
        planetGraphics.lineStyle(0);
        planetGraphics.beginFill(0x3399ff);
        planetGraphics.drawCircle(0, 0, 40);
        planetGraphics.endFill();
        this.planet = this.game.add.sprite(550, 300, planetGraphics.generateTexture());
        this.planet.pivot.set(20, 20);

        this.satellite = new Satellite(this, new Phaser.Point(550, 290), 30);

        this.player = this.game.add.graphics(550, 300);
        this.player.lineStyle(0);
        this.player.beginFill(0xff9933);
        this.player.drawCircle(0, 0, 2);
        this.player.endFill();

        this.line1 = this.game.add.graphics(0, 0);
        this.polygon = this.game.add.graphics(0, 0);
        
        this.game.camera.follow(this.planet, Phaser.Camera.FOLLOW_TOPDOWN, 0.2, 0.2);
    }

    // ##############################################

    update() {
        this.time += this.game.time.elapsed / 1000;

        if(this.planet) {
            let sin = Math.sin(this.time / 30);
            let cos = Math.cos(this.time / 30);

            let xPos = 400 + 500 * sin;
            let yPos = 300 - 500 * cos;
            this.planet.position.set(xPos, yPos);

            let angle1 = angleBetweenPoints(
                { x:  400 + 10 * cos, y:  300 + 10 * sin },
                { x: xPos + 20 * cos, y: yPos + 20 * sin }
            );

            let angle2 = angleBetweenPoints(
                { x:  400 - 10 * cos, y:  300 - 10 * sin },
                { x: xPos - 20 * cos, y: yPos - 20 * sin }
            );

            let shadowLength = 1250;

            this.polygon
                .clear()
                .lineStyle(0)
                .beginFill(0x333333, 0.5)
                
                .moveTo(xPos + 20 * cos, yPos + 20 * sin)
                .lineTo(xPos + 20 * cos + shadowLength * Math.cos(angle1), yPos + 20 * sin + shadowLength * Math.sin(angle1))
                .lineTo(xPos - 20 * cos + shadowLength * Math.cos(angle2), yPos - 20 * sin + shadowLength * Math.sin(angle2))
                .lineTo(xPos - 20 * cos, yPos - 20 * sin)
                
                .endFill();

            this.satellite.update(new Phaser.Point(xPos, yPos));

            this.player.position.set(xPos + 20 * Math.sin(this.time / 25), yPos + 20 * Math.cos(this.time / 25));
        }
    }

    // ##############################################
    
    render() {
        this.game.debug.cameraInfo(this.game.camera, 0, 32);
        this.game.debug.text('Satellite in shadow: ' + this.satellite.inShadow, 0, 10);
    }

    // ##############################################

    dummy() { }

    // ##############################################
}

export default Game;