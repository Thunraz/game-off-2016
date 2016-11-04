'use strict';

import * as Phaser from 'phaser';

//import Planet from './Planet.js';

class Game {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(controls) {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });

        this.controls = controls;
    }

    create() {
        this.sun = this.game.add.graphics(400, 300);
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 10);
        this.sun.endFill();

        this.planet = this.game.add.graphics(550, 300);
        this.planet.lineStyle(0);
        this.planet.beginFill(0x3399ff);
        this.planet.drawCircle(0, 0, 20);
        this.planet.endFill();

        this.line1 = this.game.add.graphics(0, 0);

        this.timer = 0.0;
    }

    // ##############################################

    preload() {

    }

    // ##############################################

    update(deltaT) {
        this.timer += deltaT / 1000;

        let xPos = 400 + 150 * Math.sin(this.timer);
        let yPos = 300 - 150 * Math.cos(this.timer);

        if(this.planet) {
            this.planet.position.set(xPos, yPos);

            this.line1
                .clear()
                .lineStyle(1, 0xff0000)
                .moveTo(400 + 10 * Math.cos(this.timer), 300 + 10 * Math.sin(this.timer))
                .lineTo(
                    xPos + 20 * Math.cos(this.timer),
                    yPos + 20 * Math.sin(this.timer)
                )
                .moveTo(400 - 10 * Math.cos(this.timer), 300 - 10 * Math.sin(this.timer))
                .lineTo(
                    xPos - 20 * Math.cos(this.timer),
                    yPos - 20 * Math.sin(this.timer)
                );
        }
    }

    // ##############################################

    render() {
        //this.renderer.render(this.stage);
    }

    // ##############################################
}

export default Game;