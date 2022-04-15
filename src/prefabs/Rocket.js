// rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, firstKey, secondKey, thirdKey) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing, displayList, updateList
        this.isFiring = false;    // track rocket's firing status
        this.moveSpeed = 2;       // pixels per frame

        // binding the audio object to the scene we passed in as a parameter
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

        this.keyOne = firstKey;
        this.keyTwo = secondKey;
        this.firingKey = thirdKey;


        this.score = 0; // initializing score based on rocket (bc of 2 player mode)
        
    }

    update() {
        // left/right movement
        // check if the rocket is firing and if it is NOT  then...
        // the player is able to move left and right
        if(!this.isFiring) {
            if(this.keyOne.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } 
            else if (this.keyTwo.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(this.firingKey)) { // just down rather than isDown since the player will press the shoot button once and not hold it
            this.isFiring = true;
            this.sfxRocket.play(); // play the rocket sound!!
        }

        // if fired, move up
        // if player fired the rocket (by pressing F) then the rocket will move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    // reset rocket to the "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}