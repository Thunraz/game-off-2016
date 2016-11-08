'use strict';

import * as Phaser from 'phaser';

import Satellite from './Satellite.js';

function angleBetweenPoints(p1, p2) {
    let deltaX = p2.x - p1.x;
    let deltaY = p2.y - p1.y;

    return Math.atan2(deltaY, deltaX);
}

class Planet {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(game, x, y, orbitRadius) {
        this.game = game;

        this.group = this.game.add.group();
        this.group.x = x;
        this.group.y = y;

        this.orbitCenter = new Phaser.Point(x, y);
        this.orbitRadius = orbitRadius;

        let planetGraphics = new Phaser.Graphics(0, 0);
        planetGraphics.lineStyle(0);
        planetGraphics.beginFill(0x3399ff);
        planetGraphics.drawCircle(0, 0, 40);
        planetGraphics.endFill();
        this.planet = this.group.create(0, 0, planetGraphics.generateTexture());
        this.planet.pivot.set(20, 20);

        let playerGraphics = new Phaser.Graphics(0, 0);
        //this.player = this.game.add.graphics(550, 300);
        playerGraphics.lineStyle(0);
        playerGraphics.beginFill(0xff9933);
        playerGraphics.drawCircle(0, 0, 2);
        playerGraphics.endFill();
        this.player = this.group.create(20, 0, playerGraphics.generateTexture());
        this.player.pivot.set(1, 1);

        this.satellite = this.game.add.existing(new Satellite(this, 550, 290, 30));
        this.shadow = this.game.add.graphics(0, 0);
    }

    // ##############################################

    update() {
        let sin = Math.sin(this.game.time / 30);
        let cos = Math.cos(this.game.time / 30);

        let xPos = this.orbitCenter.x + this.orbitRadius * sin;
        let yPos = this.orbitCenter.y - this.orbitRadius * cos;
        this.group.x = xPos;
        this.group.y = yPos;

        this.group.rotation -= this.game.game.time.elapsed / 1000;

        let angle1 = angleBetweenPoints(
            { x:  400 + 10 * cos, y:  300 + 10 * sin },
            { x: xPos + 20 * cos, y: yPos + 20 * sin }
        );

        let angle2 = angleBetweenPoints(
            { x:  400 - 10 * cos, y:  300 - 10 * sin },
            { x: xPos - 20 * cos, y: yPos - 20 * sin }
        );

        let shadowLength = 1250;

        this.shadow
            .clear()
            .lineStyle(0)
            .beginFill(0x333333, 0.5)
            
            .moveTo(xPos + 20 * cos, yPos + 20 * sin)
            .lineTo(xPos + 20 * cos + shadowLength * Math.cos(angle1), yPos + 20 * sin + shadowLength * Math.sin(angle1))
            .lineTo(xPos - 20 * cos + shadowLength * Math.cos(angle2), yPos - 20 * sin + shadowLength * Math.sin(angle2))
            .lineTo(xPos - 20 * cos, yPos - 20 * sin)
            
            .endFill();

        //this.player.position.set(xPos + 20 * Math.sin(this.time / 25), yPos + 20 * Math.cos(this.time / 25));
    }

    // ##############################################
}

export default Planet;