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

        this.mouseMoveListeners = [];

        let scope = this;
        document.addEventListener('pointerlockchange', ( ) => { scope.onPointerLockChange() }, false);
        document.addEventListener('pointerlockerror',  ( ) => { scope.onPointerLockError()  }, false);
        document.addEventListener('mousemove',         (e) => { scope.onMouseMove(e)  }, false);

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

    onMouseMove(e) {
        if(this.enabled) {
            for(let i = 0; i < this.mouseMoveListeners.length; i++) {
                this.mouseMoveListeners[i].callback(e, this.mouseMoveListeners[i].scope);
            }
        }
    }

    // ##############################################
}

export default Controls;