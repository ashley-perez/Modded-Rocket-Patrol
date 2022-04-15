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
    }

    create() {
        // menu text and overall configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move and (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert').setOrigin(0.5);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
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
