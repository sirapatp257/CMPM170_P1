class PrototypeScene extends Phaser.Scene {
    constructor ()
    {
        super("protoScene");
    }

    preload() {
        this.load.image("balloon", "./assets/balloon.png");
    }

    create() {
        this.physics.world.setBounds(0, 0, this.scale.gameSize.width, this.scale.gameSize.height + 128)
        this.balloon = new Balloon(this, 320, 180);
        this.startingGame = true;
        this.balloon.sprite.onWorldBounds = true;

        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            //insert what happens when the balloon touches the edges here
           // this.balloon.sprite.setAngularVelocity((this.balloon.sprite.body.angularVelocity/this.balloon.sprite.body.angularVelocity)*Phaser.Math.Between(0, 50)*(this.balloon.sprite.body.velocity.x/15))
            if(up){
                console.log("up test");
            }
            if(down){
                this.balloon.sprite.onWorldBounds = false;
                this.balloon.sprite.setCollideWorldBounds(false);
                console.log("touched down");
                this.balloon.sprite.setVelocity(0, 0);
                
                // Destroy existing balloon sound nodes to prevent audio crackling
                this.balloon.sfxVolumMult.dispose();
                this.balloon.sfxSource.dispose();
                this.balloon.sfxVolumeEnv.dispose();
                this.balloon.srcFreq.dispose();
                
                //this.scene.restart();
                //this.timedEvent = this.time.delayedCall(3000, () => {
                     this.scene.restart();
                // });
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
            if(this.startingGame==true){
                this.balloon.sprite.setGravityY(20)
                this.startingGame=false
            }
            this.balloon.sprite.setVelocityY(-200) // simulates bouncing a balloon upwards
            if(this.input.x>this.balloon.sprite.x){
                this.balloon.sprite.setAngularVelocity(Phaser.Math.Between(0, -50)*(this.balloon.sprite.body.velocity.x/15))
                this.balloon.sprite.setVelocityX(-75)
            }else{
                if(this.input.x<this.balloon.sprite.x){
                    this.balloon.sprite.setAngularVelocity(Phaser.Math.Between(0, 50)*(this.balloon.sprite.body.velocity.x/15))
                    this.balloon.sprite.setVelocityX(75)
                }
            }
            
            this.counter.setText(`Click count: ${++this.clickCount}`);
            this.balloon.playSfx();
        }); 
        
        this.clickCount = 0;
        this.counter = this.add.text(30, 20, `Click Balloon to Start`);

    }

    update() {
        if(this.balloon.sprite.body.velocity.y<10 && !this.startingGame){
            this.balloon.sprite.setVelocityY(this.balloon.sprite.body.velocity.y+0.5)
        }
    }
}