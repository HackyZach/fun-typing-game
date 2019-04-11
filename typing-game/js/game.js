var config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 800,
    height: 600,
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
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

var char;
var platform;

var lives = 5;
var score = 0;

var scoreText;
var livesText;
var introText;

var s;


function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');
    this.load.setBaseURL('http://localhost:8000')

    // this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
    // this.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");
    this.load.image('bg','http://localhost:8000/assets/tilemap/test copy.png');
    // this.load.image('tiles','http://localhost:8000/assets/images/Tiles/tiles_spritesheet.png')
    // this.load.tilemapTiledJSON('field','http://localhost:8000/assets/tilemap/intro.json');

    this.load.image('player', 'assets/images/Player/p3_stand.png');

    // this.game.load.tilemapTiledJSON('field','http://localhost:8000/assets/tilemap/intro.json', null, Phaser.Tilemap.TILED_JSON);
    // this.game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png');
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

    this.load.audio('theme', [
        'http://localhost:8000/assets/audio/Robot_Boogie.mp3'
    ]);
}

function create ()
{
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    // map = this.add.tilemap("map");
    // tiles = map.addTilesetImage("tiles",'tiles');
    // this.backgroundLayer = map.createStaticLayer('field',tiles);

    this.add.image(400, 300, 'bg');


    // this.add.image(400, 300, 'sky');


    var music = this.sound.add('theme');
    music.play();
}