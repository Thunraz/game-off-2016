'use strict';

import * as Phaser from 'phaser';

import Controls from './Controls.js';
//import Planet from './Planet.js';

function angleBetweenPoints(p1, p2) {
    let deltaX = p2.x - p1.x;
    let deltaY = p2.y - p1.y;

    return Math.atan2(deltaY, deltaX);
}

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

        this.game.world.setBounds(-1000, -1000, 1920, 1920);

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

        this.satellite = this.game.add.graphics(550, 290);
        this.satellite.lineStyle(0);
        this.satellite.beginFill(0xdddddd);
        this.satellite.drawCircle(0, 0, 5);
        this.satellite.endFill();

        this.line1 = this.game.add.graphics(0, 0);
        this.line2 = this.game.add.graphics(0, 0);
        
        this.game.camera.follow(this.planet, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
    }

    // ##############################################

    update() {
        this.time += this.game.time.elapsed / 1000;

        if(this.planet) {
            let sin = Math.sin(this.time);
            let cos = Math.cos(this.time);

            let xPos = 400 + 150 * sin;
            let yPos = 300 - 150 * cos;
            this.planet.position.set(xPos, yPos);

            this.line1
                .clear()
                .lineStyle(1, 0xff0000)

                .moveTo( 400 + 10 * cos,  300 + 10 * sin)
                .lineTo(xPos + 20 * cos, yPos + 20 * sin)
                .moveTo( 400 - 10 * cos,  300 - 10 * sin)
                .lineTo(xPos - 20 * cos, yPos - 20 * sin);

            let angle1 = angleBetweenPoints(
                { x:  400 + 10 * cos, y:  300 + 10 * sin },
                { x: xPos + 20 * cos, y: yPos + 20 * sin }
            );

            let angle2 = angleBetweenPoints(
                { x:  400 - 10 * cos, y:  300 - 10 * sin },
                { x: xPos - 20 * cos, y: yPos - 20 * sin }
            );

            this.line2
                .clear()
                .lineStyle(0)
                .beginFill(0xff9933)
                
                .moveTo(xPos + 20 * cos, yPos + 20 * sin)
                .lineTo(xPos + 20 * cos + 250 * Math.cos(angle1), yPos + 20 * sin + 250 * Math.sin(angle1))
                .lineTo(xPos - 20 * cos + 250 * Math.cos(angle2), yPos - 20 * sin + 250 * Math.sin(angle2))
                .lineTo(xPos - 20 * cos, yPos - 20 * sin)
                
                .endFill();
            
            this.satellite.position.set(xPos + 30 * Math.sin(this.time / 10), yPos + 30 * Math.cos(this.time / 10));
        }
    }

    // ##############################################

    /*inShadow(e, t, a, s, n) {
        let i = ((a[1] - t[1]) * e[0] - (a[0] - t[0]) * e[1] + a[0] * t[1] - a[1] * t[0]) / (((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])) / ((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])));
        let o = angleBetweenPoints([n.pos[0], n.pos[1]], [a[0], a[1]]);
        return 2 * s > i / 1e3 && i / 1e3 > -(2 * s) && 1 > o;
    }*/

    // ##############################################
    
    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteCoords(player, 32, 500);
    }

    // ##############################################

    dummy() { }

    // ##############################################
}

export default Game;