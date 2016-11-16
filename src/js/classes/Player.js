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
    }
    
    // ##############################################

    update() {
        super.update();
    }
}

export default Player;