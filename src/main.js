// Balloon prefab
class Balloon {
    constructor(scene, x, y) {
        this.sprite = scene.physics.add.sprite(x, y, "balloon")
            .setOrigin(0.5, 0.5)
            .setScale(3)
            .setGravityY(150) // Change gravity value here
            .setVelocity(50, 10) // initial velocity of the balloon (x value exists so that the balloon is not just bouncing in place)
            .setBounce(1, 1) // bounce exists so that the balloon bounces against the walls and ceiling
            .setInteractive()
            .setCollideWorldBounds(true, 1, 1, true)
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

        this.balloon.sprite.onWorldBounds = true;
        
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            //insert what happens when the balloon touches the edges here
            if(up){
                console.log("up test");
            }
            if(down){
                console.log("down test");
            }
            if(left){
                console.log("left test");
            }
            if(right){
                console.log("right test");
            }
        });
        
        //for testing
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.clickCount = 0;
        this.counter = this.add.text(30, 20, `Click count: ${this.clickCount}`);

        this.balloon.sprite.on("pointerdown", ()=>{
            console.log("clicked on balloon!");
            this.balloon.sprite.setVelocityY(-200) // simulates bouncing a balloon upwards
            this.counter.setText(`Click count: ${++this.clickCount}`);
        }); 
    }

    update() {
        // Add to this function as needed
        //Harry:i added arrow key movement for the sake of testng collission
        {
            if (this.cursors.left.isDown)
            {
                this.balloon.sprite.setVelocityX(-300);
            }
            else if (this.cursors.right.isDown)
            {
                this.balloon.sprite.setVelocityX(300);
                
            }

            if (this.cursors.up.isDown)
            {
                this.balloon.sprite.setVelocityY(-300);
            
            }
            else if (this.cursors.down.isDown)
            {
                this.balloon.sprite.setVelocityY(300);
                
            }
        }
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