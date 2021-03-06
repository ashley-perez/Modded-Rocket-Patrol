class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        // loads images/tiles sprites
        // load.image() has 2 parameters: string that will be used to reference this image
        //                                URL for where the image is located
        // loading the assets that I made to be used
        this.load.image('blueCar', './assets/blue_car.png');
        this.load.image('redCar', './assets/red_car.png');
        this.load.image('greenCar', './assets/green_car.png');
        this.load.image('money', './assets/best_money.png');

        this.load.image('rocket', './assets/actuallybestmissile.png');
        this.load.image('rocketTwo', './assets/yellow_rocket.png');
        this.load.image('dirtRoad', './assets/dirt_road.png');

        // now it's a smoke explosion :D
        // load spritesheet for the explosion
        // 3 parameters for spritesheet: key string to identify the asset, URL of its location, frame configuration
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    // method
    create() {
        
        // place tile sprite (starfield background)
        // add.tileSprite() has 5 parameters: x pos, y pos, width, height, key string for which image to use
        this.dirtRoad = this.add.tileSprite(0, 0, 640, 480, 'dirtRoad').setOrigin(0, 0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // new keys for 2nd player
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // move left with A
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // move right with D
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // UI background
        // the big bar where the score is
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xd90429).setOrigin(0,0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket',0, keyLEFT, keyRIGHT, keySpace, 1).setOrigin(0.5, 1); // used to be (0.5,0)
        
        // second player
        if (game.settings.twoPlayerMode === true) {
            this.p2Rocket = new Rocket(this, game.config.width/2 + 5, game.config.height - borderUISize - borderPadding, 'rocketTwo',0, keyA, keyD, keyF, 2).setOrigin(0.5, 1); 
            this.p2Rocket.moveSpeed = 3.75;
            //console.log(this.p2Rocket.score);
        }

        // add "spaceships", they are now cars (three of them)
        // 6 parameters: current scene (this), x pos, y pos, key name of graphic, frame number, custom parameter (pointValue)
        // setOrigin makes sure that the origin of the spaceship sprites are on the upper left of the sprite so the screen wrapping works
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'blueCar', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'redCar', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'greenCar', 0, 10).setOrigin(0,0);


        // new "spaceship"
        this.moneyBag = new Money(this, borderUISize + borderPadding, borderUISize*5, 'money',0,70).setOrigin(0,0);


        // black borders
        // drawing this after means the "spaceships" will not go over the borders
        // add.rectangle() has 5 parameters: x coord, y coord, width, height and color (hex)
        // setOrigin() adjusts the rectangles origins according to the given coord
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // display score 
        // the config of how we want the score to look like
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#2d6a4f', // background color for the score box
            color: '#FFFFFF', // color for the text
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // actually adds the score and makes it visible
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Rocket.score, scoreConfig);

        // P2 SCORE
        if (game.settings.twoPlayerMode) {
            let scoreConfigTwo = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#ffd819', // background color for the score box
                color: '#000000', // text color
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 100
            }


            this.scoreTwo = this.add.text(borderUISize + borderPadding*13, borderUISize + borderPadding*2, this.p2Rocket.score, scoreConfigTwo);
        }

        // GAME OVER flag
        this.gameOver = false; // binding the game over property to the scene and setting it to false

        // adding the 60 second play clock 
        // delayedCall has 4 parameters passed to it here: time (milliseconds), callback function (here it is an => function / anonymous)
        //                                                 arguments we might want to pass to the callback function which is null in this case,
        //                                                 callback context which is this (the current Play scene)
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);

            this.gameOver = true; // timer runs out so set the game over status to true
        }, null, this);

    }

    update() {

        // when the game is over stop updating the scrolling background
        if (this.gameOver) {
            this.dirtRoad.tilePositionX = 0;
            //this.playSong.stop();
        }

        // check key input for restart 
        // makeing sure the game is over and checking if R has been pressed
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // texture of our tile sprite will move 4 horizontal pixels left every frame
        this.dirtRoad.tilePositionX -= 4;

        this.p1Rocket.update(); // tells Phaser to also update our rocket object when it does its update stuff

        // update the spaceships to actually move
        if(!this.gameOver && game.settings.twoPlayerMode) {
            this.p1Rocket.update(); // update the rocket sprite
            this.p2Rocket.update();
            this.ship01.update();   // update the spaceships
            this.ship02.update();
            this.ship03.update();
            this.moneyBag.update();
        }
        else if (!this.gameOver)  {
            this.p1Rocket.update(); // update the rocket sprite
            this.ship01.update();   // update the spaceships
            this.ship02.update();
            this.ship03.update();
            this.moneyBag.update();
        }

        // check for collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();         // reset the rocket upon collision
            this.shipExplode(this.ship03, this.p1Rocket); // handles ship exploding animation and resetting the ship location
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Rocket); 
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.p1Rocket); 
        }
        if (this.checkCollision(this.p1Rocket, this.moneyBag)) {
            this.p1Rocket.reset();
            this.shipExplode(this.moneyBag, this.p1Rocket);
        }

        // check for 2nd player rocket collision
        // we want to only do this if the two player mode is selected or else this.p2Rocket will be undefined
        // since p2Rocket is only created if that option is chosen in the menu
        if (game.settings.twoPlayerMode) {
            // check for collisions for the second player
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();         // reset the rocket upon collision
                this.shipExplode(this.ship03, this.p2Rocket); // handles ship exploding animation and resetting the ship location
            }
            else if(this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, this.p2Rocket); 
            }
            else if(this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, this.p2Rocket); 
            }
            else if (this.checkCollision(this.p2Rocket, this.moneyBag)) {
                this.p2Rocket.reset();
                this.shipExplode(this.moneyBag, this.p2Rocket);
            }
        }

       
       
    }

    checkCollision(rocket, ship) {
        // AAB (Axis-Aligned Bounding Boxes)
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        }
        else {
            return false;
        }
    }

    shipExplode(ship, rocket) {
        // temporarily hide ship
        ship.alpha = 0;
    
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');            // play exploding animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset();                      // reset ship position
            ship.alpha = 1;                    // make ship visible again
            boom.destroy();                    // remove explosion sprite
        });
        // adding the score and repaint
        rocket.score += ship.points;        // updates the player score
        //this.scoreLeft.text = rocket.score; // actually updates the score's text box with the new score value

        // update the respective text boxes!!!! 
        if (game.settings.twoPlayerMode && rocket.rocketNum === 2) {
            this.scoreTwo.text = rocket.score;
        }
        else {
            this.scoreLeft.text = rocket.score;
        }
    
        this.sound.play('sfx_explosion'); // to play a quick one off sound
    }

}

