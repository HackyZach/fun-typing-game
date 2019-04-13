// Links:
// This talks about dividing up scenes:
// https://phaser.io/phaser3/devlog/121
// Add Scene from Another Scene:
// https://labs.phaser.io/edit.html?src=src\scenes\add%20scene%20from%20another%20scene.js

class startScene extends Phaser.Scene {
    constructor() {
        super({key:'start',active: true});
    }

    preload ()
    {
        // Sample Code:
        // this.load.setBaseURL('http://labs.phaser.io');
        // this.load.image('sky', 'assets/skies/space3.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');

        this.load.setBaseURL('http://localhost:8000')
        // Background:
        this.load.image('sky','assets/sky.png')
        // Hearts:
        this.load.image('fullHeart','assets/images/HUD/hud_heartFULL.png');
        this.load.image('halfHeart','assets/images/HUD/hud_heartHalf.png');
        this.load.image('emptyHeart','assets/images/HUD/hud_heartEmpty.png');
        // Sprite:
        this.load.image('character','assets/images/Player/p3_front.png')
        // Platforms:

        // Music:
        this.load.audio('seinfeld','assets/sound/Seinfeld.mp3');
        // this.load.audio('robot','assets/sound/Robot_Boogie.mp3');
    }

    create ()
    {
        this.add.image(400, 300, 'sky');
        this.add.image(50,50,'fullHeart');
        this.add.image(100,50,'fullHeart');
        this.add.image(150,50,'fullHeart');
        this.add.image(400,550,'character');

        this.add.text(550,25, 'Score: ', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
        this.add.text(650,25,'0', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
        
        let titleText = this.add.text(200, 200, 'Typing Jumper', { fontFamily: '"Roboto Condensed"' , fontSize: '64px'});
        let startButton = this.add.text(300,300,"TODO: BUTTON", { fontFamily: '"Roboto Condensed"' , fontSize: '32px'}).setInteractive();
        startButton.on('pointerdown',(pointer) => {
            console.log(pointer);
            this.scene.add('game', gameScene, true, { x: 400, y: 300 });
            titleText.setVisible(false);
            startButton.setVisible(false);
        });

        let music = this.sound.play('seinfeld');
        // music = this.sound.play('robot');

        // Sample Code:
        // var particles = this.add.particles('red');
        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });
        // var logo = this.physics.add.image(400, 100, 'logo');
        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);
        // emitter.startFollow(logo);

    }
}

class gameScene extends Phaser.Scene {
    // constructor(){
    //     super({key:'game'});
    // }
    preload(){


    }
    create(){
        let score = 0
        let health = 3
        this.add.text(250,250, 'Score: ', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
    }

}

class gameOverScene extends Phaser.Scene {
}

let phaserconfig = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene: [ startScene, gameScene],
    scale: {
        parent: 'phaser',
        mode: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }
};

let game = new Phaser.Game(phaserconfig);