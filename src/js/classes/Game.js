'use strict';

import * as PIXI from 'pixi';

import Planet from './Planet.js';

class Game {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor : 0x000000, antialias: true });
        document.getElementById('game-container').appendChild(this.renderer.view);

        // create the root of the scene graph
        this.stage = new PIXI.Container();

        this.sun = new PIXI.Graphics();
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 10);
        this.sun.endFill();
        this.sun.position.set(400, 300);
        this.stage.addChild(this.sun);

        this.planet = new PIXI.Graphics();
        this.planet.lineStyle(0);
        this.planet.beginFill(0x3399ff);
        this.planet.drawCircle(0, 0, 20);
        this.planet.endFill();
        this.planet.position.set(550, 300);
        this.stage.addChild(this.planet);

        this.line1 = new PIXI.Graphics();
        this.stage.addChild(this.line1);

        this.timer = 0.0;

        /*this.planet = new Planet();
        this.stage.addChild(this.planet);*/
    }

    // ##############################################

    update(deltaT) {
        this.timer += deltaT / 1000;

        let xPos = 400 + 150 * Math.sin(this.timer);
        let yPos = 300 - 150 * Math.cos(this.timer);

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

    // ##############################################

    render() {
        this.renderer.render(this.stage);
    }

    // ##############################################
}

export default Game;