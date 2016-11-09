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
    constructor(game, options) {
        this.game = game;

        this.options = {
            center:             options.center              || new Phaser.Point(0, 0),
            orbit:              options.orbit               || 300,
            radius:             options.radius              || 100,
            focusPointDistance: options.focusPointDistance  || 20,
            satelliteRangeMin:  options.satelliteRangeMin   || 50,
            satelliteRangeMax:  options.satelliteRangeMax   || 300
        };

        this.group = this.game.add.group();
        this.group.x = this.options.center.x;
        this.group.y = this.options.center.y;

        let planetGraphics = new Phaser.Graphics(0, 0);
        planetGraphics.lineStyle(0);
        planetGraphics.beginFill(0x3399ff);
        planetGraphics.drawCircle(0, 0, this.options.radius * 2);
        planetGraphics.endFill();
        let planet = this.group.create(0, 0, planetGraphics.generateTexture());
        planet.pivot.set(this.options.radius, this.options.radius);

        let playerGraphics = new Phaser.Graphics(0, 0);
        playerGraphics.lineStyle(0);
        playerGraphics.beginFill(0xff9933);
        playerGraphics.drawCircle(0, 0, 2);
        playerGraphics.endFill();
        this.player = this.group.create(this.options.radius, 0, playerGraphics.generateTexture());
        this.player.pivot.set(1, 1);

        let focusPointGraphics = new Phaser.Graphics(0, 0);
        focusPointGraphics.beginFill(0x99ff33);
        focusPointGraphics.drawCircle(0, 0, 2);
        focusPointGraphics.endFill();
        this.focusPoint = this.group.create(
            this.options.radius + this.options.focusPointDistance,
            0,
            focusPointGraphics.generateTexture()
        );

        let satellite = new Satellite(this, this.options.center.x, this.options.center.y, this.options.radius + this.options.satelliteRangeMin);
        this.satellite = this.game.add.existing(satellite);
        this.shadow = this.game.add.graphics(0, 0);
    }

    // ##############################################

    update() {
        let sin = Math.sin(this.game.game.time.now / 100000);
        let cos = Math.cos(this.game.game.time.now / 100000);

        let xPos = this.options.center.x + this.options.orbit * sin;
        let yPos = this.options.center.y - this.options.orbit * cos;
        this.group.x = xPos;
        this.group.y = yPos;

        this.group.rotation -= this.game.game.time.physicsElapsed / 10;

        // Calculate shadow
        let angle1 = angleBetweenPoints(
            { x: this.options.center.x + 10 * cos, y: this.options.center.y + 10 * sin },
            { x: xPos + this.options.radius * cos, y: yPos + this.options.radius * sin }
        );

        let angle2 = angleBetweenPoints(
            { x: this.options.center.x - 10 * cos, y: this.options.center.y - 10 * sin },
            { x: xPos - this.options.radius * cos, y: yPos - this.options.radius * sin }
        );

        let shadowLength = 1250;

        this.shadow
            .clear()
            .lineStyle(0)
            .beginFill(0x333333, 0.5)
            
            .moveTo(xPos + this.options.radius * cos, yPos + this.options.radius * sin)
            .lineTo(xPos + this.options.radius * cos + shadowLength * Math.cos(angle1), yPos + this.options.radius * sin + shadowLength * Math.sin(angle1))
            .lineTo(xPos - this.options.radius * cos + shadowLength * Math.cos(angle2), yPos - this.options.radius * sin + shadowLength * Math.sin(angle2))
            .lineTo(xPos - this.options.radius * cos, yPos - this.options.radius * sin)
            
            .endFill();
    }

    // ##############################################
}

export default Planet;