let mapSize = 10
let gameSize = 600
var margin = 50
var mapWidth = gameSize - 2 * margin
var map = []
var lastTime = 0
var myGlobalThis

var config = {
	type: Phaser.AUTO,
	width: gameSize,
	backgroundColor: '#ffffff',
	height: gameSize,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

class HealthBar {

	constructor(scene, x, y, hp) {
		this.bar = new Phaser.GameObjects.Graphics(scene);

		this.x = x;
		this.y = y;
		this.value = hp;
		this.w = squareWidth / 2 - 2
		this.p = this.w / 3;

		this.draw();

		scene.add.existing(this.bar);
	}

	decrease(amount) {
		this.value -= amount;

		if (this.value < 0) {
			this.value = 0;
		}

		this.draw();

		return (this.value === 0);
	}

	draw() {
		this.bar.clear();

		//  BG
		this.bar.fillStyle(0x000000);
		//this.bar.fillRect(this.x, this.y, this.w+2, 6);

		//  Health

		this.bar.fillStyle(0xffffff);
		this.bar.fillRect(this.x + 1, this.y + 1, this.w, 4);

		if (this.value < 2) {
			this.bar.fillStyle(0xff0000);
		}
		else {
			this.bar.fillStyle(0x00ff00);
		}

		var d = Math.floor(this.p * this.value);

		this.bar.fillRect(this.x + 1, this.y + 1, d, 4);
	}

	place(sprite) {
		this.x = sprite.x
		this.y = sprite.y - 6
		this.draw()
	}

	destroy() {
		this.bar.destroy()
	}

}


function preload() {
	this.load.crossOrigin = 'Anonymous'
	this.load.image('hex', 'https://cook-consultants.com/hex.png')
	this.load.spritesheet('tanks', 'https://cook-consultants.com/tanks_5.png', {frameWidth: 150, frameHeight: 210})
	//    this.load.image('grass', 'green.png')
	//    this.load.image('gray', 'gray.png')
	//    this.load.image('black', 'black.png')
	//    this.load.image('blue', 'blue.png')
	//    this.load.image('red', 'red.png')
	//    this.load.image('white', 'white.png')
	//    this.load.image('heal', 'Heal.jpg')
}

function drawGrid() {
	myGlobalThis.add.image(0, 0, 'tanks', 6).setOrigin(0, 0)
	var imageSize = 2*(this.config.width - (2*margin)) / (mapSize+0.5)
	var hexWidth = 525 / (mapSize+0.5)
	var hexHeight = 453 / (mapSize+0.5)
	for (i = 0; i < mapSize; i++) {
		for (j = 0; j < mapSize; j++) {
			z = myGlobalThis.add.image(i * hexWidth + margin + hexWidth/2*(j%2), j * hexHeight + margin, 'hex')
				.setOrigin(0, 0);
			z.displayWidth = imageSize
			z.displayHeight = imageSize
		}
	}
}

function createMap() {
	for (y = 0; y < mapSize; y++) {
		a = [];
		for (z = 0; z < y; z++) {
			a.push("spacer");
		}
		for (x = 0; x < mapSize; x++) {
			a.push("open space");
		}
		map.push(a)
	}
}

function create() {
	myGlobalThis = this
	createMap()
	drawGrid()
}

function update(t) {
	if (t > lastTime + 300) {
		lastTime = t
	}
}