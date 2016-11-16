import * as Phaser from 'phaser';

class Player extends Phaser.Sprite {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(game) {
        super(game, 0, 0);

        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(0);
        graphics.beginFill(0xff9933);
        graphics.drawCircle(0, 0, 6);
        graphics.endFill();
        this.texture = graphics.generateTexture();
        this.pivot.set(3, 3);

        this.targetPosition = new Phaser.Point(1000, 0);

        this.aim = this.game.add.graphics(0, 0);
        this.aim
            .lineStyle(1, 0x663300, 1)
            .moveTo(0, 0)
            .lineTo(this.targetPosition.x, this.targetPosition.y)
            .moveTo(0, 0)
            .lineStyle(3, 0x663300, 0.5)
            .lineTo(this.targetPosition.x, this.targetPosition.y)
            .moveTo(0, 0)
            .lineStyle(5, 0x663300, 0.25)
            .lineTo(this.targetPosition.x, this.targetPosition.y)
            .endFill();
        this.addChild(this.aim);
    }
    
    // ##############################################

    update() {
        super.update();

        this.aim.pivot.set(this.world.x - 2, this.world.y - 2);
        this.aim.position = this.world;
    }
}

export default Player;