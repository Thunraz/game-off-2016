'use strict';

import * as Phaser from 'phaser';

let nextId = 0;

function generateName() {
    let prefixes = ['Acro', 'Alpha', 'Atlas'];
    let suffixes = ['Sat', 'View'];

    let prefixIndex = Math.round(Math.random() * (prefixes.length - 1));
    let prefix = prefixes[prefixIndex];

    let suffixIndex = Math.round(Math.random() * (suffixes.length - 1)) 
    let suffix = suffixes[suffixIndex];

    return prefix + suffix;
}

function formatVelocity(velocity) {
    let value = Math.round(Math.abs(velocity) * 1000);
    return value / 10;
}

function formatAltitude(altitude, planetRadius) {
    let value = Math.round(Math.abs(altitude - planetRadius) / 10);
    return value * 40;
}

class Satellite extends Phaser.Sprite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(planet, options) {
        super(planet.game, options.center.x || 0, options.center.y || 0);

        this.id = Satellite.ID;
        this.name = generateName();

        this.options = {
            altitude:  options.altitude  || 50,
            center:    options.center    || new Phaser.Point(0, 0),
            clockwise: options.clockwise || true,

            offset:    Math.random() * Math.PI * 2,
            velocity:  1 / Math.pow(options.altitude - planet.options.radius + 1000, 1.5) * 2500 * (options.clockwise ? 1 : -0.25)
        };

        this.planet = planet;

        let graphics = new Phaser.Graphics(this.x, this.y);
        graphics.lineStyle(0);
        graphics.beginFill(0xdddddd);
        graphics.drawCircle(0, 0, 5);
        graphics.endFill();
        this.texture = graphics.generateTexture();
        
        let satelliteText = this.name + ' #' + this.id + '\n';
        satelliteText    += 'Velocity: '  + formatVelocity(this.options.velocity) + ' km/s\n';
        satelliteText    += 'Altitude: '  + formatAltitude(this.options.altitude, planet.options.radius) + ' km';
        this.text = planet.game.add.bitmapText(this.x + 8, this.y + 10, 'Mecha', satelliteText, 17);

        this.textBorder = planet.game.add.graphics(this.x + 11, this.y + 6);
        this.textBorder
            .beginFill(0xffffff, 0.2)
            .lineStyle(1, 0xffffff, 0.7)
            .moveTo(0, 0)
            .lineTo(this.text.textWidth + 6, 0)
            .lineTo(this.text.textWidth + 6, this.text.textHeight + 6)
            .lineTo(0, this.text.textHeight + 6)
            .lineTo(0, 0)
            .endFill();
        this.addChild(this.textBorder);
        this.addChild(this.text);
        
        this.inShadow = false;
    }

    // ##############################################

    static get ID() {
        return nextId++;
    }

    // ##############################################

    update() {
        super.update();

        let val = this.game.time * this.options.velocity + this.options.offset;

        if(this.planet.shadowPolygon.contains(this.x, this.y)) {
            this.inShadow = true;
        } else {
            this.inShadow = false;
        }

        this.position.set(
            this.planet.group.x + this.options.altitude * Math.sin(val),
            this.planet.group.y + this.options.altitude * Math.cos(val)
        );

        this.text.rotation = -this.game.world.rotation;
        this.textBorder.rotation = -this.game.world.rotation;
    }

    // ##############################################
}

export default Satellite;