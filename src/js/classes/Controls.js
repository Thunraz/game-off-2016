'use strict';

let element = document.body;
let blocker = document.getElementById('blocker');
let noticeContainer = document.getElementById('notice-container');

class Controls {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(game) {
        this.game    = game;
        this.game.paused = true;
        this.enabled = false;

        let scope = this;
        document.addEventListener('pointerlockchange', () => { scope.onPointerLockChange() }, false);
        document.addEventListener('pointerlockerror',  () => { scope.onPointerLockError()  }, false);

        noticeContainer.addEventListener('click', () => {
            noticeContainer.style.display = 'none';
            element.requestPointerLock();
        }, false );

        scope = this;
    }

    // ##############################################

    onPointerLockChange() {
        if (document.pointerLockElement === element) {
            this.enabled = true;

            blocker.style.display = 'none';
        } else {
            this.enabled = false;

            blocker.style.display = 'block';
            noticeContainer.style.display = '';
        }

        this.game.paused = !this.enabled;
    }

    // ##############################################

    onPointerLockError() {
        noticeContainer.style.display = '';
    }

    // ##############################################
}

export default Controls;