// Ashley Perez
// Car Patrol
// 4/15/2022, took probably 10 hours to do all this

// Point total: 100 
// 60 pts:   redesign of asset art, menu, UI
// 5 pts:    background music (original version of RP doesn't have music)
//           so it's different from changing the sound effects
// 30 pts:   simultaneous two-player mode!!!
// 20 pts:   new spaceship type that is faster and worth more points (moneybag)

// sorry I'm lazy so things are still called rocket and ship even though it's cars now

// this creates the canvas for the game (screen size)
let config = {
    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play] // the scenes that we will be using
}

let game = new Phaser.Game(config);

// setting the UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keySpace, keyTWO;
