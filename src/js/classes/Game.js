'use strict';

import * as Phaser from 'phaser';

import Controls from './Controls.js';
import Planet   from './Planet.js';
import Player   from './Player.js';

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
            preload: this.preload,
            create:  this.create,
            update:  this.update,
            render:  this.render
        });
    }

    // ##############################################

    preload() {
        this.game.load.bitmapFont('Mecha', 'assets/Mecha.png', 'assets/Mecha.fnt');
    }

    // ##############################################

    create() {
        this.controls = new Controls(this.game);

        this.time    = 0.0;
        this.elapsed = 0.0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(-20000, -20000, 40000, 40000);

        let stars = this.game.make.bitmapData(1024, 1024);
        //stars.fill(255, 0, 255);
        //let starColors = [0x9bb0ff, 0xaabfff, 0xcad7ff, 0xf8f7ff, 0xfff4ea, 0xffd2a1, 0xffcc6f];
        let colorRange = [0, 60, 240];
        let numberOfStars = 5000;
        for(let i = 0; i < numberOfStars; i++) {
            let x = Math.random() * stars.canvas.width;
            let y = Math.random() * stars.canvas.height;
            let radius = Math.random() * 1.2;

            let hue = colorRange[getRandom(0, colorRange.length - 1)];
            let sat = getRandom(50, 100);

            let style = 'hsla(' + hue + ', ' + sat + '%, 88%, 0.8)';
            stars.circle(x, y, radius, style);
        }

        console.log(stars);

        this.stars = this.game.add.sprite(0, -4000, stars);
        this.stars.anchor.set(0.5, 0.5);

        this.sun = this.game.add.graphics(0, 0);
        this.sun.lineStyle(0);
        this.sun.beginFill(0xffff00);
        this.sun.drawCircle(0, 0, 20);
        this.sun.endFill();

        this.player = new Player(this);

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
        
        this.stars.position.set(
            this.planet.focusPoint.world.x,
            this.planet.focusPoint.world.y
        );

        //this.stars.rotation = -this.planet.group.rotation;

        this.game.world.rotation = -this.planet.group.rotation - Math.PI / 2;
        this.stars.rotation      = -this.game.world.rotation;
    }

    // ##############################################
    
    render() {
        this.game.debug.text(this.stars.position, 0, 15);
        this.game.debug.text(this.game.camera.width + ' ' + this.game.camera.height, 400, 15);
        this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }

    // ##############################################

    dummy() { }

    // ##############################################
}

export default Game;