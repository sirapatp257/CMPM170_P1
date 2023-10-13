// Balloon prefab
class Balloon {
    constructor(scene, x, y) {
        this.sprite = scene.physics.add.sprite(x, y, "balloon")
            .setOrigin(0.5, 0.5)
            .setScale(3)
            .setGravityY(0) // Change gravity value here
            .setInteractive()
            .on("pointerdown", ()=>{
                console.log("clicked on balloon!");
                scene.counter.setText(`Click count: ${++scene.clickCount}`);
            }); 
    }
}

// Prototype Scene class
class PrototypeScene extends Phaser.Scene {
    preload() {
        this.load.path = "./assets/";
        this.load.image("balloon", "balloon.png");
    }

    create() {
        this.balloon = new Balloon(this, 320, 180);
        
        this.clickCount = 0;
        this.counter = this.add.text(30, 20, `Click count: ${this.clickCount}`);
    }

    update() {
        // Add to this function as needed
    }
}

let gameConfig = {
    scale: {
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.Scale.CENTER_BOTH,
       width: 640,
       height: 360
    },
    physics: {
       default: 'arcade', // Change this to Ninja or P2 you find that either is a better fit
       arcade: {
          
       }
    },
    pixelArt: true,
    backgroundColor: '#79a7c9',
    scene: PrototypeScene,
    title: "CMPM 170 Prototype 1"
};
 
const game = new Phaser.Game(gameConfig);