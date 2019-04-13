var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    scale: {
        parent: 'phaser',
        mode: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }
};

var game = new Phaser.Game(config);

function preload ()
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

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(50,50,'fullHeart');
    this.add.image(100,50,'fullHeart');
    this.add.image(150,50,'fullHeart');
    this.add.image(400,550,'character');

    this.add.text(550,25, 'Score: ', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
    this.add.text(650,25,'0', {fontFamily: '"Roboto Condensed', fontSize: '32px'});
    
    this.add.text(200, 200, 'Typing Jumper', { fontFamily: '"Roboto Condensed"' , fontSize: '64px'});
    this.add.text(300,300,"TODO: BUTTON", { fontFamily: '"Roboto Condensed"' , fontSize: '32px'})




    this.input.keyboard.on('keydown', function (event) {

        console.dir(event);

    });

    music = this.sound.play('seinfeld');
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