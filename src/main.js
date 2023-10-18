// Balloon prefab
class Balloon {
    constructor(scene, x, y) {
        // Do NOT move the following into the playSfx() method.
        // The following represent Web Audio nodes.
        // If too many of them are constructed without having the unused ones be destroyed,
        // ugly auditory anomalies may occur (believe me, the sound crackling is a pain to hear).

        // === Please do NOT move ===
        this.sfxVolumMult = new Tone.Multiply().toDestination();
        this.sfxSource = new Tone.Oscillator(440, "sawtooth");
        this.srcFreq = new Tone.FrequencyEnvelope({
            attack: 0.5,
            sustain: 1,
            release: 0, // Go back to base frequency instantaneously
            baseFrequency: "A3",
            octaves: 3
        }).connect(this.sfxSource.frequency);
        this.sfxSource.connect(this.sfxVolumMult);
        
        this.sfxVolumeEnv = new Tone.Envelope({
            attack: 0.1,
		    decay: 0.1,
		    sustain: 0.5,
		    release: 0.3,
        });
        this.sfxVolumeEnv.connect(this.sfxVolumMult.factor);
        // === Please do NOT move ===

        this.sprite = scene.physics.add.sprite(x, y, "balloon")
            .setOrigin(0.5, 0.5)
            .setScale(3)
            .setGravityY(150) // Change gravity value here
            .setVelocity(50, 10) // initial velocity of the balloon (x value exists so that the balloon is not just bouncing in place)
            .setBounce(1, 1) // bounce exists so that the balloon bounces against the walls and ceiling
            .setInteractive()
            .setCollideWorldBounds(true, 1, 1, true)
    }

    playSfx() {
        this.srcFreq.triggerRelease(); // Force reset sfx pitch to base pitch on click in case the player spam-clicks.
        this.srcFreq.triggerAttackRelease(0.6);
        this.sfxSource.start();
        this.sfxSource.stop("+0.6");
        this.sfxVolumeEnv.triggerAttackRelease(0.3);
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
                this.balloon.sprite.onWorldBounds = false;
                this.balloon.sprite.setCollideWorldBounds(false);
                console.log("touched down");
                this.balloon.sprite.setVelocity(0, 0);
                this.balloon.sprite.setGravityY(4000);         //fine tune this for how fast the balloon falls off the map
                if(this.balloon.sprite.y <= 0){             //this is where the game is supposed to restart
                    this.scene.restart();
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