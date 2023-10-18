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