// Spaceship prefab
class Money extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = 5.5;
    }

    update() {
        // move spaceship left
        this.y -= this.moveSpeed;

        // wrap around from left edge to right edge
        if (this.y <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.y = game.config.width;
    }
}