class PrototypeScene extends Phaser.Scene {
    constructor ()
    {
        super("protoScene");
    }

    preload() {
        this.load.image("balloon", "./assets/balloon.png");
    }

    create() {

        this.balloon = new Balloon(this, 320, 180);

        this.balloon.sprite.onWorldBounds = true;

        this.gameOver = false;

        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            //insert what happens when the balloon touches the edges here
            if(up){
                console.log("up test");
            }
            if(down){
                this.balloon.sprite.onWorldBounds = false;
                this.balloon.sprite.setCollideWorldBounds(false);
                console.log("touched down");
                this.balloon.sprite.setVelocity(0, 0);
                this.balloon.sprite.setGravityY(4000);         //fine tune this for how fast the balloon falls off the map
                if(this.balloon.sprite.y <= 0){             //this is where the game is supposed to restart
                    this.gameOver = true;
                }
                
            }
            if(left){
                console.log("left test");
            }
            if(right){
                console.log("right test");
            }
        });

        //for testing
        this.balloon.sprite.on("pointerdown", ()=>{
            console.log("clicked on balloon!");
            this.balloon.sprite.setVelocityY(-200) // simulates bouncing a balloon upwards
            this.counter.setText(`Click count: ${++this.clickCount}`);
            this.balloon.playSfx();
        }); 
        
        this.clickCount = 0;
        this.counter = this.add.text(30, 20, `Click count: ${this.clickCount}`);

    }

    update() {
        // Add to this function as needed
        if(this.gameOver) {
            this.scene.restart();
        }
        
    }
}