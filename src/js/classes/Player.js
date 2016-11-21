import * as Phaser from 'phaser';

class Player extends Phaser.Sprite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(game) {
        super(game.game, 0, 0);

        game.controls.mouseMoveListeners.push({ callback: this.mouseMove, scope: this});

        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(0);
        graphics.beginFill(0xff9933);
        graphics.drawCircle(0, 0, 6);
        graphics.endFill();
        this.texture = graphics.generateTexture();
        this.pivot.set(3, 3);

        this.aimTarget = new Phaser.Point(200, 0);

        this.aimNumber = Math.PI / 2;

        this.aim = this.game.add.graphics(0, 0);
        this.aim
            .lineStyle(1, 0x663300, 1)
            .moveTo(0, 0)
            .lineTo(this.aimTarget.x, this.aimTarget.y)
            .moveTo(0, 0)
            .lineStyle(7, 0x663300, 0.25)
            .lineTo(this.aimTarget.x, this.aimTarget.y)
            .moveTo(0, 0)
            .lineStyle(15, 0x663300, 0.125)
            .lineTo(this.aimTarget.x, this.aimTarget.y)
            .endFill();
        this.addChild(this.aim);
    }
    
    // ##############################################

    update() {
        super.update();

        this.aim.pivot.set(this.world.x - 2, this.world.y - 2);
        this.aim.position = this.world;

        this.aimTarget.set(
            Math.sin(this.aimNumber) * 300,
            Math.cos(this.aimNumber) * 300
        );

        this.aim
            .clear()
            .lineStyle(1, 0x663300, 1)
            .moveTo(0, 0)
            .lineTo((this.aimTarget.x - 2) * 3, this.aimTarget.y * 3)
            .moveTo(0, 0)
            .lineStyle(7, 0x663300, 0.25)
            .lineTo(this.aimTarget.x * 3, this.aimTarget.y * 3)
            .moveTo(0, 0)
            .lineStyle(15, 0x663300, 0.125)
            .lineTo(this.aimTarget.x * 3, this.aimTarget.y * 3)
            .endFill();
    }

    // ##############################################

    mouseMove(e, targetScope) {
        let multiplier = 1000;

        targetScope.aimNumber -= e.movementX / multiplier;

        if(targetScope.aimNumber >= Math.PI || targetScope.aimNumber < 0.0) {
            targetScope.aimNumber += e.movementX / multiplier;
        }
    }

    // ##############################################
}

export default Player;