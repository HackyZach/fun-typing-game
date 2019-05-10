// Links:
// This talks about dividing up scenes:
// https://phaser.io/phaser3/devlog/121
// Add Scene from Another Scene:
// https://labs.phaser.io/edit.html?src=src\scenes\add%20scene%20from%20another%20scene.js



    // console.log(dictionary[Math.floor(dictionary.length * Math.random())].word);
let getRandomWord = () => {
    randomIndex = Math.floor(dictionary.length * Math.random());
    return dictionary[randomIndex].word;
}

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

        // this.load.setBaseURL('http://localhost:8000')
        
        // Background:
        this.load.image('sky','assets/sky.png')

        // Character:
        this.load.image('character','assets/images/Player/p3_front.png')

        // Music:
        this.load.audio('seinfeld','assets/sound/Seinfeld.mp3');
    }

    create ()
    {
        this.add.image(400, 300, 'sky');
        let char = this.add.image(400,550,'character');

        // this.add.text(550,25, 'Score: ', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
        // this.add.text(650,25,'0', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
        let music = this.sound.add('seinfeld');
        music.play();

        let titleText = this.add.text(200, 200, 'Typing Jumper', { fontFamily: '"Roboto Condensed"' , fontSize: '64px'});
        let startButton = this.add.text(300,300,"Press Start!", { fontFamily: '"Roboto Condensed"' , fontSize: '32px'}).setInteractive();
        startButton.on('pointerdown',(pointer) => {
            console.log(pointer);
            this.scene.add('game', gameScene, true, { x: 400, y: 300 });
            titleText.setVisible(false);
            startButton.setVisible(false);
            char.setVisible(false);
            music.stop();
        });

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
    preload(){
        // Hearts:
        this.load.image('fullHeart','assets/images/HUD/hud_heartFULL.png');
        this.load.image('halfHeart','assets/images/HUD/hud_heartHalf.png');
        this.load.image('emptyHeart','assets/images/HUD/hud_heartEmpty.png');

        // Music:
        this.load.audio('robot','assets/sound/Robot_Boogie.mp3');

        // Platforms:
        this.load.image('platformLeft','assets/images/Tiles/stoneHalfLeft.png');
        this.load.image('platformCenter','assets/images/Tiles/stoneHalfMid.png');
        this.load.image('platformRight','assets/images/Tiles/stoneHalfRight.png');

        // Sprite:
        this.load.image('character','assets/images/Player/p3_front.png');
        this.load.image('charJump','assets/images/Player/p3_jump.png');
        this.load.image('charHurt','assets/images/Player/p3_hurt.png');
    }

    create(){
        // Music:
        let music = this.sound.play('robot');

        // Character:
        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'character' },
                { key: 'charJump' },
            ],
            duration: 5000,
            yoyo: true,
            // frameRate: ,
            // repeat: 
        });
        let character = this.add.sprite(400,550, 'character');
        character.play('jump');

        // Create Platform:
        // let platformLeft = this.add.image(350,400,'platformLeft');
        // let platformCenter = this.add.image(400,400,'platformCenter');
        // let platformRight = this.add.image(450,400,'platformRight');
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/#group-actions
        let platformOne = this.add.group(
            {   
                key:'platformOne',
                setXY:
                {
                    x: 340,
                    y: 383,
                }
            }
        );
        platformOne.create(350,400,'platformLeft');
        platformOne.create(400,400,'platformCenter');
        platformOne.create(450,400,'platformRight');
        // platformOne.addMultiple([platformLeft,platformCenter,platformRight]);
        console.log(platformOne);
        console.log(platformOne.getLength());

        // Health:
        // TODO: Make these into sprites..?
        this.add.image(50,50,'fullHeart');
        this.add.image(100,50,'fullHeart');
        this.add.image(150,50,'fullHeart');
        let health = 3

        let style = {
            fontFamily: 'Roboto Condensed', 
            fontSize: '32px'
        }

        // Score:
        // Updating Score: https://phaser.io/tutorials/making-your-first-phaser-3-game/part9
        this.add.text(550,25, 'Score: ', style);
        let score = this.add.text(650,25,'0', style);
        
        // Words:
        let wordStyle = {
            fontFamily: 'Roboto Condensed', 
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#4858AE'
        }

        // Display Word
        let randomWord = getRandomWord();
        let position = 400 - randomWord.length * 7;
        let text = this.add.text(position, 300, randomWord, style);
        
        
        // Keyboard combo input.
        let combo = this.input.keyboard.createCombo(randomWord);

        console.log(combo);
        this.input.keyboard.on('keycombomatch', function (event) {
            console.log("Correct Input: " + randomWord);
            randomWord = getRandomWord();
            text.setText(randomWord);
            position = 400 - randomWord.length * 7;
            text.setX(position);

            combo = randomWord;
        });
    }

    update(){
        // console.log('Update Called!');
    }

    // This will update the score based.
    updateScore(){

    }

    // This will move the platform down, and loop it around. Make it appear like the sprite is moving.
    nextWord(){

    }   
}

class gameOverScene extends Phaser.Scene {
    constructor() {
        super({key:'over'});
    }
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
    scene: [ startScene, gameScene, gameOverScene],
    scale: {
        parent: 'phaser',
        mode: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }
};

let game = new Phaser.Game(phaserconfig);