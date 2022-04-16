class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    preload() {
        // link to the sound I used: https://opengameart.org/content/8bit-menu-select
        // loading the audio, doing this in the menu so that it can be ready to be used in the beginning and not only when you play
        this.load.audio('sfx_select', './assets/vgmenuselect.wav');

        // link to the sound I used: https://opengameart.org/content/q009s-weapon-sounds
        // specifically rlauncher.ogg
        // I shortened the clip and made it 2x faster than it originally was
        this.load.audio('sfx_explosion', './assets/car_exploding.wav');

        // link to the sound here: https://opengameart.org/content/rocket-fly-8-bit
        this.load.audio('sfx_rocket', './assets/final_rocket.wav');

        this.load.audio('music', './assets/bg_music.wav');

        this.load.image('background', './assets/menu.png');
    }

    create() {
        let bg = this.add.image(320,240,'background');
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

       this.playSong = this.sound.add('music');
       this.playSong.play();
       this.playSong.loop = true;
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                twoPlayerMode: false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // HARD MODEEEE
            game.settings = {
                spaceshipSpeed : 4,
                gameTimer: 45000,
                twoPlayerMode: false
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            // two player mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000,
                twoPlayerMode: true                
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }


    }
}
